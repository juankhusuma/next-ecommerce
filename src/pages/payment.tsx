import { auth } from "@/lib/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Payment() {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();

    if (user === null) {
        router.push("/login");
        return <p>Redirecting...</p>
    }

    return (
        <main className="payment">
            <section className="payment__info">
                <h1>Min Side</h1>
                <div className="payment__info--item">
                    <div>
                        <p>Navn: {loading ? "Loading..." : user?.displayName}</p>
                        <p>Telefonnummer: +47 544 565 56</p>
                    </div>
                    <div>
                        <p>Epost: {loading ? "Loading..." : user?.email}</p>
                        <p>Address: Storgata 3, 1890 Rakkestad</p>
                    </div>
                </div>
                <button>Edit</button>
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
                        <Order date="10/10/2021" price={100} />
                        <Order date="10/10/2021" price={100} />
                        <Order date="10/10/2021" price={100} />
                    </tbody>
                </table>
            </section>
        </main>
    )
}

function Order({ date, price }: { date: string, price: number }) {
    return (
        <tr>
            <td>{date}</td>
            <td>{price} kr</td>
        </tr>
    )
}