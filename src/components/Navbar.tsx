import Link from 'next/link'
import { BsCart3 } from 'react-icons/bs'
import { AiOutlineUser } from 'react-icons/ai'
import { useContext, useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { CartContext } from '@/context/CartContext';
import { Nav, NavDropdown, Navbar, Container } from 'react-bootstrap';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

export default function OurNavbar() {
    const { cart } = useContext(CartContext);
    const [userLoad, setUserLoad] = useState(false);
    const [
        user,
        loading,
        error,
    ] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        if (user && !loading) {
            setUserLoad(true);
        }
    }, [user, loading])


    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary ournav py-4">
            <Container>
                <Navbar.Brand href="/">
                    <img src="/img/fru_blom_logo.png" alt="logo" width={60} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mx-auto">
                        <div className="link"><Link href="/">Home</Link></div>
                        <div className="link"><Link href="/shop">Butikk</Link></div>
                        <div className="link"><Link href="/contact">Kontakt oss</Link></div>
                        <div className="link"><Link href="/about">Om oss</Link></div>
                        <NavDropdown title="Min Side" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="#"><Link suppressHydrationWarning href="/payment">History</Link></NavDropdown.Item>
                            <NavDropdown.Item href="#" onClick={async () => {
                                if (userLoad) {
                                    await signOut(auth);
                                } else {
                                    await router.push("/login")
                                }
                            }}>
                                <span suppressHydrationWarning>{userLoad ? "Logg ut" : "Logg inn"}</span>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <div className="d-flex justify-center flex-column align-items-center">
                            <BsCart3 className="mb-2" />
                            <Link href="/cart">Handlekurv ({cart.length})</Link>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}