import { auth } from "@/lib/firebase";
import axios from "axios";
import { updateCurrentUser, updateProfile } from "firebase/auth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Payment() {
    const [user, loading, error] = useAuthState(auth);
    const [data, setData] = useState([]);
    const [item, setItem] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const router = useRouter();
    const [loadingData, setLoadingData] = useState(false);


    useEffect(() => {
        (async () => {
            if (!user && !loading) {
                await router.push('/login');
            }
            if (!user) return;
            const { data } = await axios.post('/api/getBill', { uid: user?.uid });
            setData(data.data.data.purchases || []);
            setItem(data.data.data.items || []);
            setName(user.displayName || '');
            setEmail(user.email || '');

            const { data: userData } = await axios.post('/api/getUser', { uid: user?.uid });
            setPhone(userData.data.data.info.phone || '');
            setAddress(userData.data.data.info.address || '');
            console.log(userData)
            console.log(data);
        })()
    }, [user, loading])


    return (
        <main className="payment">
            <section className="payment__info">
                <h1>Min Side</h1>
                <div className="payment__info--item">
                    <div>
                        <p>Navn: <input type="text" value={name} onChange={e => setName(e.target.value)} /></p>
                        <p>Telefonnummer: <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} /></p>
                    </div>
                    <div>
                        <p>Epost: {email}</p>
                        <p>Address: <input type="text" value={address} onChange={e => setAddress(e.target.value)} /></p>
                    </div>
                </div>
                <button onClick={() => {
                    setLoadingData(true);
                    axios.post('/api/updateUser', { uid: user?.uid, phone, address }).then(({ data }) => {
                        console.log(data);
                        setLoadingData(false);
                        if (data.success) {
                            alert('Informasjonen ble oppdatert');
                        }
                    })
                    updateProfile(user!, { displayName: name })
                }}>{loadingData ? "Loading" : "Edit"}</button>
            </section>
            <section className="payment__table">
                <h1>Bestillinger</h1>
                <table className="payment__table--history">
                    <thead>
                        <tr>
                            <td>Dato</td>
                            <td>Pris</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item: any) => (
                                <Order key={item.id} date={
                                    new Date(item.createdAt).toLocaleDateString('en-US', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })
                                } price={item.price} />
                            ))
                        }
                    </tbody>
                </table>
                <table>
                    <thead>
                        <tr>
                            <td>Produkt</td>
                            <td>Pris</td>
                            <td>Mengde</td>
                            <td>Total</td>
                        </tr>
                    </thead>
                    <tbody>
                        {item.map((item: any) => (
                            <tr key={item.id}>
                                <td>{item.product.name}</td>
                                <td>{item.price} kr</td>
                                <td>{item.amount}</td>
                                <td>{item.price * item.amount} kr</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    )
}

function Order({ date, price }: { date: string, price: number }) {
    return (
        <tr>
            <td className="date">{date}</td>
            <td className="price">{price} kr</td>
        </tr>
    )
}