import { ProductProps } from "@/components/Product";
import { createContext } from "vm";

export const CartContext = createContext({
    cart: [] as ProductProps[],
    setCart: (cart: any) => { },
});