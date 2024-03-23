import Link from "next/link";
import {useTranslation} from "react-i18next";

export default function AdminSidebar() {
    const {t} = useTranslation("common")
    return (<>
        <li className="nav-item">
            {/*TODO https://getbootstrap.com/docs/5.3/components/popovers/#disabled-elements*/}
            <Link
                className="nav-link py-3 rounded-0"
                href="/admin/world/country"><i className="fa-solid fa-earth-americas"></i></Link>
        </li>
        <li className={"nav-item"}><Link
            className="nav-link py-3  rounded-0"
            href="/admin/world/city"><i className="fa-solid fa-city"></i></Link>
        </li>
        <li className={"nav-item"}><Link
            className="nav-link py-3  rounded-0"
            href="/admin/user"><i className="fa-solid fa-user"></i></Link>
        </li>
        {/*<li className={"nav-item"}><Link*/}
        {/*    className="nav-link py-3 rounded-0"*/}
        {/*    href="/admin/user">{t("user.user")}</Link>*/}
        {/*</li>*/}
        {/*<li className={"nav-item"}><Link*/}
        {/*    className="nav-link py-3  rounded-0"*/}
        {/*    href="/admin/roles">{t("roles")}</Link>*/}
        {/*</li>*/}


        {/*<li className={"nav-item"}><Link*/}
        {/*    className="nav-link py-3rounded-0"*/}
        {/*    href="/admin/province">{t("province")}</Link>*/}
        {/*</li>*/}

    </>)
}