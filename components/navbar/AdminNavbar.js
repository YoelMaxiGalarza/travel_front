import TopNavbar from "./TopNavbar";
import {useTranslation} from "react-i18next";
import Link from "next/link";

export default function AdminNavbar({children}) {
    const [t, i18n] = useTranslation("common");

    return (<>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" href="/admin">{t("title")}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/settings/user" role="button" data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    {t("user.user")}
                                </a>
                                <ul className="dropdown-menu">

                                    <li><Link className="dropdown-item" href="/admin/user">{t("users")}</Link></li>
                                    <li><Link className="dropdown-item" href="/admin/user/create">{t("create")}</Link></li>
                                    <hr/>
                                    <li><Link className="dropdown-item" href="/admin/user/roles">{t("roles")}</Link></li>
                                    <li><Link className="dropdown-item" href="/admin/user/permissions">{t("permissions")}</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <div className="d-flex">

                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}