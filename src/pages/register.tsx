import { auth } from "@/lib/firebase";
import { updateProfile } from "firebase/auth";
import { Router, useRouter } from "next/router";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

export default function Register() {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirm, setConfirm] = useState<string>("");
    const router = useRouter();
    return (
        <main className="register">
            <form onSubmit={async e => {
                e.preventDefault();
                if (password !== confirm) {
                    alert("Passordene er ikke like")
                    return;
                }
                const res = await createUserWithEmailAndPassword(email, password);
                if (res) {
                    await updateProfile(auth.currentUser!, {
                        displayName: name
                    })
                    await router.push("/")
                }
            }}>
                <h1>Registre</h1>
                <input value={name} onChange={e => setName(e.target.value)} required type="text" placeholder="Navn" name="name" id="name" />
                <input value={email} onChange={e => setEmail(e.target.value)} required type="text" placeholder="Epost" name="email" id="email" />
                <input value={password} onChange={e => setPassword(e.target.value)} required type="password" placeholder="Password" name="password" id="password" />
                <input value={confirm} onChange={e => setConfirm(e.target.value)} required type="password" placeholder="Password" name="confirmPassword" id="confirmPassword" />
                <input type="submit" value={loading ? "Loading" : "Regitrer"} />
            </form>
            <img src="/img/carousel/3.jpg" alt="register" />
        </main>
    )
}