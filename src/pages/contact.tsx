import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react"

export default function Contact() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [subject, setSubject] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const router = useRouter();
    return (
        <main className="contact">
            <form onSubmit={async (e) => {
                e.preventDefault();
                const res = await axios.post('/api/sendMessage', { name, email, subject, message });
                alert('Takk for din melding, vi svarer så fort som mulig');
                await router.push('/');
            }}>
                <h1>Kontakt oss</h1>
                <p>Du kan alltid kontakte oss på e-post:stine@frublomdesign.no
                    Eller ringe oss på nummeret: +47 56156 654
                    Og du kan fylle ut skjemaet nedenfor så svarer vi så raskt som mulig</p>
                <input type="text" value={name} onChange={e => setName(e.target.value)} name="name" placeholder="Name" id="name" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} name="email" placeholder="Email" id="email" />
                <input type="text" value={subject} onChange={e => setSubject(e.target.value)} name="subject" placeholder="Subject" id="subject" />
                <textarea value={message} onChange={e => setMessage(e.target.value)} name="message" id="message"></textarea>
                <input type="submit" value="Sende" />
            </form>
            <img src="/img/carousel/2.jpg" alt="senyum" />
        </main>
    )
}