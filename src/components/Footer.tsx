import { FaFacebookF, FaTiktok } from "react-icons/fa";
import { SiTwitter } from "react-icons/si";
import { BiLogoLinkedin } from "react-icons/bi";
import { BsInstagram } from "react-icons/bs"
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__menu">
                <ul>
                    <li><Link href="/contact">Kontakt oss</Link></li>
                    <li><a href="#">Hjelp</a></li>
                    <li><a href="#">Nyhetsbrev</a></li>
                </ul>
            </div>
            <div className="footer__social">
                <h1>SOSIALE MEDIER</h1>
                <ul>
                    <a href="#">
                        <li>
                            <FaFacebookF />
                        </li>
                    </a>
                    <a href="#">
                        <li>
                            <BsInstagram />
                        </li>
                    </a>
                </ul>
            </div>
            <div className="footer__payment"><p>BETALINGSALTERNATIVER</p></div>
        </footer>
    )
}