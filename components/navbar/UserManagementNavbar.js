import {useTranslation} from "react-i18next";

export default function UserManagementNavbar() {
    const {t} = useTranslation("common")
    return <>
        <div className="blog-wrapper">
            <ul className="nav">
                <li className="nav-item">
                    <a className="nav-link" aria-current="page"
                       href="/admin/user">{t("users")}</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/admin/roles">{t("roles")}</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/admin/permissions">{t("permissions")}</a>
                </li>

            </ul>
        </div>
    </>
}