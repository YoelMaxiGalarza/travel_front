import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function logout() {
    const router = useRouter();
    useEffect(() => {
        localStorage.clear();
        router.push("/")
    }, []);
    return (
        <div>
        </div>
    )
}