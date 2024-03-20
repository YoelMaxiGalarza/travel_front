import Link from "next/link";
import {useTranslation} from "react-i18next";

export default function AdminSidebar () {
    const {t} = useTranslation("common")
    return (<>
        <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
            <li className={"nav-item"}><Link
                className="nav-link py-3 rounded-0"
                href="/admin/user">{t("user.user")}</Link>
            </li>
            <li className={"nav-item"}><Link
                className="nav-link py-3  rounded-0"
                href="/admin/roles">{t("roles")}</Link>
            </li>
            <li className={"nav-item"}><Link
                className="nav-link py-3 rounded-0"
                href="/admin/country">{t("country")}</Link>
            </li>

            <li className={"nav-item"}><Link
                className="nav-link py-3rounded-0"
                href="/admin/province">{t("province")}</Link>
            </li>
            <li className={"nav-item"}><Link
                className="nav-link py-3  rounded-0"
                href="/admin/city">{t("city")}</Link>
            </li>
        </ul>
    </>)
}