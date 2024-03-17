import UserNavbar from "../../../../components/navbar/UserNavbar";
import AdminNavbar from "../../../../components/navbar/AdminNavbar";

export default function Country() {
    return (
        <>
            <UserNavbar>
                <AdminNavbar></AdminNavbar>
            </UserNavbar>
            <div>
                <h1>Country</h1>
            </div>
        </>
    )
}