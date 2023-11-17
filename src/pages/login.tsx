import { auth } from "@/lib/firebase";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const router = useRouter();
    return (
        <main className="login">
            <form onSubmit={async (e) => {
                e.preventDefault();
                const res = await signInWithEmailAndPassword(email, password);
                if (res) {
                    await router.push("/");
                }
            }}>
                <h1>Min side</h1>
                <input value={email} onChange={e => setEmail(e.target.value)} type="text" placeholder="Epost" name="email" id="email" />
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" name="password" id="password" />
                <input type="submit" value={loading ? "Loading" : "Login"} />
                <p>Ny for oss? Registrer <Link href="/register">her</Link></p>
            </form>
            <img src="/img/login/1.jpg" alt="login" />
        </main>
    )
}