import { ProductProps } from "@/components/Product";
import { createContext } from "react";


interface P extends ProductProps {
    amount: number
}

export const CartContext = createContext({
    cart: [] as P[],
    setCart: (cart: any) => { },
});