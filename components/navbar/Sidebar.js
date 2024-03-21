import {useTranslation} from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import AdminSidebar from "./AdminSidebar";


export default function Sidebar() {
    const [t, i18n] = useTranslation('common');
    const [adminSidebar, setAdminSidebar] = useState(<></>)
    useEffect(() => {
        let roles = JSON.parse(localStorage.getItem('roles'));
        roles.forEach(role => {
            if (role.name == "ROLE_ADMIN") {
                setAdminSidebar(<AdminSidebar/>)
            }
        })
    }, []);

    return (<>
        <div className="sidebar d-flex flex-column flex-shrink-0 bg-body-tertiary"
             style={{width: "4.5rem", height: "100%", position: "fixed", zIndex: "99999"}}
             bis_skin_checked="1">
            <Link href="/dashboard"
                  className="d-block p-3 link-body-emphasis text-decoration-none"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right" aria-label="Icon-only"
                  data-bs-original-title="Icon-only">
                <Image src={"/img/favicon.ico"} alt={"..."} width={40} height={40}/>
            </Link>
            <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                <li className="nav-item">
                    <Link href="/dashboard"
                          className="nav-link py-3 border-bottom rounded-0 "
                          aria-current="page" data-bs-toggle="tooltip"
                          data-bs-placement="right" aria-label="Home"
                          data-bs-original-title="Home">
                        <i className="fa-solid fa-house"></i>
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/trips"
                          className="nav-link p3  rounded-0"
                          data-bs-toggle="tooltip" data-bs-placement="right"
                          aria-label="trips" data-bs-original-title="Dashboard">
                        <i className="fa-solid fa-car-side"></i>
                    </Link>
                </li>
            </ul>
            <div className="dropdown border-top" bis_skin_checked="1">

                {/*ADMIN*/}
                <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                    {adminSidebar}
                </ul>



                <div className="btn-group dropend">
                    <Link href="#"
                          className="d-flex align-items-center  justify-content-center p-4 link-body-emphasis text-decoration-none dropdown-toggle"
                          data-bs-toggle="dropdown" aria-expanded="false">
                        <Image src={"/img/favicon.ico"} alt={"..."} width={24} height={24}/>
                    </Link>
                    <ul className="dropdown-menu text-small shadow">

                        <li><Link className="dropdown-item"
                                  href="/admin">{t("settings")}</Link>
                        </li>
                        <li><Link className="dropdown-item"
                                  href="/dashboard/profile">{t("profile")}</Link>
                        </li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li><Link className="dropdown-item" href="/logout">{t("logout")}</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </>)
}