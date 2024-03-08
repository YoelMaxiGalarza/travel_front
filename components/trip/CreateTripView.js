import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";


import {HttpResourceFactory} from "../core/factory/HttpResourceFactory";
//https://www.npmjs.com/package/react-time-picker?activeTab=readme
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import {TimePicker} from "react-time-picker";
//https://www.npmjs.com/package/react-date-picker
import {DatePicker} from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

export default function CreateTripView() {

    const [t, i18n] = useTranslation("common");
    const http = HttpResourceFactory.create();
    let [fromCountryDepartureSelectorValues, setFromCountryDepartureSelectorValues] = useState([])
    let [fromProvinceDepartureSelectorValues, setFromProvinceDepartureSelectorValues] = useState([])
    let [fromCityDepartureSelectorValues, setFromCityDepartureSelectorValues] = useState([])
    let [fromCountryId, setFromCountryId] = useState(null)
    let [fromProvinceId, setFromProvinceId] = useState(null)
    let [fromCityId, setFromCityId] = useState(null)

    let [toCountryDepartureSelectorVales, setToCountryDepartureSelectorVales] = useState([])
    let [toCityDepartureSelectorValues, setToCityDepartureSelectorValues] = useState([])
    let [toProvinceDepartureSelectorValues, setToProvinceDepartureSelectorValues] = useState([])
    let [toCountryId, setToCountryId] = useState(null)
    let [toProvinceId, setToProvinceId] = useState(null)
    let [toCityId, setToCityId] = useState(null)


    const [departureDate, setDepartureDate] = useState(new Date());
    const [departureTime, setDepartureTime] = useState('10:00');

    const GetCountryData = () => {
        try {
            http.get("/location", localStorage.getItem("Authorization")).then((response) => {
                response.json().then((data) => {
                    let countries = data.map((country) => {
                        return <option key={country.id} value={country.id}>{country.name}</option>
                    });
                    setFromCountryDepartureSelectorValues(countries);
                    setToCountryDepartureSelectorVales(countries);
                });
            });
        } catch (error) {
            console.error("Error al enviar los datos:", error);
        }
    }

    async function GetProvinceData(fromto, countryId) {
        if (fromto === "from") {
            http.get("/location?countryId=" + countryId, localStorage.getItem("Authorization")).then((response) => {
                response.json().then((data) => {
                    let countries = data.map((country) => {
                        return <option key={country.id} value={country.id}>{country.name}</option>
                    });
                    setFromProvinceDepartureSelectorValues(countries);
                });
            });
            setFromCountryId(countryId);
        } else {
            http.get("/location?countryId=" + countryId, localStorage.getItem("Authorization")).then((response) => {
                response.json().then((data) => {
                    let countries = data.map((province) => {
                        return <option key={province.id} value={province.id}>{province.name}</option>
                    });
                    setToProvinceDepartureSelectorValues(countries);
                });
            });
            setToCountryId(countryId);
        }

    }

    async function GetCityData(fromto, provinceId) {
        if (fromto === "from") {
            http.get("/location?provinceId=" + provinceId, localStorage.getItem("Authorization"))
                .then((response) => {
                    response.json().then((data) => {
                        let countries = data.map((country) => {
                            return <option key={country.id} value={country.id}>{country.name}</option>
                        });
                        setFromCityDepartureSelectorValues(countries);
                    });
                });
            setFromProvinceId(provinceId);
        } else {
            http.get("/location?provinceId=" + provinceId, localStorage.getItem("Authorization"))
                .then((response) => {
                    response.json().then((data) => {
                        let countries = data.map((province) => {
                            return <option key={province.id} value={province.id}>{province.name}</option>
                        });
                        setToCityDepartureSelectorValues(countries);
                    });
                });
            setToProvinceId(provinceId);
        }
    }

    async function storeCityData(fromto, cityId) {
        if (fromto === "from") {
            setFromCityId(cityId);
        } else {
            setToCityId(cityId);
        }
    }

    useEffect(() => {
        GetCountryData()
    }, []);


    function handleSubmit(event) {
        event.preventDefault();
        if (departureDate === null || departureDate === undefined) {
            alert("Please select the departure date")

        }
        if (fromCountryId === null || fromCountryId === undefined) {
            alert("Please select the country of departure")
            return
        }
        if (fromProvinceId === null || fromProvinceId === undefined) {
            alert("Please select the province of departure")
            return
        }
        if (fromCityId === null || fromCityId === undefined) {
            alert("Please select the city of departure")
            return
        }
        let tripData = {
            "departureDate": departureDate,
            "fromCountryId": fromCountryId,
            "fromProvinceId": fromProvinceId,
            "fromCityId": fromCityId,
            "toCountryId": toCountryId,
            "toProvinceId": toProvinceId,
            "toCityId": toCityId,
            "departureTime": departureTime
        }
        console.log(tripData)
    }

    return (<>
        <br/>
        <form id="createTripView" onSubmit={handleSubmit}>
            <div className="container ">

                <div className="row">
                    <div className="col-sm-3"></div>
                    <br/>
                    <div className="col">
                        <h1>{t("create.trip")}</h1>
                        <br/>
                        <div id="fromDestination">
                            <h4>FROM</h4>
                            <div className="row ">
                                <label htmlFor="fromCountrySelector"
                                       className="col-sm-3 col-form-label">{t("country")}</label>
                                <div className="col">
                                    <select name="fromCountrySelector" id="fromCountrySelector" className="form-select"
                                            onChange={(e) => {
                                                GetProvinceData("from", e.target.value);
                                            }}>
                                        <option>{t("select")}</option>
                                        {fromCountryDepartureSelectorValues}
                                    </select>
                                </div>
                            </div>
                            <div className="row ">
                                <label htmlFor="fromProvinceSelector"
                                       className="col-sm-3 col-form-label">{t("provincestate")}</label>
                                <div className="col">
                                    <select name="fromProvinceSelector" id="fromProvinceSelector"
                                            className="form-select"
                                            onChange={(e) => GetCityData("from", e.target.value)}>
                                        <option>{t("select")}</option>
                                        {fromProvinceDepartureSelectorValues}
                                    </select>
                                </div>
                            </div>
                            <div className="row ">
                                <label htmlFor="fromCitySelector"
                                       className="col-sm-3 col-form-label">{t("citySelector")}</label>
                                <div className="col">
                                    <select name="fromCitySelector" id="fromCitySelector" className="form-select"
                                            onChange={(e) => {
                                                storeCityData("from", e.target.value)
                                            }}>
                                        <option>{t("select")}</option>
                                        {fromCityDepartureSelectorValues}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div id="toDestination">
                            <h4>TO</h4>

                            <div className="row">
                                <label htmlFor="toCountrySelector"
                                       className="col-sm-3 col-form-label">{t("country")}</label>
                                <div className="col">
                                    <select name="toCountrySelector" id="toCountrySelector" className="form-select"
                                            onChange={(e) => {
                                                GetProvinceData("to", e.target.value);
                                            }}>
                                        <option>{t("select")}</option>
                                        {toCountryDepartureSelectorVales}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <label htmlFor="toProvinceSelector"
                                       className="col-sm-3 col-form-label">{t("provincestate")}</label>
                                <div className="col">
                                    <select name="toProvinceSelector" id="toProvinceSelector" className="form-select"
                                            onChange={(e) => GetCityData("to", e.target.value)}>
                                        <option>{t("select")}</option>
                                        {toProvinceDepartureSelectorValues}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <label htmlFor="toCitySelector"
                                       className="col-sm-3 col-form-label">{t("citySelector")}</label>
                                <div className="col">
                                    <select name="toCitySelector" id="toCitySelector" className="form-select"
                                            onChange={(e) => {
                                                storeCityData("to", e.target.value)
                                            }}>
                                        <option>{t("select")}</option>
                                        {toCityDepartureSelectorValues}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div>
                            {/*<div className="row">*/}
                            {/*    <label htmlFor="passengers" className="col-sm-3 col-form-label">{t("passengers")}</label>*/}
                            {/*    <div className="col">*/}
                            {/*        <select name="passengers" id="passengers" className="form-select"*/}
                            {/*                onChange={(e) => {*/}
                            {/*                    console.log(e.target.value)*/}
                            {/*                }}>*/}
                            {/*            <option>{t("select")}</option>*/}
                            {/*            <option value={"1"}>1</option>*/}
                            {/*            <option value={"2"}>2</option>*/}
                            {/*            <option value={"3"}>3</option>*/}
                            {/*            <option value={"4"}>4</option>*/}
                            {/*            <option value={"5"}>5</option>*/}
                            {/*            <option value={"6"}>6</option>*/}
                            {/*            <option value={"7"}>7</option>*/}
                            {/*            <option value={"8"}>8</option>*/}
                            {/*        </select>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<br/>*/}

                            {/*<div className="row">*/}
                            {/*    <label htmlFor="TripDescription" className="form-label">{t("description")}</label>*/}
                            {/*    <textarea className="form-control" id="TripDescription" rows="3"></textarea>*/}
                            {/*</div>*/}
                        </div>
                        <br/>
                        <div id="departureDateTime">
                            <div className="row">
                                <div className="col-sm-2">{t("departureDate")}</div>
                                <div className="col">
                                    <DatePicker onChange={value => {
                                        setDepartureDate(value)
                                    }} value={departureDate}/>
                                </div>
                            </div>
                        </div>
                        <div id="departureTime">
                            <div className="row">
                                <div className="col-sm-2">{t("departureTime")}</div>
                                <div className="col">
                                    <TimePicker disableClock={true}
                                                onChange={setDepartureTime}
                                                value={departureTime}
                                    />
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className="row submit">
                            <div className="col"></div>
                            <div className="col">
                                <input className="btn btn-primary" type='submit' value='Submit'/>
                            </div>
                            <div className="col"></div>
                        </div>
                    </div>
                    <br/>
                    <div className="col-sm-3"></div>
                </div>
                <br/>


            </div>


        </form>
    </>)
}

//https://stackoverflow.com/questions/1085801/get-selected-value-in-dropdown-list-using-javascript