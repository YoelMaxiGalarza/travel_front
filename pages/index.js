import TopNavbar from "../components/navbar/TopNavbar";
import {useTranslation} from "react-i18next";
import {useEffect} from "react";
import Link from "next/link";


export default function Index() {
    const [t, i18n] = useTranslation("common");
    useEffect(() => {

    }, []);
    return (<>
        <TopNavbar>
            <li><Link className="nav-link  " aria-current="page" href="/login">{t("login.tag")}</Link></li>
            <li><Link className="nav-link " aria-current="page" href="/signin">{t("signin")}</Link></li>
        </TopNavbar>
        <div className="container-fluid">
            <h1 className="text-3xl  underline">
                Hello world!!
            </h1>
        </div>
    </>)
}



