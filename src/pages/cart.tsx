import { CartContext } from '@/context/CartContext';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { RxCross2 } from 'react-icons/rx';

export default function Cart() {
    const { cart, setCart } = useContext(CartContext);
    const [total, setTotal] = useState(0);
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();
    if (!loading && !user) {
        router.push('/login');
    }

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
                    <p>Total</p>
                    <p>{total} kr</p>
                </div>
                {/* <div className='cart__info--price'>
                    <p>Ftakt</p>
                    <p>200 kr</p>
                </div> */}
                <div className='cart__info--total'>
                    {/* <p>150 kr</p> */}
                    <button>Betale</button>
                </div>
            </section>
            <section className='cart__banner'>
                <img src="/img/carousel/2.jpg" alt="img" />
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
                    <p>{description}</p>
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