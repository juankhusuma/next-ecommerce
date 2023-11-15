import Link from 'next/link'
import { BsCart3 } from 'react-icons/bs'
import { AiOutlineUser } from 'react-icons/ai'
import { useContext, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [
        user,
        loading,
        error,
    ] = useAuthState(auth);
    return (
        <nav className={`navbar ${open ? 'navbar__open' : 'navbar__close'}`}>
            <div className="navbar__container">
                <a className='navbar__container--toggle' onClick={() => setOpen(!open)}>
                    <img src="/img/fru_blom_logo.png" alt="logo" width={60} />
                </a>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/shop">Butikk</Link></li>
                    <li><Link href="/contact">Kontakt oss</Link></li>
                    <li><Link href="/about">Om oss</Link></li>
                </ul>
            </div>
            <div className="navbar__container">
                <ul>
                    <li className='navbar__container-icon'>
                        <Link href="/login">
                            <AiOutlineUser />
                            {(auth !== null && !loading && !error) ? <p>Min side</p> : <p>Logg inn</p>}
                        </Link>
                    </li>
                    <li className='navbar__container-icon'>
                        <Link href="/cart">
                            <BsCart3 />
                            <p>Handlekurv</p>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}