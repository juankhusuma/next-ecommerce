export default function Login() {
    return (
        <main className="login">
            <form>
                <h1>Min side</h1>
                <input type="text" placeholder="Epost" name="email" id="email" />
                <input type="password" placeholder="Password" name="password" id="password" />
                <input type="submit" value="Login" />
            </form>
            <img src="/img/carousel/3.jpg" alt="login" />
        </main>
    )
}