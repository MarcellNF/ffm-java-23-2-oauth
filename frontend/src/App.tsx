import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";

type AppUser = {
    username: string,
    avatarUrl: string,
}

function App() {
    const [appUser, setAppUser] = useState<AppUser | null | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    function getMe() {
        setLoading(true)
        axios.get("/api/auth/me")
            .then(r => setAppUser(r.data))
            .catch(() => setAppUser(null))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        getMe();
    }, []);

    function login() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin
        window.open(host + "/oauth2/authorization/github", '_self')
    }

    function logout() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin
        window.open(host + "/logout", '_self')
    }

    if (appUser === undefined) return '...loading';
    if (appUser === null) return <button onClick={login}>Login with Github</button>

    return (
        <>
            {appUser.username}
            <img src={appUser.avatarUrl} alt={"Avatar"}/>
            <button onClick={logout}>Logout</button>
        </>
    )
}

export default App
