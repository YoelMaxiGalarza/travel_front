import Sidebar from "../../../../components/navbar/Sidebar";
import {useContext, useEffect, useState} from "react";

import {useTranslation} from "react-i18next";
import {
    CountryResource
} from "../../../../components/core/resourcefactory/CountryResource";
import {HttpResourceContext} from "../../../../components/core/context/CustomContext";
import UserManagementNavbar from "../../../../components/navbar/UserManagementNavbar";

export default function Country() {

    const {http,router} = useContext(HttpResourceContext)
    const countryResource = CountryResource.create(http)
    const [countries, setCountries] = useState([]);
    const {t} = useTranslation("common")

    async function getAllCountries() {
        const request = await countryResource.getAllCountries(localStorage.getItem('Authorization'))
        const response = await request.json();
        setCountries(response);
    }


    useEffect(() => {
        getAllCountries()
    }, []);

    async function removeCountry(countryId) {
        const request = await countryResource.deleteCountry(countryId, localStorage.getItem('Authorization'))
        const response = await request.json();
        console.log(response)
        getAllCountries()

    }

    async function searchCoutry(event) {
        event.preventDefault();
        let pattern = event.target.value;
        if (!(pattern == "") && !(pattern == undefined)) {
            let auth = localStorage.getItem('Authorization');
            const request = await countryResource.searchCountry(pattern, auth)
            const response = await request.json();
            setCountries(response);
        } else {
            getAllCountries()
        }
    }

    function editCountry(countryId) {
        router.push({
            pathname: "/admin/world/country/edit",
            query: {countryId: countryId},
        })
    }

    return (<>
        <Sidebar/>
        <br/>
        <UserManagementNavbar />
        <div className="blog-wrapper">
            <div className="card">
                <div className="card-body">
                    <ul className="nav">
                        <li className="d-flex">
                            <input className="form-control me-2" type="search"
                                   placeholder="Search"
                                   aria-label="Search" onChange={searchCoutry}/>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-primary" onClick={event => {
                                event.preventDefault()
                                router.push({pathname: "/admin/world/country/create"})
                            }}>Crear
                            </button>
                        </li>
                    </ul>


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

                                    <button className="btn btn-success "
                                            onClick={event => editCountry(country.id)}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
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
            </div>
        </div>
    </>)
}
