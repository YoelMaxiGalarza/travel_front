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

    const [t, i18n] = useTranslation("common");
    const http = HttpResourceFactory.create();
    const router = useRouter();
    const params = useSearchParams();
    const [fromCountrySelectorValues, setFromCountrySelectorValues] = useState([])
    const [fromProvinceSelectorValues, setFromProvinceSelectorValues] = useState([])
    const [fromCitySelectorValues, setFromCitySelectorValues] = useState([])
    const [toCountrySelectorValues, setToCountrySelectorValues] = useState([])
    const [toProvinceSelectorValues, setToProvinceSelectorValues] = useState([])
    const [toCitySelectorvalues, setToCitySelectorValues] = useState([])

    const [fromCountryId, setFromCountryId] = useState(1)
    const [fromProvinceId, setFromProvinceId] = useState(1)
    const [fromCityId, setFromCityId] = useState(1)
    const [toCountryId, setToCountryId] = useState(1)
    const [toProvinceId, setToProvinceId] = useState(1)
    const [toCityId, setToCityId] = useState(1)
    const [passengers, setPassengers] = useState(1)
    const [departureDate, setDepartureDate] = useState(new Date());
    const [departureTime, setDepartureTime] = useState('12:00');
    const [description, setDescription] = useState("");

    let locationId = params.get("locationId");


    function handleSubmit(event) {
        if (!fromCountryId || !fromProvinceId || !fromCityId || !toCountryId || !toProvinceId || !toCityId || !passengers || !departureDate || !departureTime || !description) {
            alert("Please fill all the fields");
            event.preventDefault();
            return;
        }
        event.preventDefault();
        let tripData = {
            "fromCountryId": fromCountryId,
            "fromProvinceId": fromProvinceId,
            "fromCityId": fromCityId,
            "toCountryId": toCountryId,
            "toProvinceId": toProvinceId,
            "toCityId": toCityId,
            "departureDate": departureDate,
            "departureTime": departureTime,
            "passengers": passengers,
            "description": description,
        }

        http.post("/location/create", JSON.stringify(tripData), localStorage.getItem("Authorization")).then((response) => {
            setToCountrySelectorValues([])
            setToProvinceSelectorValues([])
            setToCitySelectorvalues([]);
            setFromCountrySelectorValues([])
            setFromProvinceSelectorValues([])
            setFromCitySelectorValues([])
            router.push("/dashboard/trips");
        });
    }


    const GetCountryData = (fromto) => {

        http.get("/location", localStorage.getItem("Authorization")).then((response) => {

            response.json().then((data) => {

                let countries = data.map((country) => {
                    if (fromto == "from") {
                        if (country.id == fromCountryId) {
                            return <option key={country.id} value={country.id}
                                           selected={true}>{country.name}</option>
                        } else {
                            return <option key={country.id}
                                           value={country.id}>{country.name}</option>
                        }
                    } else if (fromto == "to") {
                        if (country.id == toCountryId) {
                            return <option key={country.id} value={country.id}
                                           selected={true}>{country.name}</option>
                        } else {
                            return <option key={country.id}
                                           value={country.id}>{country.name}</option>
                        }
                    }
                });
                if (fromto == "from") {
                    setFromCountrySelectorValues(countries);
                } else if (fromto == "to") {
                    setToCountrySelectorValues(countries);

                }
            });
        });
    }

    function GetProvinceData(fromto) {
        let countryId = 1;
        if(fromto == "from"){
            countryId = fromCountryId;
        }else if(fromto == "to"){
            countryId = toCountryId;
        }
        http.get("/location?countryId=" + countryId, localStorage.getItem("Authorization")).then((response) => {
            response.json().then((data) => {
                let provinces = data.map((province) => {
                    if (fromto = "from") {
                        if (province.id == fromProvinceId) {
                            return <option key={province.id} value={province.id}
                                           selected={true}>{province.name}</option>
                        } else {
                            return <option key={province.id}
                                           value={province.id}>{province.name}</option>
                        }
                    } else if (fromto == "to") {
                        if (province.id == toProvinceId) {
                            return <option key={province.id} value={province.id}
                                           selected={true}>{province.name}</option>
                        } else {
                            return <option key={province.id}
                                           value={province.id}>{province.name}</option>
                        }
                    }
                });
                if (fromto = "from") {
                    setFromProvinceSelectorValues(provinces);
                } else if (fromto == "to") {
                    setToProvinceSelectorValues(provinces);
                }
            });
        });

    }

    async function GetCityData(fromto) {
        if (fromto === "from") {
            http.get("/location?provinceId=" + fromProvinceId, localStorage.getItem("Authorization"))
                .then((response) => {
                    response.json().then((data) => {
                        let cities = data.map((city) => {
                            if(city.id == fromCityId){
                                return <option key={city.id} value={city.id} selected={true}>{city.name}</option>
                            }else{
                                return <option key={city.id} value={city.id}>{city.name}</option>
                            }
                        });
                        setFromCitySelectorValues(cities);
                    });
                });
        } else if("to"){
            http.get("/location?provinceId=" + fromProvinceId, localStorage.getItem("Authorization"))
                .then((response) => {
                    response.json().then((data) => {
                        let cities = data.map((city) => {
                            if(city.id == fromCityId){
                                return <option key={city.id} value={city.id} selected={true}>{city.name}</option>
                            }else{
                                return <option key={city.id} value={city.id}>{city.name}</option>
                            }
                        });
                        setToCitySelectorValues(cities);
                    });
                });
        }
    }

    useEffect(() => {

        if (locationId != null || locationId != undefined) {

            http.get("/location/get?locationId=" + locationId, localStorage.getItem('Authorization')).then(async response => {
                await response.json().then(value => {
                    setFromCountryId(value.fromCountryId.id)
                    setToCountryId(value.toCountryId.id)
                    setFromProvinceId(value.fromProvinceId.id)
                    setToProvinceId(value.toProvinceId.id)
                    setFromCityId(value.fromCityId.id)
                    setToCityId(value.toCityId.id)
                    setPassengers(value.passengers)
                    setDescription(value.description)

                })
                await GetCountryData("from")
                await GetProvinceData("from")
                await GetCityData("from")
                await GetCountryData("to")
                await GetProvinceData("to")
                await GetCityData("to")
            }).catch(error => {
                console.log(error);
            });
        } else {
            // router.push("/dashboard/trip");
        }

    }, []);


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
                                            value={fromCountryId}
                                            onChange={(e) => {

                                            }}>
                                        <option>{t("select")}</option>
                                        {fromCountrySelectorValues}
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
                                            value={fromProvinceId}
                                            onChange={(e) => {

                                            }}>
                                        <option>{t("select")}</option>
                                        {fromProvinceSelectorValues}
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
                                            value={fromCityId}
                                            onChange={(e) => {

                                            }}>
                                        <option>{t("select")}</option>
                                        {fromCitySelectorValues}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <br/>
                        {/*<div id="toDestination">*/}
                        {/*    <h4>To</h4>*/}
                        {/*    <div className="row ">*/}
                        {/*        <label htmlFor="fromCountrySelector"*/}
                        {/*               className="col-sm-3 col-form-label">{t("country")}</label>*/}
                        {/*        <div className="col">*/}
                        {/*            <select name="fromCountrySelector" id="fromCountrySelector"*/}
                        {/*                    className="form-select" required={true}*/}
                        {/*                    value={toCountryId}*/}
                        {/*                    onChange={(e) => {*/}
                        
                        {/*                    }}>*/}
                        {/*                <option>{t("select")}</option>*/}
                        {/*                {toCountrySelectorValues}*/}
                        {/*            </select>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div className="row ">*/}
                        {/*        <label htmlFor="fromProvinceSelector"*/}
                        {/*               className="col-sm-3 col-form-label">{t("provincestate")}</label>*/}
                        {/*        <div className="col">*/}
                        {/*            <select name="fromProvinceSelector"*/}
                        {/*                    id="fromProvinceSelector"*/}
                        {/*                    className="form-select"*/}
                        {/*                    required={true}*/}
                        {/*                    value={toProvinceId}*/}
                        {/*                    onChange={(e) => {*/}
                        
                        {/*                    }}>*/}
                        {/*                <option>{t("select")}</option>*/}
                        {/*                {toProvinceSelectorValues}*/}
                        {/*            </select>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div className="row ">*/}
                        {/*        <label htmlFor="fromCitySelector"*/}
                        {/*               className="col-sm-3 col-form-label">{t("citySelector")}</label>*/}
                        {/*        <div className="col">*/}
                        {/*            <select name="fromCitySelector" id="fromCitySelector"*/}
                        {/*                    className="form-select"*/}
                        {/*                    required={true}*/}
                        {/*                    value={toCityId}*/}
                        {/*                    onChange={(e) => {*/}
                        
                        {/*                    }}>*/}
                        {/*                <option>{t("select")}</option>*/}
                        {/*                {toCitySelectorvalues}*/}
                        {/*            </select>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <br/>
                        <div>
                            <div className="row">
                                <label htmlFor="passengers"
                                       className="col-sm-3 col-form-label">{t("passengers")}</label>
                                <div className="col">
                                    <select name="passengers" id="passengers"
                                            className="form-select"
                                            value={passengers}
                                            onChange={(e) => {
                                                setPassengers(e.target.value)
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
                                          value={description}
                                          onChange={event => {
                                              setDescription(event.target.value);
                                          }}></textarea>
                            </div>
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
