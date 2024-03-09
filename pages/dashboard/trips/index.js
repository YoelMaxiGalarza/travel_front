import UserNavbar from "../../../components/navbar/UserNavbar";
import {useTranslation} from "react-i18next";
import SideNavbar from "../../../components/navbar/SideNavbar";
import Link from "next/link";
import {HttpResourceFactory} from "../../../components/core/factory/HttpResourceFactory";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function Trips() {

    const [t, i18n] = useTranslation("common");
    const http = HttpResourceFactory.create();
    const router = useRouter();
    const [locations, setLocations] = useState([{}]);
    useEffect(() => {

        http.get("/location/getAll", localStorage.getItem('Authorization')).then(response => {
            response.json().then(value => {
                console.log(value)
                let values = [{}]
                value.forEach((location, index) => {
                    console.log(location.appUser.name)
                    console.log(location.departureTime)
                    let date = new Date(location.departureDate);
                    let dateDeparture = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
                    values.push({
                        id: location.id,
                        fromCountryId: location.fromCountryId.name,
                        fromProvinceId: location.fromProvinceId.name,
                        fromCityId: location.fromCityId.name,
                        toCountryId: location.toCountryId.name,
                        toProvinceId: location.toProvinceId.name,
                        toCityId: location.toCityId.name,
                        driver: location.appUser.name,
                        description: location.description,
                        departureDate: dateDeparture,
                        departureTime: location.departureTime,
                    })

                });
                setLocations(values)
            })
        }).catch(error => {
            console.log(error);
        });
    }, []);
    return <>
        <UserNavbar/>
        <div className="container row">
            <div className="col-sm-2">
                <SideNavbar>
                    <Link className="nav-link active" aria-current="page"
                          href="/dashboard/trips/create">{t("createTrip")}</Link>
                </SideNavbar>
            </div>
            <div className="col">
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th className={"col"}>fromCountryId</th>
                            <th className={"col"}>fromProvinceId</th>
                            <th className={"col"}>fromCityId</th>
                            <th className={"col"}>toCountryId</th>
                            <th className={"col"}>toProvinceId</th>
                            <th className={"col"}>toCityId</th>
                            <th className={"col"}>driver</th>
                            <th className={"col"}>description</th>
                            <th className={"col"}>departureDate</th>
                            <th className={"col"}>departureTime</th>
                        </tr>
                        </thead>
                        <tbody>
                        {locations.map((location, index) => {
                            return <tr key={index} onClick={event => {
                                router.push("/dashboard/trips/edit?locationId=" + location.id)
                            }}>
                                <th scope={"row"}>{location.id}</th>
                                <td col={"col"}> {location.fromCountryId}</td>
                                <td col={"col"}> {location.fromProvinceId}</td>
                                <td col={"col"}> {location.fromCityId}</td>
                                <td col={"col"}> {location.toCountryId}</td>
                                <td col={"col"}> {location.toProvinceId}</td>
                                <td col={"col"}> {location.toCityId}</td>
                                <td col={"col"}> {location.driver}</td>
                                <td col={"col"}> {location.description}</td>
                                <td col={"col"}> {location.departureDate}</td>
                                <td col={"col"}> {location.departureTime}</td>

                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
}