import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import UserNavbar from "../../components/navbar/UserNavbar";
import Link from "next/link";
import {HttpResourceFactory} from "../../components/core/factory/HttpResourceFactory";
import Image from "next/image";
import Sidebar from "../../components/navbar/Sidebar";


export default function Dashboard() {
    const [t, i18n] = useTranslation("common");
    const http = HttpResourceFactory.create();
    const [trips, setTrips] = useState([]);
    useEffect(() => {

    }, []);
    return (<>
        {/*<UserNavbar/>*/}
        <Sidebar></Sidebar>
        <div className=" content row">
            <div className="col-sm-2">

            </div>
            <div className="col-sm">
                <br/>
                <div className="container">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title"></h5>
                            <div className="container row">
                                <div className="col-sm">
                                    <input className="form-control" type="text"
                                           placeholder={t("origin")}
                                           aria-label="default input example"/>
                                </div>
                                <div className="col-sm">
                                    <input className="form-control" type="text"
                                           placeholder={t("destination")}
                                           aria-label="default input example"/>
                                </div>
                                <div className="col-sm"><a href="#"
                                                           className="btn btn-primary">{t("search")}</a>
                                </div>
                            </div>

                            <p className="card-text">Some quick example text to build on the
                                card title and
                                make up the bulk of the cards content.</p>
                        </div>
                    </div>
                </div>
                {/*<div className="container">*/}
                {/*    <div className="row">*/}
                {/*        {trips.map((trip, index) => {*/}
                {/*            return (*/}
                {/*                <div className="col-sm" key={index}>*/}
                {/*                    <div className="card" style={{width: "18rem"}}>*/}
                {/*                        <Image className="card-img-top"*/}
                {/*                               src="/img/cards/unnamed.jpg"*/}
                {/*                               alt="Card image cap" width={200} height={260}/>*/}
                {/*                        <div className="card-body">*/}
                {/*                            <h1 className="card-title">{trip.fromProvinceId.name}</h1>*/}
                {/*                            <h3 className="card-title">{trip.fromCityId.name}</h3>*/}
                {/*                            <Link href={"/trip/" + trip.id}>*/}
                {/*                                {t("view")}*/}
                {/*                            </Link><Link href={"/trip/" + trip.id}>*/}
                {/*                            {t("request")}*/}
                {/*                        </Link>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            )*/}
                {/*        })}*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            <div className="col-sm-1"></div>
        </div>


    </>);
}
