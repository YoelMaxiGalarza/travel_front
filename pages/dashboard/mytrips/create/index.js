import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {HttpResourceFactory} from "../../../../components/core/factory/HttpResourceFactory";
import {useRouter} from "next/navigation";
import {DatePicker} from "react-date-picker";
import {TimePicker} from "react-time-picker";
import UserNavbar from "../../../../components/navbar/UserNavbar";

export default function CreateTrip(){

    const [t, i18n] = useTranslation("common");
    const http = HttpResourceFactory.create();
    const router = useRouter();
    const [fromCountryDepartureSelectorValues, setFromCountryDepartureSelectorValues] = useState([])
    const [fromProvinceDepartureSelectorValues, setFromProvinceDepartureSelectorValues] = useState([])
    const [fromCityDepartureSelectorValues, setFromCityDepartureSelectorValues] = useState([])
    const [toCountryDepartureSelectorVales, setToCountryDepartureSelectorVales] = useState([])
    const [toCityDepartureSelectorValues, setToCityDepartureSelectorValues] = useState([])
    const [toProvinceDepartureSelectorValues, setToProvinceDepartureSelectorValues] = useState([])

    const [fromCountryId, setFromCountryId] = useState(null)
    const [fromProvinceId, setFromProvinceId] = useState(null)
    const [fromCityId, setFromCityId] = useState(null)
    const [toCountryId, setToCountryId] = useState(null)
    const [toProvinceId, setToProvinceId] = useState(null)
    const [toCityId, setToCityId] = useState(null)
    const [passengers, setPassengers] = useState(null)
    const [departureDate, setDepartureDate] = useState(new Date());
    const [departureTime, setDepartureTime] = useState('12:00');
    const [description, setDescription] = useState("");

    const[locationData , setLocationData] = useState({
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
    function handleSubmit(event) {
        if(!fromCountryId || !fromProvinceId || !fromCityId || !toCountryId || !toProvinceId || !toCityId || !passengers || !departureDate || !departureTime || !description){
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
            setToCountryDepartureSelectorVales([])
            setToProvinceDepartureSelectorValues([])
            setToCityDepartureSelectorValues([]);
            setFromCountryDepartureSelectorValues([])
            setFromProvinceDepartureSelectorValues([])
            setFromCityDepartureSelectorValues([])
            router.push("/dashboard/trips");
        });
    }


    const GetCountryData = () => {
        try {
            http.get("/country", localStorage.getItem("Authorization")).then((response) => {
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
            http.get("/province?countryId=" + countryId, localStorage.getItem("Authorization")).then((response) => {
                response.json().then((data) => {
                    let countries = data.map((country) => {
                        return <option key={country.id} value={country.id}>{country.name}</option>
                    });
                    setFromProvinceDepartureSelectorValues(countries);
                });
            });
            setFromCountryId(countryId);
        } else {
            http.get("/province?countryId=" + countryId, localStorage.getItem("Authorization")).then((response) => {
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
            http.get("/city?provinceId=" + provinceId, localStorage.getItem("Authorization"))
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
            http.get("/city?provinceId=" + provinceId, localStorage.getItem("Authorization"))
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
                                            onChange={(e) => {
                                                setFromProvinceDepartureSelectorValues([])
                                                setFromCityDepartureSelectorValues([]);
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
                                                setToProvinceDepartureSelectorValues([])
                                                setToCityDepartureSelectorValues([]);
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
                                    <select name="toProvinceSelector" id="toProvinceSelector"
                                            className="form-select"
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
                            <div className="row">
                                <label htmlFor="passengers"
                                       className="col-sm-3 col-form-label">{t("passengers")}</label>
                                <div className="col">
                                    <select name="passengers" id="passengers" className="form-select"
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
                                <label htmlFor="TripDescription" className="form-label">{t("description")}</label>
                                <textarea className="form-control" id="TripDescription" rows="4"
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