import { Product } from "@/components/Product";
import { useContext, useEffect, useState } from "react";
import { ProductProps } from "@/components/Product";
import { GetServerSideProps } from "next";
import { AiOutlineSearch } from 'react-icons/ai';
import axios from "axios";
import Link from "next/link";
import { CartContext } from "@/context/CartContext";

export default function Shop({ products, categories }: { products: P[], categories: { name: string }[] }) {
    const [tag, setTag] = useState<string>("all");
    const [search, setSearch] = useState<string>("");
    const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>(products);
    useEffect(() => {
        console.log(tag)
        if (tag === "all") {
            setFilteredProducts(products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())));
        } else {
            setFilteredProducts(products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) && p.categories.includes(tag)));
        }
    }, [tag, search])

    return (
        <main className="shop">
            <section className="shop__nav">
                <div className="shop__nav--search">
                    <input type="text" onChange={e => setSearch(e.target.value)} value={search} />
                    <AiOutlineSearch />
                </div>
                <section className="shop__nav--categories">
                    <select value={tag} onChange={e => setTag(e.target.value)}>
                        <option value="all">All</option>
                        {categories.map(category => {
                            return <option key={category.name} value={category.name}>{category.name}</option>
                        })}
                    </select>
                </section>
            </section>
            <hr />
            <section className="shop__products">
                {filteredProducts.map(product => {
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

interface P extends ProductProps {
    categories: string[];
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
    const products: P[] = data.data.products.map(product => {
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image.url,
            categories: product.categories.map(category => category.name),
        }
    })
    return {
        props: {
            products,
            categories: data.data.categories
        }
    }
}