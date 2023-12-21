import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes.tsx";
import Login from "./Login.tsx";
import Secured from "./Secured.tsx";

export type AppUser = {
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


    /*function logout() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin
        window.open(host + "/logout", '_self')
    }*/

    return (
        <Routes>
            <Route path={"/login"} element={<Login/>}/>
            <Route element={<ProtectedRoutes appUser={appUser}/>}>
                <Route path={"/secured"} element={<Secured/>}/>
            </Route>
        </Routes>
    )
}

export default App
