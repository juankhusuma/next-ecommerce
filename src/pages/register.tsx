
export default function Register() {

    return (
        <main className="register">
            <form>
                <h1>Registre</h1>
                <input type="text" placeholder="Navn" name="name" id="name" />
                <input type="text" placeholder="Epost" name="email" id="email" />
                <input type="password" placeholder="Password" name="password" id="password" />
                <input type="password" placeholder="Password" name="confirmPassword" id="confirmPassword" />
                <input type="submit" value="Login" />
            </form>
            <img src="/img/carousel/3.jpg" alt="register" />
        </main>
    )
}