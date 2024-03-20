import {useTranslation} from "react-i18next";
import {useEffect} from "react";
import Link from "next/link";


export default function Index() {
    const {t} = useTranslation("common");

    useEffect(() => {
        sessionStorage.clear();
    }, []);
    return (<>
        <ul>
            <li><Link className="nav-link  " aria-current="page"
                      href="/login">{t("login.tag")}</Link></li>
        </ul>


    </>)
}



