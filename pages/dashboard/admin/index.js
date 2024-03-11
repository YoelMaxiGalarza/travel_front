import Footer from "../../../components/core/footer";
import UserNavbar from "../../../components/navbar/UserNavbar";
import Link from "next/link";
import {useTranslation} from "react-i18next";
import AdminNavbar from "../../../components/navbar/AdminNavbar";

export default function Admin() {
    const [t, i18n] = useTranslation("common");
    return (<>
        <UserNavbar>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                   aria-expanded="false">
                    {t("user.userManagement")}
                </a>
                <ul className="dropdown-menu">

                    <li><Link className="dropdown-item" href="/dashboard/admin/user/create">{t("create")}</Link></li>
                    <li><Link className="dropdown-item" href="/dashboard/admin/user/roles">{t("roles")}</Link></li>

                </ul>
            </li>
        </UserNavbar>
        <div>
            <h1>Admin</h1>
        </div>
    </>)
}