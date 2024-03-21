import Sidebar from "../../../../components/navbar/Sidebar";
import {useState} from "react";
import {useTranslation} from "react-i18next";

export default function City() {
    const [cities, setCities] = useState([])
    const {t} = useTranslation("common")
    function searchCity(event) {
        event.preventDefault()

    }

    function editCity(cityId) {
        console.log(cityId)
    }

    function removeCity(cityId) {
        console.log(cityId)
    }

    return (<>
        <Sidebar/>
        <div className="blog-wrapper">
            <div className="card">
                <div className="card-body">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search"
                               placeholder="Search"
                               aria-label="Search" onChange={searchCity}/>
                    </form>

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
                        {cities.map((city, index) => {
                            return <tr>
                                <th scope="row">{city.id}</th>
                                <td>{city.name}</td>
                                <td>{city.iso}</td>
                                <td>{city.phoneCode}</td>
                                <td>

                                    <button className="btn btn-success "
                                            onClick={event => editCity(city.id)}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button className="btn btn-danger "
                                            onClick={event => removeCity(city.id)}>
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