import UserNavbar from "../../../components/navbar/UserNavbar";
import Footer from "../../../components/core/footer";
import {useTranslation} from "react-i18next";
import SideNavbar from "../../../components/navbar/SideNavbar";
import Link from "next/link";

export default function Trips({children}){

    const [t, i18n] = useTranslation("common");

    return <>
        <UserNavbar/>
        <div className="container row">
            <div className="col-sm-2">
                <SideNavbar>
                    <Link className="nav-link active" aria-current="page" href="/dashboard/trips/createtrip">{t("createTrip")}</Link>
                </SideNavbar>
            </div>
        </div>
    </>
}