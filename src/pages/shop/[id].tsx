import { Product } from "@/components/Product"
import axios from "axios"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"

export default function ShopDetail({ product }: { product: Product }) {
    const router = useRouter()

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
                        <button>Kjøp</button>
                    </div>
                </div>
            </div>
            <div className="details__other">
                {/* <h1>Andre Produkter</h1>
                <ul> */}
                {/* <Product id={"1"} description="lorem ipsum" name="Product Name" image="/img/shop/1.jpg" price={1120} />
                    <Product id={"1"} description="lorem ipsum" name="Product Name" image="/img/shop/1.jpg" price={1120} />
                    <Product id={"1"} description="lorem ipsum" name="Product Name" image="/img/shop/1.jpg" price={1120} />
                    <Product id={"1"} description="lorem ipsum" name="Product Name" image="/img/shop/1.jpg" price={1120} />
                    <Product id={"1"} description="lorem ipsum" name="Product Name" image="/img/shop/1.jpg" price={1120} />
                    <Product id={"1"} description="lorem ipsum" name="Product Name" image="/img/shop/1.jpg" price={1120} /> */}
                {/* </ul> */}
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
            product: data.data.product
        }
    }
}