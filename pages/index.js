import {useTranslation} from "react-i18next";
import {useEffect} from "react";
import TopNavbar from "../components/navbar/TopNavbar";
import Link from "next/link";


export default function Index() {
    const {t}= useTranslation("common");

    useEffect(() => {

    }, []);
    return (<>
        <TopNavbar>
            <li><Link className="nav-link  " aria-current="page"
                      href="/login">{t("login.tag")}</Link></li>
            <li><Link className="nav-link " aria-current="page"
                      href="/signin">{t("signin")}</Link></li>
        </TopNavbar>



    </>)
}



