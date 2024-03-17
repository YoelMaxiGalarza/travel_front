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
        {/*<div className="w-screen min-h-12 bg-blue-400 rounded-b place-content-center">*/}
        {/*    <h1 >Test</h1>*/}
        {/*</div>*/}
        {/*<div className="min-h-screen place-content-center">*/}
        {/*    <div*/}
        {/*        className="bg-emerald-500 w-52 h-52 rounded-full shadow-2xl place-content-center">*/}
        {/*        <div*/}
        {/*            className="bg-blue-600 w-10 h-10 rounded-full shadow-2xl place-content-center">*/}
        {/*            <div*/}
        {/*                className="bg-red-600 w-20 h-20 rounded-full shadow-2xl place-content-center">*/}

        {/*            </div>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*</div>*/}


    </>)
}



