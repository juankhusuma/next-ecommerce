import { Product } from "@/components/Product";
import { useEffect, useState } from "react";
import { ProductProps } from "@/components/Product";
import { GetServerSideProps } from "next";
import { AiOutlineSearch } from 'react-icons/ai';
import axios from "axios";
import Link from "next/link";

export default function Shop({ products, categories }: { products: ProductProps[], categories: { name: string }[] }) {
    const [tag, setTag] = useState<string>("all");
    useEffect(() => {
        if (tag === "all") {
            return;
        } else {
            console.log(tag)
        }
    }, [tag])

    return (
        <main className="shop">
            <section className="shop__nav">
                <div className="shop__nav--search">
                    <input type="text" />
                    <AiOutlineSearch />
                </div>
                <section className="shop__nav--categories">
                    <select>
                        <option value="">Categories</option>
                        {categories.map(category => {
                            return <option key={category.name} value={category.name}>{category.name}</option>
                        })}
                    </select>
                </section>
            </section>
            <hr />
            <section className="shop__products">
                {products.map(product => {
                    return (
                        <Link href={`/shop/${product.id}`} key={product.id}>
                            <Product {...product} />
                        </Link>
                    )
                })}
            </section>
        </main>
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

interface ProductQuery {
    data: {
        products: Product[];
        categories: Category[];
    }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { data } = await axios.post<ProductQuery>(process.env.GRAPHCMS_URL!, {
        query: `
        query {
            products {
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
            categories {
                name
            }
          }
        `
    }, {
        headers: {
            Authorization: `Bearer ${process.env.GRAPHCMS_PERMANENTAUTH_TOKEN}`
        }
    })
    const products: ProductProps[] = data.data.products.map(product => {
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image.url,
        }
    })
    return {
        props: {
            products,
            categories: data.data.categories
        }
    }
}