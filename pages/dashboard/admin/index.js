import Footer from "../../../components/core/footer";
import UserNavbar from "../../../components/navbar/UserNavbar";
import Link from "next/link";
import {useTranslation} from "react-i18next";
import AdminNavbar from "../../../components/navbar/AdminNavbar";

export default function Admin() {
    const [t, i18n] = useTranslation("common");
    return (<>
        <UserNavbar>
            <AdminNavbar/>
        </UserNavbar>
        <div>
            <h1>Admin</h1>
        </div>
    </>)
}