import Sidebar from "../../../../components/navbar/Sidebar";
import {useSearchParams} from "next/navigation";
import {HttpResourceFactory} from "../../../../components/core/factory/HttpResourceFactory";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

export default function TripView() {
    const params = useSearchParams();
    const tripId = params.get('tripId');
    const http = HttpResourceFactory.create();
    const [tripData, setTripData] = useState({
        "id": 1,
        "fromCountry": {
            "id": 10,
            "iso": "AR",
            "name": "ARGENTINA",
            "niceName": "Argentina",
            "iso3": "ARG",
            "numCode": 32,
            "phoneCode": 54
        },
        "fromProvince": {
            "id": 4,
            "name": "Córdoba",
            "iso": "COR",
            "countryId": 10
        },
        "fromCity": {
            "id": 487,
            "name": "Agua de Oro",
            "iso": "COR",
            "provinceId": 4
        },
        "toCountry": {
            "id": 10,
            "iso": "AR",
            "name": "ARGENTINA",
            "niceName": "Argentina",
            "iso3": "ARG",
            "numCode": 32,
            "phoneCode": 54
        },
        "toProvince": {
            "id": 3,
            "name": "Catamarca",
            "iso": "CAT",
            "countryId": 10
        },
        "toCity": {
            "id": 335,
            "name": "Capayán",
            "iso": "CAT",
            "provinceId": 3
        },
        "departureDate": "Mar 14, 2024, 12:50:38 AM",
        "departureTime": "12:00",
        "amountPassengers": 0,
        "passengers": [],
        "description": "asdasda",
        "userId": 1,
        "username": "string",
        "onlyFriends": false
    })
    const {t} = useTranslation("common")
    async function getTripData () {
        const request = await http.get(`/trip/get/${tripId}`,localStorage.getItem('Authorization'))
        const response = await request.json()
        console.log(response)
    }
    useEffect(() => {


        getTripData()

    }, []);

    return (
        <>
            <Sidebar/>
            <div className="blog-wrapper" style={{backgroundColor: "red"}}>
                <div className="card-details" style={{backgroundColor:"cyan"}}>
                    <div className="row" style={{backgroundColor:"yellow"}}>
                        <div className="col">
                            <label htmlFor="fromProvince">{t("fromProvince")}:</label>
                            <p>{tripData.fromProvince.name}</p>
                        </div>
                        <div className="col"></div>
                        <div className="col"><p>To: {tripData.toProvince.name}</p></div>

                    </div>
                    <ul>
                        <li> <p>From: {tripData.fromProvince.name}</p></li>
                        <li> <p>From: {tripData.toProvince.name}</p></li>
                    </ul>
                </div>

            </div>
        </>
    )

}


