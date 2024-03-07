import {useTranslation} from "react-i18next";
import {useContext} from "react";
import {LoginContext} from "../core/context";
import Link from "next/link";

export default function TopNavbar({children}) {
    const [t, i18n] = useTranslation("common");
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" href="/">{t("title")}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {children}
                        </ul>
                        <form className="d-flex" role="search">

                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">{t("search")}</button>
                        </form>
                    </div>
                </div>
            </nav>
            <br/>
        </>)
}




