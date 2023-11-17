import { Product } from "@/components/Product"
import { CartContext } from "@/context/CartContext"
import axios from "axios"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useContext } from "react"

export default function ShopDetail({ product, id, similiar }: { product: Product, id: string, similiar: any }) {
    const router = useRouter()
    const { cart, setCart } = useContext(CartContext);
    console.log(similiar)
    return (
        <main className="details">
            <div className="details__product">
                <img src="/img/shop/2.jpg" alt="produk" />
                <div>
                    <div className="details__product--text">
                        <h1>{product.name}</h1>
                        <h2>The description of the product</h2>
                        <p>{product.description}</p>
                    </div>
                    <div className="details__product--price">
                        <p>{product.price} kr </p>
                        <button onClick={(e) => {
                            e.preventDefault();
                            // check if item is already in cart
                            const item = cart.find(i => i.id === id);
                            if (item) {
                                // if item is in cart, remove it
                                setCart(cart.filter(i => i.id !== id));
                                return;
                            }
                            setCart([...cart, { id, name: product.name, description: product.description, price: product.price, image: product.image.url, amount: 1 }])
                        }}>{!cart.find(i => i.id === id) ? "Kjøp" : "Remove"}</button>
                    </div>
                </div>
            </div>
            <div className="details__similiar">
                <h1>Andre Produkter</h1>
                <ul>
                    {similiar.map((product: any) => (
                        <Product key={product.id} {...product} image={product.image.url} />
                    ))}
                </ul>
            </div>
        </main >
    )
}

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    discount: number;
    image: {
        url: string;
    }
    categories: Category[];
}

interface Category {
    name: string;
    products: Product[];
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const id = params?.id;
    const query = `
        query {
            product(where: {id: "${id}"}) {
                id
                name
                description
                price
                discount
                image {
                    url
                }
                categories {
                    name
                    products {
                  	  id
                      	name
                        description
                        price
                        discount
                        image {
                            url
                        }
                  	}
                }
            }
        }
    `;
    const { data } = await axios.post<{ data: { product: Product } }>(process.env.GRAPHCMS_URL!, { query }, {
        headers: {
            Authorization: `Bearer ${process.env.GRAPHCMS_PERMANENTAUTH_TOKEN}`
        }

    });
    return {
        props: {
            product: data.data.product,
            similiar: data.data.product?.categories && data.data.product?.categories?.reduce((acc: any, item) => {
                return [...acc, ...item.products]
            }, []),
            id,
        }
    }
}