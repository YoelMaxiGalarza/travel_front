import {useTranslation} from "react-i18next";
import {useContext} from "react";
import {LoginContext} from "../core/context";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {HttpResourceFactory} from "../core/factory/HttpResourceFactory";

export default function TopNavbar({children}) {
    const [t, i18n] = useTranslation("common");
    const router = useRouter();
    const http = HttpResourceFactory.create();

    function handleLogout(event) {
        event.preventDefault();
        http.post("/logout", null, localStorage.getItem('Authorization'));
        localStorage.clear();
        router.push("/")
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" href="#">{t("title")}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {children}
                        </ul>
                        <div className="d-flex">

                        </div>
                    </div>
                </div>
            </nav>
            <br/>
        </>)
}




