import { CartContext } from '@/context/CartContext';
import { auth } from '@/lib/firebase';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { RxCross2 } from 'react-icons/rx';

export default function Cart() {
    const { cart, setCart } = useContext(CartContext);
    const [total, setTotal] = useState(0);
    const [user, loading, error] = useAuthState(auth);
    const [loadingCart, setLoadingCart] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!user && !loading) {
            router.push('/login');
        }
    }, [user, loading])

    useEffect(() => {
        setTotal(cart.reduce((acc, item) => {
            return acc + (item.price * item.amount);
        }, 0))
    }, [cart])

    return (
        <main className="cart">
            <section className='cart__info'>
                <h1>Handlekurv</h1>
                <ul>
                    {cart.map((item, index) => (<CartItem key={index} {...item} index={item.id} />))}
                </ul>
                <div className='cart__info--price'>
                    <p className='price'>Total</p>
                    <p className='price'>{total} kr</p>
                </div>
                <div className='cart__info--total'>
                    <button onClick={async () => {
                        setLoadingCart(true);
                        const { data } = await axios.post('/api/saveBill', { uid: user?.uid, price: total });
                        cart.forEach(async (item) => {
                            console.log(item.id)
                            await axios.post('/api/createItem', { uid: user?.uid, id: item.id, amount: item.amount, price: item.price }).catch(err => console.log(err))
                        });
                        setLoadingCart(false);
                        console.log(data);
                        if (data.success) {
                            setCart([]);
                            alert('Betalingen var vellykket')
                            await router.push('/');
                        }
                    }}>{loadingCart ? "Loading" : "Betale"}</button>
                </div>
            </section>
            <section className='cart__banner'>
                <img src="/img/cart/1.jpg" alt="img" />
            </section>
        </main>
    )
}

function CartItem({ image, name, description, amount, price, index }: { image: string, name: string, description: string, amount: number, price: number, index: string }) {
    const { cart, setCart } = useContext(CartContext);
    return (
        <div className="item">
            <img src={image} alt={name} />
            <div className="item__content">
                <div>
                    <div className="item__content--info">
                        <h1>{name}</h1>
                        <p>{price} kr</p>
                    </div>
                    <p>{description.length > 200 ? description.slice(0, 200) + "..." : description}</p>
                </div>
                <div className='item__content--action'>
                    <input type="number" value={amount} onChange={e => setCart(cart.map(p => {
                        if (p.id === index) {
                            return { ...p, amount: parseInt(e.target.value) }
                        }
                        return p;
                    }))} />
                    <button>
                        <RxCross2 onClick={() => {
                            setCart(cart.filter(p => p.id !== index))
                        }} />
                    </button>
                </div>
            </div>
        </div>
    )
}