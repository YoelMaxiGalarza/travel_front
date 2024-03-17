import TopNavbar from "../../components/navbar/TopNavbar";
import Link from "next/link";
import {useTranslation} from "react-i18next";

export default function Register() {
    const [t,i18n] = useTranslation('common')
    return (<>
            <TopNavbar>
                <li><Link className="nav-link  " aria-current="page"
                          href="/login">{t("login.tag")}</Link></li>
                <li><Link className="nav-link " aria-current="page"
                          href="/signin">{t("signin")}</Link></li>
            </TopNavbar>
            <div>
                <h1>Register</h1>
            </div>

        </>
    )
}