import {useTranslation} from "react-i18next";
import AdminSidebar from "../../components/navbar/AdminSidebar";

export default function Admin() {
    const [t, i18n] = useTranslation("common");

    return (<>
       <AdminSidebar/>
        <div>
            <h1>Admin</h1>
        </div>
    </>)
}