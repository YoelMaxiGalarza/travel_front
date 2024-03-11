import {useTranslation} from "react-i18next";
import {useContext, useEffect, useState} from "react";
import UserNavbar from "../../components/navbar/UserNavbar";
import {HttpResourceFactoryContext} from "../../components/core/context";
import Link from "next/link";
import {HttpResourceFactory} from "../../components/core/factory/HttpResourceFactory";
import Image from "next/image";


export default function Dashboard() {
    const [t, i18n] = useTranslation("common");
    const http = useContext(HttpResourceFactoryContext);
    const[trips, setTrips] = useState([]);
    useEffect(() => {
        http.get("/location/getAll",localStorage.getItem('Authorization')).then((response) => {
            response.json().then((data) => {
                console.log(data)
                setTrips(data);
                
            });
        })
    }, []);
    return (<>
        <UserNavbar>
        </UserNavbar>

        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title"></h5>
                    <div className="container row">
                        <div className="col-sm"></div>
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

                    <p class="card-text">Some quick example text to build on the card title and
                        make up the bulk of the cards content.</p>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row">
                {trips.map((trip, index) => {
                    return (
                        <div className="col-sm" key={index}>
                            <div className="card" style={{width: "18rem"}}>
                                <Image className="card-img-top" src="/img/cards/unnamed.jpg" alt="Card image cap" width={200} height={260}/>
                                <div className="card-body">
                                    <h1 className="card-title">{trip.fromProvinceId.name}</h1>
                                    <h3 className="card-title">{trip.fromCityId.name}</h3>
                                    <Link href={"/trip/"+trip.id}>
                                        {t("view")}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </>);
}
