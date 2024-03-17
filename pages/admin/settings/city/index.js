import {HttpResourceFactory} from "../../../../components/core/factory/HttpResourceFactory";
import {useEffect, useState} from "react";

export default function City(){
    const http = HttpResourceFactory.create();
    const [citiesList,setCitiesList] = useState([{}]);
    useEffect(() => {
        http.get("/city/getAll",localStorage.getItem('Authorization')).then(value => {
            value.json().then(value1 => {
                setCitiesList(value1)
            })
        });
    }, []);

    return(
        <div>
            <h1>City</h1>
            <table className="table">
                <thead>
                <tr>
                    <th className={"col"}></th>
                    <th className={"col"}>name</th>
                    <th className={"col"}>iso</th>
                    <th className={"col"}>provinceId</th>
                    <th className={"col"}></th>
                </tr>
                </thead>
                <tbody>
                {citiesList.map((city, index) => {
                    if (city.id != null) {
                        return <tr key={index} onClick={event => {
                            // router.push({
                            //         pathname: '/dashboard/trips/edit',
                            //         query: {locationId: location.id}
                            //     });
                        }}>
                            <th scope={"row"}>{city.id}</th>
                            <td col={"col"}> {city.name}</td>
                            <td col={"col"}> {city.iso}</td>
                            <td col={"col"}> {city.provinceId}</td>
                            <td csol={"col"}> <button type="button" className="btn btn-danger" onClick={event => deleteTrip(event,city.id)}></button></td>

                        </tr>
                    }

                })}
                </tbody>
            </table>
        </div>
    )
}