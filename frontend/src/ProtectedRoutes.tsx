import {AppUser} from "./App.tsx";
import {Navigate, Outlet} from "react-router-dom";

type ProtectedRoutesProps = {
    appUser: AppUser | undefined | null
}

export default function ProtectedRoutes(props: Readonly<ProtectedRoutesProps>) {

    const isAuthenticated: boolean = props.appUser !== undefined && props.appUser !== null;

    if (props.appUser === undefined) {
        return <p>Loading...</p>;
    }

    return isAuthenticated ? <Outlet/> : <Navigate to={"/login"}/>;

}