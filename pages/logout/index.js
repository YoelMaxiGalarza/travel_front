import {useEffect} from "react";
import {useRouter} from "next/navigation";


export default function Index() {
    const router = useRouter();
    useEffect(() => {
        localStorage.clear();
        router.push("/")
    }, [router]);
    return (
        <div>
        </div>
    )
}