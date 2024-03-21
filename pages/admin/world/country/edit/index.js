import {useTranslation} from "react-i18next";
import {useContext, useEffect, useState} from "react";
import {
    CountryResource
} from "../../../../../components/core/resourcefactory/CountryResource";
import Sidebar from "../../../../../components/navbar/Sidebar";
import {HttpResourceContext} from "../../../../../components/core/context/CustomContext";
import {useSearchParams} from "next/navigation";

export default function EditCountry(){
    const {t} = useTranslation("common")
    const params = useSearchParams();
    const {http, router} = useContext(HttpResourceContext);
    const countryResource = CountryResource.create(http);
    const [country, setCountry] = useState({
        iso: "",
        name: "",
        niceName: "",
        iso3: "",
        numCode: 0,
        phoneCode: 0
    })

    async function submitForm(event) {
        event.preventDefault();
        console.log(country)
        const request = await countryResource.updateCountry(JSON.stringify(country),localStorage.getItem('Authorization'))
        const response = await request.json();
        console.log(response)
        setCountry({
            ...country,
            iso: "",
            name: "",
            niceName: "",
            iso3: "",
            numCode: null,
            phoneCode: null
        })
        router.push("/admin/world/country")
    }

    useEffect(() => {
        countryResource.getById(params.get("countryId"),localStorage.getItem('Authorization'))
            .then(value => {
                if(value.status == 200){
                    value.json().then((response) => {
                        setCountry(response)
                    })
                }else{
                    router.push("/admin/world/country")
                }

            })

    }, []);
    return (<>
        <Sidebar/>
        <br/>
        <div className="blog-wrapper">
            <div className="card ">
                <div className="card-body">
                    <form >
                        <div className="mb-3">
                            <input type="hidden" value={country.id}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name"
                                   className="form-label">{t("name")}</label>
                            <input type="text" className="form-control" id="name"
                                   required={true}
                                   value={country.name}
                                   onChange={event => {
                                       setCountry({...country, name: event.target.value})
                                   }}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="niceName"
                                   className="form-label">{t("niceName")}</label>
                            <input type="text" className="form-control" id="niceName"
                                   required={true}
                                   value={country.niceName}
                                   onChange={event => {
                                       setCountry({...country, niceName: event.target.value})

                                   }}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="iso"
                                   className="form-label">{t("iso")}</label>
                            <input type="text" className="form-control" id="iso"
                                   required={true}
                                   value={country.iso}
                                   onChange={event => {
                                       setCountry({...country, iso: event.target.value})

                                   }}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="iso3"
                                   className="form-label">{t("iso3")}</label>
                            <input type="text" className="form-control" id="iso3"
                                   value={country.iso3}
                                   onChange={event => {
                                       setCountry({...country, iso3: event.target.value})

                                   }}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="numCode"
                                   className="form-label">{t("numCode")}</label>
                            <input type="text" className="form-control" id="numCode"
                                   value={country.numCode}
                                   onChange={event => {
                                       setCountry({...country, numCode: event.target.value})

                                   }}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneCode"
                                   className="form-label">{t("phoneCode")}</label>
                            <input type="text" className="form-control" id="phoneCode"
                                   value={country.phoneCode}
                                   onChange={event => {
                                       setCountry({...country, phoneCode: event.target.value})

                                   }}/>
                        </div>
                        <button type="submit"
                                className="btn btn-primary" onClick={submitForm}>{t("submit")}</button>
                    </form>
                </div>
            </div>
        </div>
    </>)
}