import {useTranslation} from "react-i18next";
import {useContext, useEffect, useState} from "react";
import UserNavbar from "../../components/navbar/UserNavbar";
import {HttpResourceFactoryContext} from "../../components/core/context";
import Link from "next/link";

export default function Dashboard() {
    const [t, i18n] = useTranslation("common");
    const httpResource = useContext(HttpResourceFactoryContext);
    const [isAdmin , setIsAdmin] = useState(true);
    useEffect(() => {
        // let roles = localStorage.getItem("Roles");
        // if (roles.includes("ROLE_ADMIN")) {
        //     setIsAdmin(true);
        // }
    }, []);
    return (<>
        <UserNavbar >
            {isAdmin ? (<>
                <li><Link type="button" className="nav-link" href="/dashboard/admin">{t("admin")}</Link></li>
            </>) : null}
        </UserNavbar>

        <div className="row">
            <div className="col-sm-2">asd</div>
            <div className="col-sm-2">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">{t("from")}</th>
                        <th scope="col">{t("to")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>asdasdsadas</td>
                        <td>asdasdasds</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>);
}
