import { RxCross2 } from 'react-icons/rx';

export default function Cart() {
    return (
        <main className="cart">
            <section className='cart__info'>
                <h1>Handlekurv</h1>
                <ul>
                    <CartItem image="/img/shop/1.jpg" name="Navn" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum." amount={1} price={100} index={0} />
                    <CartItem image="/img/shop/2.jpg" name="Navn" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum." amount={1} price={100} index={0} />
                    <CartItem image="/img/shop/3.jpg" name="Navn" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum." amount={1} price={100} index={0} />
                </ul>
                <div className='cart__info--price'>
                    <p>Total</p>
                    <p>150 kr</p>
                </div>
                <div className='cart__info--price'>
                    <p>Ftakt</p>
                    <p>200 kr</p>
                </div>
                <div className='cart__info--total'>
                    <p>150 kr</p>
                    <button>Betale</button>
                </div>
            </section>
            <section className='cart__banner'>
                <img src="/img/carousel/2.jpg" alt="img" />
            </section>
        </main>
    )
}

function CartItem({ image, name, description, amount, price, index }: { image: string, name: string, description: string, amount: number, price: number, index: number }) {
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
                    <input type="number" value={amount} />
                    <RxCross2 />
                </div>
            </div>
        </div>
    )
}