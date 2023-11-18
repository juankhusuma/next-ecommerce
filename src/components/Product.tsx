import { CartContext } from "@/context/CartContext";
import { auth } from "@/lib/firebase";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export interface ProductProps {
    name: string;
    description: string;
    price: number;
    id: string;
    image: string;
}
export const Product: React.FC<ProductProps> = ({ id, image, description, name, price }) => {
    const [user, loading, error] = useAuthState(auth);
    const { cart, setCart } = useContext(CartContext);

    return (
        <div>
            <img src={image} alt={name} />
            <h1>{name}</h1>
            <p>{description.length > 100 ? description.slice(0, 100) + "..." : description}</p>
            <p className="product__price">{price} kr</p>
            {(user !== null && !loading) &&
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        const item = cart.find(i => i.id === id);
                        if (item) {
                            setCart((cart: any) => cart.filter((i: any) => i.id !== id));
                            return;
                        }
                        setCart((cart: any) => [...cart, { id, name, description, price, image, amount: 1 }])
                    }}>
                    {!cart.find(i => i.id === id) ? "Kjøp" : "Remove"}
                </button>
            }
        </div>
    )
}