import TopNavbar from "./TopNavbar";
import {useTranslation} from "react-i18next";
import Link from "next/link";

export default function AdminNavbar({children}) {
    const [t, i18n] = useTranslation("common");

    return (<>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                   aria-expanded="false">
                    {t("user.userManagement")}
                </a>
                <ul className="dropdown-menu">

                    <li><Link className="dropdown-item" href="/dashboard/admin/user/create">{t("create")}</Link></li>
                    <li><Link className="dropdown-item" href="/dashboard/admin/user/roles">{t("roles")}</Link></li>

                </ul>
                {children}
            </li>
        </>
    )
}