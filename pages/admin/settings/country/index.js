import UserNavbar from "../../../../components/navbar/UserNavbar";
import AdminSidebar from "../../../../components/navbar/AdminSidebar";

export default function Country() {
    return (
        <>
            <UserNavbar>
                <AdminSidebar></AdminSidebar>
            </UserNavbar>
            <div>
                <h1>Country</h1>
            </div>
        </>
    )
}