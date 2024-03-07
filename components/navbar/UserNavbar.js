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


    function handleLogout(event) {
        event.preventDefault();
        http.post("/logout",null,localStorage.getItem('Authorization'));
        localStorage.clear();
        router.push("/")
    }

    return <TopNavbar>
        <li><Link type="button" className="nav-link" href="/dashboard/trips">{t("myTrips")}</Link></li>
        <li><Link type="button" className="nav-link" href="/dashboard/profile">{t("messages")}</Link></li>
        <li><Link type="button" className="nav-link" href="/dashboard/profile">{t("profile")}</Link></li>
        <li><Link type="button" className="nav-link" href="/dashboard/settings">{t("settings")}</Link></li>
        {children}
        <li><Link type="button" className="nav-link" href="#" onClick={handleLogout}>{t("logout")}</Link></li>
    </TopNavbar>
}