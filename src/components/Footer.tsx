import { FaFacebookF, FaTiktok } from "react-icons/fa";
import { SiTwitter } from "react-icons/si";
import { BiLogoLinkedin } from "react-icons/bi";
import { BsInstagram } from "react-icons/bs"

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__menu">
                <ul>
                    <li>Kontakt oss</li>
                    <li>Hjelp</li>
                    <li>Nyhetsbrev</li>
                </ul>
            </div>
            <div className="footer__social">
                <h1>SOSIALE MEDIER</h1>
                <ul>
                    <li><BiLogoLinkedin /></li>
                    <li><FaFacebookF /></li>
                    <li><SiTwitter /></li>
                    <li><FaTiktok /></li>
                    <li><BsInstagram /></li>
                </ul>
            </div>
            <div className="footer__payment"><p>BETALINGSALTERNATIVER</p></div>
        </footer>
    )
}