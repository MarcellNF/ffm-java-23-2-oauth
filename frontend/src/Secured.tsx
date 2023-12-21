import {useEffect, useState} from "react";
import axios from "axios";

export default function Secured() {
    const [securedMessage, setSecuredMessage] = useState<string>("");

    function getString() {
        axios.get("/api/secured")
            .then(r => setSecuredMessage(r.data));
    }

    useEffect(() => {
        getString();
    }, []);

    return <p>{securedMessage}</p>;
}