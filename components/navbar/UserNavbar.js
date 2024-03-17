import TopNavbar from "./TopNavbar";
import {useTranslation} from "react-i18next";
import {useContext, useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {HttpResourceFactory} from "../core/factory/HttpResourceFactory";


export default function UserNavbar({children}) {
    const [t, i18n] = useTranslation("common");


    return (<>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" href="/dashboard">{t("title")}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li><Link className="nav-link" href="/dashboard">{t("panel")}</Link>
                        </li>

                        <li><Link type="button" className="nav-link"
                                  href="/dashboard/trips">{t("myTrips")}</Link></li>
                        {children}
                        <li><Link className="nav-link" href="/logout">{t("logout")}</Link></li>
                    </ul>
                    <div className="d-flex">

                    </div>
                </div>
            </div>
        </nav>
    </>)
}