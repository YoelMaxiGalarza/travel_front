import Sidebar from "../../../components/navbar/Sidebar";
import {useContext, useEffect, useState} from "react";

import {useTranslation} from "react-i18next";
import {
    CountryResourceFactory
} from "../../../components/core/resourcefactory/CountryResourceFactory";
import {HttpResourceContext} from "../../../components/core/context/CustomContext";

export default function Country() {

    const {http} = useContext(HttpResourceContext)
    const countryResource = CountryResourceFactory.create(http)
    const [countries, setCountries] = useState([]);
    const {t} = useTranslation("common")

    async function getAllCountries() {

        const request = await countryResource.getAllCountries(sessionStorage.getItem('Authorization'))
        const response = await request.json();
        setCountries(response);
    }


    useEffect(() => {
        getAllCountries()
    }, []);

    async function removeCountry(countryId) {
        const request = await countryResource.deleteCountry(countryId, sessionStorage.getItem('Authorization'))
        const response = await request.json();
        console.log(response)
        getAllCountries()

    }

    return (<>
        <Sidebar/>
        <div className="blog-wrapper">
            <button className="btn btn-primary" onClick={event => {
                event.preventDefault()
                router.push({pathname: "/admin/country/create"})
            }}>Crear
            </button>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">{t("name")}</th>
                    <th scope="col">{t("iso")}</th>
                    <th scope="col">{t("phoneCode")}</th>
                    <th scope="col">{t("edit")}</th>
                </tr>
                </thead>
                <tbody>
                {countries.map((country, index) => {
                    return <tr>
                        <th scope="row">{country.id}</th>
                        <td>{country.name}</td>
                        <td>{country.iso}</td>
                        <td>{country.phoneCode}</td>
                        <td>
                            <button className="btn btn-danger "
                                    onClick={event => removeCountry(country.id)}>
                                <i className="fa-solid fa-trash">{}</i>
                            </button>
                        </td>
                    </tr>
                })}

                </tbody>
            </table>
        </div>
    </>)
}