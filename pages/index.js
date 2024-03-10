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
            <li><Link className="nav-link  " aria-current="page"
                      href="/login">{t("login.tag")}</Link></li>
            <li><Link className="nav-link " aria-current="page"
                      href="/signin">{t("signin")}</Link></li>
        </TopNavbar>
        <div className="container">

            <div id="carouselExampleInterval" className="carousel slide"
                 data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="5000">
                        <img src="/img/landscape_1.png" className="d-block w-100"
                             alt="landscape_1"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>First slide label</h5>
                            <p>Some representative placeholder content for the first slide.</p>
                        </div>

                    </div>
                    <div className="carousel-item" data-bs-interval="5000">
                        <img src="/img/landscape_2_buenosaires.png" className="d-block w-100"
                             alt="landscape_2"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Second slide label</h5>
                            <p>Some representative placeholder content for the first slide.</p>
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval="5000">
                        <img src="/img/landscape_3_rosario.png" className="d-block w-100"
                             alt="landscape_3"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Second slide label</h5>
                            <p>Some representative placeholder content for the first slide.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}



