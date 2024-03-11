import TopNavbar from "./TopNavbar";
import {useTranslation} from "react-i18next";
import {useContext, useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {HttpResourceFactory} from "../core/factory/HttpResourceFactory";


export default function UserNavbar({children}) {
    const [t, i18n] = useTranslation("common");
    const router = useRouter()
    const http = HttpResourceFactory.create();


    return <TopNavbar>
        <li><Link className="nav-link" href="/dashboard">{t("panel")}</Link></li>

        <li><Link type="button" className="nav-link"
                  href="/dashboard/trips">{t("myTrips")}</Link></li>
        {children}
        <li><Link className="nav-link" href="/logout">{t("logout")}</Link>
        </li>
    </TopNavbar>
}