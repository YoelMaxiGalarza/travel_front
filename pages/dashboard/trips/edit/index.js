import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";


//https://www.npmjs.com/package/react-time-picker?activeTab=readme
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import {TimePicker} from "react-time-picker";
//https://www.npmjs.com/package/react-date-picker
import {DatePicker} from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import {useRouter, useSearchParams} from "next/navigation";
import {HttpResourceFactory} from "../../../../components/core/factory/HttpResourceFactory";
import UserNavbar from "../../../../components/navbar/UserNavbar";


export default function EditTrip() {
    const params = useSearchParams();
    let locationId = params.get("locationId");

    const [t, i18n] = useTranslation("common");
    const http = HttpResourceFactory.create();
    const router = useRouter();
    const [locationData, setLocationData] = useState({
        fromCountryId: 1,
        fromProvinceId: 1,
        fromCityId: 1,
        toCountryId: 1,
        toProvinceId: 1,
        toCityId: 1,
        passengers: 1,
        departureDate: new Date(),
        departureTime: "12:00",
        description: "",
    })
    const [fromCountryDepartureSelectorValues, setFromCountryDepartureSelectorValues] = useState([])
    const [fromProvinceDepartureSelectorValues, setFromProvinceDepartureSelectorValues] = useState([])
    const [fromCityDepartureSelectorValues, setFromCityDepartureSelectorValues] = useState([])
    const [toCountryDepartureSelectorVales, setToCountryDepartureSelectorVales] = useState([])
    const [toCityDepartureSelectorValues, setToCityDepartureSelectorValues] = useState([])
    const [toProvinceDepartureSelectorValues, setToProvinceDepartureSelectorValues] = useState([])
    const GetCountryData = async (fromto, countryId) => {

        http.get("/country", localStorage.getItem("Authorization")).then((response) => {
            response.json().then((data) => {

                let countries = data.map((country) => {
                    if (country.id == countryId) {
                        return <option key={country.id} value={country.id}
                                       selected={true}>{country.name}</option>
                    } else {
                        return <option key={country.id}
                                       value={country.id}>{country.name}</option>
                    }

                });
                if (fromto === "from") {
                    setFromCountryDepartureSelectorValues(countries);
                } else {
                    setToCountryDepartureSelectorVales(countries);

                }
            });
        });
        setLocationData({...locationData, fromCountryId: countryId})

    }

    async function GetProvinceData(fromto, countryId, provinceId) {
        http.get("/province?countryId=" + countryId, localStorage.getItem("Authorization")).then((response) => {
            response.json().then((data) => {
                let countries = data.map((province) => {
                    if (province.id == provinceId) {
                        return <option key={province.id} value={province.id}
                                       selected={true}>{province.name}</option>
                    } else {
                        return <option key={province.id}
                                       value={province.id}>{province.name}</option>
                    }
                });
                if (fromto == "from") {
                    setFromProvinceDepartureSelectorValues(countries);
                } else {
                    setToProvinceDepartureSelectorValues(countries);
                }
            });
        });
        setLocationData({...locationData, fromCountryId: countryId})
    }

    async function GetCityData(fromto, provinceId) {
        http.get("/city?provinceId=" + provinceId, localStorage.getItem("Authorization"))
            .then((response) => {
                response.json().then((data) => {
                    let countries = data.map((country) => {
                        return <option key={country.id}
                                       value={country.id}>{country.name}</option>
                    });
                    if (fromto === "from") {
                        setFromCityDepartureSelectorValues(countries);
                    } else {
                        setToCityDepartureSelectorValues(countries);
                    }
                });
            });
    }

    async function storeCityData(fromto, cityId) {
        if (fromto === "from") {
            setLocationData({...locationData, fromCityId: cityId})
        } else {
            setLocationData({...locationData, toCityId: cityId})
        }
    }

    useEffect(() => {

        if (locationId != null || locationId != undefined) {
            http.get("/location/get?locationId=" + locationId, localStorage.getItem('Authorization')).then(async response => {
                response.json().then(async value => {
                    console.log(value)
                    setLocationData(value)
                })
            }).then(value => {
                GetCountryData("from", locationData.fromCountryId);
                GetCountryData("to", locationData.toCountryId);
            }).then(value => {
                GetProvinceData("from", locationData.fromCountryId,locationData.fromProvinceId)
                GetProvinceData("to", locationData.toCountryId,locationData.toProvinceId)
            }).then(value => {
                GetCityData("from", locationData.fromProvinceId)
                GetCityData("to", locationData.toProvinceId)
            }).catch(error => {
                console.log(error);
            });
        } else {
            // router.push("/dashboard/trip");
        }

    }, []);


    function handleSubmit(event) {
        if (!fromCountryId || !fromProvinceId || !fromCityId || !toCountryId || !toProvinceId || !toCityId || !passengers || !departureDate || !departureTime || !description) {
            alert("Please fill all the fields");
            event.preventDefault();
            return;
        }
        event.preventDefault();
        let tripData = {
            "fromCountryId": locationData.fromCountryId,
            "fromProvinceId": locationData.fromProvinceId,
            "fromCityId": locationData.fromCityId,
            "toCountryId": locationData.toCountryId,
            "toProvinceId": locationData.toProvinceId,
            "toCityId": locationData.toCityId,
            "departureDate": locationData.departureDate,
            "departureTime": locationData.departureTime,
            "passengers": locationData.passengers,
            "description": locationData.description,
        }

        http.post("/location/create", JSON.stringify(tripData), localStorage.getItem("Authorization")).then((response) => {
            router.push("/dashboard/trips");
        });
    }


    return (<>
        <UserNavbar/>
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
                                    <select name="fromCountrySelector" id="fromCountrySelector"
                                            className="form-select" required={true}
                                            value={locationData.fromCountryId}
                                            onChange={(e) => {
                                                setLocationData({
                                                    ...locationData,
                                                    fromCountryId: e.target.value
                                                })
                                                setFromProvinceDepartureSelectorValues([])
                                                setFromCityDepartureSelectorValues([])
                                                GetProvinceData("from",locationData.fromCountryId, locationData.fromProvinceId);
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
                                    <select name="fromProvinceSelector"
                                            id="fromProvinceSelector"
                                            className="form-select"
                                            required={true}
                                            value={locationData.fromProvinceId}
                                            onChange={(e) => {
                                                setLocationData({
                                                    ...locationData,
                                                    fromProvinceId: e.target.value
                                                })
                                                setFromCityDepartureSelectorValues([]);
                                                GetCityData("from", e.target.value);
                                            }}>
                                        <option>{t("select")}</option>
                                        {fromProvinceDepartureSelectorValues}
                                    </select>
                                </div>
                            </div>
                            <div className="row ">
                                <label htmlFor="fromCitySelector"
                                       className="col-sm-3 col-form-label">{t("citySelector")}</label>
                                <div className="col">
                                    <select name="fromCitySelector" id="fromCitySelector"
                                            className="form-select"
                                            required={true}
                                            value={locationData.fromCityId}
                                            onChange={(e) => {
                                                setLocationData({
                                                    ...locationData,
                                                    fromCityId: e.target.value
                                                })
                                                storeCityData("from", e.target.value);
                                            }}>
                                        <option>{t("select")}</option>
                                        {fromCityDepartureSelectorValues}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div id="toDestination">
                            <h4>To</h4>
                            <div className="row ">
                                <label htmlFor="fromCountrySelector"
                                       className="col-sm-3 col-form-label">{t("country")}</label>
                                <div className="col">
                                    <select name="fromCountrySelector" id="fromCountrySelector"
                                            className="form-select" required={true}
                                            value={locationData.toCountryId}
                                            onChange={(e) => {

                                            }}>
                                        <option>{t("select")}</option>
                                        {toCountryDepartureSelectorVales}
                                    </select>
                                </div>
                            </div>
                            <div className="row ">
                                <label htmlFor="fromProvinceSelector"
                                       className="col-sm-3 col-form-label">{t("provincestate")}</label>
                                <div className="col">
                                    <select name="fromProvinceSelector"
                                            id="fromProvinceSelector"
                                            className="form-select"
                                            required={true}
                                            value={locationData.toProvinceId}
                                            onChange={(e) => {

                                            }}>
                                        <option>{t("select")}</option>
                                        {toProvinceDepartureSelectorValues}
                                    </select>
                                </div>
                            </div>
                            <div className="row ">
                                <label htmlFor="fromCitySelector"
                                       className="col-sm-3 col-form-label">{t("citySelector")}</label>
                                <div className="col">
                                    <select name="fromCitySelector" id="fromCitySelector"
                                            className="form-select"
                                            required={true}
                                            value={locationData.toCityId}
                                            onChange={(e) => {

                                            }}>
                                        <option>{t("select")}</option>
                                        {toCityDepartureSelectorValues}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div>
                            <div className="row">
                                <label htmlFor="passengers"
                                       className="col-sm-3 col-form-label">{t("passengers")}</label>
                                <div className="col">
                                    <select name="passengers" id="passengers"
                                            className="form-select"
                                            value={locationData.passengers}
                                            onChange={(e) => {
                                            }}>
                                        <option>{t("select")}</option>
                                        <option value={"1"}>1</option>
                                        <option value={"2"}>2</option>
                                        <option value={"3"}>3</option>
                                        <option value={"4"}>4</option>
                                        <option value={"5"}>5</option>
                                        <option value={"6"}>6</option>
                                        <option value={"7"}>7</option>
                                        <option value={"8"}>8</option>
                                        <option value={"9"}>9</option>
                                        <option value={"10"}>10</option>
                                    </select>
                                </div>
                            </div>
                            <br/>

                            <div className="row">
                                <label htmlFor="TripDescription"
                                       className="form-label">{t("description")}</label>
                                <textarea className="form-control" id="TripDescription"
                                          rows="4"
                                          value={locationData.description}
                                          onChange={event => {

                                          }}></textarea>
                            </div>
                        </div>
                        <br/>
                        <div id="departureDateTime">
                            <div className="row">
                                <div className="col-sm-2">{t("departureDate")}</div>
                                <div className="col">
                                    <DatePicker onChange={value => {
                                    }} value={locationData.departureDate}/>
                                </div>
                            </div>
                        </div>
                        <div id="departureTime">
                            <div className="row">
                                <div className="col-sm-2">{t("departureTime")}</div>
                                <div className="col">
                                    <TimePicker disableClock={true}
                                                onChange={value => {
                                                }}
                                                value={locationData.departureTime}
                                    />
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className="row submit">
                            <div className="col"></div>
                            <div className="col">
                                <input className="btn btn-primary" type='submit'
                                       value='Submit'/>
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
