import {useTranslation} from "react-i18next";
import {useContext, useEffect, useState} from "react";
import {HttpResourceFactory} from "../../components/core/resourcefactory/HttpResourceFactory";
import Sidebar from "../../components/navbar/Sidebar";
import {useRouter} from "next/navigation";
import {HttpResourceContext} from "../../components/core/context/CustomContext";
import TripResourceFactory from "../../components/core/resourcefactory/TripResourceFactory";


export default function Dashboard() {
    const {http, router} = useContext(HttpResourceContext);
    const {t} = useTranslation("common");

    const tripResource = TripResourceFactory.create(http);
    const [trips, setTrips] = useState([]);

    async function getTrips() {
        let auth = localStorage.getItem('Authorization');
        const request = await tripResource.getAllTrips(auth);
        let response = [];
        response = await request.json();
        setTrips(response.map(value => {
            let date = new Date(value.departureDate);
            return (
                <div className="blog-card" key={value.id}>
                    <div className="card-img">
                        <img src="/img/cards/route-612x612.jpg"/>
                        <h1 className={"fromCity"}><i
                            className="fa-solid fa-location-dot location-dot-fromCity"></i>{value.fromProvince.name}
                        </h1>
                        <h1 className={"toCity"}><i
                            className="fa-solid fa-location-dot location-dot-toCity"></i>{value.toProvince.name}
                        </h1>
                    </div>
                    <div className="card-details">
                    <span><i
                        className="fa fa-calendar"></i>{date.getDate()}/{date.getMonth()}/{date.getFullYear()}</span>
                        <span><i className="fa fa-clock"></i>{value.departureTime}</span>
                        <span><i className="fa fa-heart"></i>{value.likes}</span>
                    </div>
                    <div className="card-text"><p>{value.description}</p></div>
                    <div className="btn read-more" onClick={event => {
                        event.preventDefault();
                        router.push({
                            pathname: '/dashboard/trips/view', query: {tripId: value.id},
                        })
                    }}>{t("join")}</div>
                </div>)

        }));
    }

    useEffect(() => {
        getTrips()
    }, []);
    return (<>
        <Sidebar></Sidebar>
        <div className=" blog-wrapper">
            <br/>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title"></h5>
                    <div className="container row-sm">
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
        <div className="blog-wrapper">
            {trips}
        </div>

    </>);
}
