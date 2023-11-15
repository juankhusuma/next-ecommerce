import Navbar from '@/components/Navbar'
import Footer from "@/components/Footer";
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { CartContext } from '@/context/CartContext';
import { useState } from 'react';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [cart, setCart] = useState([]);
  const [amounts, setAmounts] = useState([]);
  return (
    <>
      <title>Fru Blom</title>
      <div className='page'>
        <Navbar />
        <CartContext.Provider value={{
          cart,
          setCart
        }}>
          <Component {...pageProps} />
        </CartContext.Provider>
        <Footer />
      </div>
    </>
  )
}
