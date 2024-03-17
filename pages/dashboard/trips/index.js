import {useTranslation} from "react-i18next";
import {HttpResourceFactory} from "../../../components/core/factory/HttpResourceFactory";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Sidebar from "../../../components/navbar/Sidebar";

export default function Trips() {

    const [t, i18n] = useTranslation("common");
    const http = HttpResourceFactory.create();
    const router = useRouter();
    const [locations, setLocations] = useState([{}]);

    function getLocations() {
        http.get("/trip/getAll", localStorage.getItem('Authorization')).then(response => {
            response.json().then(value => {
                let values = [{}]
                value.forEach((location, index) => {
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
                        // driver: location.appUser.name,
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
    }

    useEffect(() => {
        getLocations()
    }, []);

    function deleteTrip(event, locationId) {
        console.log(locationId)
        setLocations([{}])
        http.post("/location/delete?locationId=" + locationId,null, localStorage.getItem('Authorization')).then(response => {
            response.json().then(value => {
                console.log(value)
            })

        }).then(value => {
            getLocations()
        }).catch(error => {
            console.log(error);
        });
        //
    }

    return <>
        <Sidebar />
        <div className="container content">
            <div className="blog-wrapper">
                <div className="blog-card">
                    <div className="card-img">
                        <img src="https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"/>
                        <h1>Rosario</h1>
                        <h1>Cordoba</h1>
                    </div>
                    <div className="card-details"><span><i className="fa fa-calendar"></i>AUG 4</span><span><i className="fa fa-heart"></i>102</span></div>
                    <div className="card-text"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Si verbum sequimur, primum longius verbum praepositum quam bonum.</p></div>
                    <div className="read-more">Read More</div>
                </div>
                <div className="blog-card">
                    <div className="card-img"><img src="https://images.unsplash.com/photo-1445368794737-0cf251429ca0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"/>
                        <h1>San Francisco</h1>
                    </div>
                    <div className="card-details"><span><i className="fa fa-calendar"></i>AUG 1</span><span><i className="fa fa-heart"></i>265</span></div>
                    <div className="card-text"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Si verbum sequimur, primum longius verbum praepositum quam bonum.</p></div>
                    <div className="read-more">Read More</div>
                </div>
            </div>
            {/*<div className="col">*/}
            {/*    <div className="container">*/}
            {/*        <table className="table">*/}
            {/*            <thead>*/}
            {/*            <tr>*/}
            {/*                <th className={"col"}></th>*/}
            {/*                <th className={"col"}>fromCountryId</th>*/}
            {/*                <th className={"col"}>fromProvinceId</th>*/}
            {/*                <th className={"col"}>fromCityId</th>*/}
            {/*                <th className={"col"}>toCountryId</th>*/}
            {/*                <th className={"col"}>toProvinceId</th>*/}
            {/*                <th className={"col"}>toCityId</th>*/}
            {/*                <th className={"col"}>driver</th>*/}
            {/*                <th className={"col"}>description</th>*/}
            {/*                <th className={"col"}>departureDate</th>*/}
            {/*                <th className={"col"}>departureTime</th>*/}
            {/*                <th className={"col"}></th>*/}
            {/*            </tr>*/}
            {/*            </thead>*/}
            {/*            <tbody>*/}
            {/*            {locations.map((location, index) => {*/}
            {/*                if (location.id != null) {*/}
            {/*                    return <tr key={index} onClick={event => {*/}
            {/*                        // router.push({*/}
            {/*                        //         pathname: '/dashboard/trips/edit',*/}
            {/*                        //         query: {locationId: location.id}*/}
            {/*                        //     });*/}
            {/*                    }}>*/}
            {/*                        <th scope={"row"}>{location.id}</th>*/}
            {/*                        <td scope={"col"}> {location.fromCountryId}</td>*/}
            {/*                        <td scope={"col"}> {location.fromProvinceId}</td>*/}
            {/*                        <td scope={"col"}> {location.fromCityId}</td>*/}
            {/*                        <td scope={"col"}> {location.toCountryId}</td>*/}
            {/*                        <td scope={"col"}> {location.toProvinceId}</td>*/}
            {/*                        <td scope={"col"}> {location.toCityId}</td>*/}
            {/*                        <td scope={"col"}> {location.driver}</td>*/}
            {/*                        <td scope={"col"}> {location.description}</td>*/}
            {/*                        <td scope={"col"}> {location.departureDate}</td>*/}
            {/*                        <td scope={"col"}> {location.departureTime}</td>*/}
            {/*                        <td scope={"col"}> <button type="button" className="btn btn-danger" onClick={event => deleteTrip(event,location.id)}></button></td>*/}

            {/*                    </tr>*/}
            {/*                }*/}

            {/*            })}*/}
            {/*            </tbody>*/}
            {/*        </table>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    </>
}