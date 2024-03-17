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
    let tripId = params.get("locationId");

    const [t, i18n] = useTranslation("common");
    const http = HttpResourceFactory.create();
    const router = useRouter();
    const [fromCountryDepartureSelectorValues, setFromCountryDepartureSelectorValues] = useState([])
    const [fromProvinceDepartureSelectorValues, setFromProvinceDepartureSelectorValues] = useState([])
    const [fromCityDepartureSelectorValues, setFromCityDepartureSelectorValues] = useState([])
    const [toCountryDepartureSelectorValues, setToCountryDepartureSelectorValues] = useState([])
    const [toCityDepartureSelectorValues, setToCityDepartureSelectorValues] = useState([])
    const [toProvinceDepartureSelectorValues, setToProvinceDepartureSelectorValues] = useState([])

    const [fromCountryId, setFromCountryId] = useState(null)
    const [fromProvinceId, setFromProvinceId] = useState(null)
    const [fromCityId, setFromCityId] = useState(null)
    const [toCountryId, setToCountryId] = useState(null)
    const [toProvinceId, setToProvinceId] = useState(null)
    const [toCityId, setToCityId] = useState(null)
    const [amountPassengers, setPassengers] = useState(null)
    const [departureDate, setDepartureDate] = useState(new Date());
    const [departureTime, setDepartureTime] = useState('12:00');
    const [description, setDescription] = useState("");
    const [isOnlyFriends, setIsOnlyFriends] = useState(false);
    const [locationData, setLocationData] = useState({
        fromCountryId: 1,
        fromProvinceId: 1,
        fromCityId: 1,
        toCountryId: 1,
        toProvinceId: 1,
        toCityId: 1,
        amountPassengers: 1,
        departureDate: new Date(),
        departureTime: "12:00",
        description: "",
    })

    function handleSubmit(event) {

        if(amountPassengers == null || amountPassengers == 0){
            alert("Please select the amount of passengers")
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
            "amountPassengers": amountPassengers,
            "description": description,
            "isOnlyFriends": isOnlyFriends
        }

        http.post("/trip/edit?tripId=" + tripId, JSON.stringify(tripData), localStorage.getItem("Authorization")).then((response) => {
            // setToCountryDepartureSelectorValues([])
            // setToProvinceDepartureSelectorValues([])
            // setToCityDepartureSelectorValues([]);
            // setFromCountryDepartureSelectorValues([])
            // setFromProvinceDepartureSelectorValues([])
            // setFromCityDepartureSelectorValues([])
            // router.push("/dashboard/trips");
        });
    }


    async function getProvincesByCountryId(value, fromto) {
        const request = await http.get("/province/country?countryId=" + value, localStorage.getItem("Authorization"));
        const data = await request.json();
        if (fromto === "from") {
            setFromProvinceDepartureSelectorValues(data.map((province) => {
                return <option key={province.id} value={province.id}>{province.name}</option>
            }))
            setFromCountryId(value)
        } else {
            setToProvinceDepartureSelectorValues(data.map((province) => {
                return <option key={province.id} value={province.id}>{province.name}</option>
            }))
            setToCountryId(value)
        }
    }

    async function getCitiesByProvinceId(value, from) {
        const request = await http.get("/city?provinceId=" + value, localStorage.getItem("Authorization"));
        const response = await request.json();
        if (from == "from") {
            setFromCityDepartureSelectorValues(response.map((city) => {
                return <option key={city.id} value={city.id}>{city.name}</option>
            }))
            setFromProvinceId(value)
        } else {
            setToCityDepartureSelectorValues(response.map((city) => {
                return <option key={city.id} value={city.id}>{city.name}</option>
            }));
            setToProvinceId(value)
        }
    }

    async function GetTripData() {
        const request = await http.get("/trip/get?locationId=" + tripId, localStorage.getItem("Authorization"));
        const response = await request.json();
        setFromCountryId(response.fromCountryId)
        setFromProvinceId(response.fromProvinceId)
        setFromCityId(response.fromCityId)
        setToCountryId(response.toCountryId)
        setToProvinceId(response.toProvinceId)
        setToCityId(response.toCityId)
        setPassengers(response.amountPassengers)
        setDepartureDate(response.departureDate)
        setDepartureTime(response.departureTime)
        setDescription(response.description)
        setIsOnlyFriends(response.isOnlyFriends)

        const requestCountries = await http.get("/country/getAll", localStorage.getItem("Authorization"));
        const countries = await requestCountries.json();
        setFromCountryDepartureSelectorValues(countries.map((country) => {
            if (country.id == response.fromCountryId)
                return <option key={country.id} value={country.id}
                               selected={true}>{country.name}</option>
            else {
                return <option key={country.id} value={country.id}>{country.name}</option>
            }
        }))
        setToCountryDepartureSelectorValues(countries.map((country) => {
            if (country.id == response.toCountryId)
                return <option key={country.id} value={country.id}
                               selected={true}>{country.name}</option>
            else {
                return <option key={country.id} value={country.id}>{country.name}</option>
            }
        }))
        const requestProvinces = await http.get("/province/getAll", localStorage.getItem("Authorization"));
        const provinces = await requestProvinces.json();

        setFromProvinceDepartureSelectorValues(provinces.map((province) => {
            if (province.id == response.fromProvinceId)
                return <option key={province.id} value={province.id}
                               selected={true}>{province.name}</option>
            else {
                return <option key={province.id} value={province.id}>{province.name}</option>
            }

        }))
        setToProvinceDepartureSelectorValues(provinces.map((province) => {
            if (province.id == response.toProvinceId)
                return <option key={province.id} value={province.id}
                               selected={true}>{province.name}</option>
            else {
                return <option key={province.id} value={province.id}>{province.name}</option>
            }
        }))
        const requestCities = await http.get("/city/getAll", localStorage.getItem("Authorization"));
        const cities = await requestCities.json();
        setFromCityDepartureSelectorValues(cities.map((city) => {
            if (city.id == response.fromCityId)
                return <option key={city.id} value={city.id}
                               selected={true}>{city.name}</option>
            else {
                return <option key={city.id} value={city.id}>{city.name}</option>
            }
        }))
        setToCityDepartureSelectorValues(cities.map((city) => {
            if (city.id == response.toCityId)
                return <option key={city.id} value={city.id}
                               selected={true}>{city.name}</option>
            else {
                return <option key={city.id} value={city.id}>{city.name}</option>
            }
        }))

    }

    useEffect(() => {
        GetTripData();
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
                        <div className="row">
                            <label htmlFor="fromCountry"
                                   className="col-sm-3 col-form-label">{t("fromCountry")}</label>
                            <div className="col">
                                <select name="fromCountry" id="fromCountry"
                                        className="form-select"
                                        required={true}
                                        onChange={(e) => {
                                            getProvincesByCountryId(e.target.value, "from")
                                        }}>
                                    <option>{t("select")}</option>
                                    {fromCountryDepartureSelectorValues}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <label htmlFor="fromProvince"
                                   className="col-sm-3 col-form-label">{t("fromProvince")}</label>
                            <div className="col">
                                <select name="fromProvince" id="fromProvince"
                                        className="form-select"
                                        onChange={(e) => {
                                            getCitiesByProvinceId(e.target.value, "from")
                                        }}>
                                    <option>{t("select")}</option>
                                    {fromProvinceDepartureSelectorValues}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <label htmlFor="fromCity"
                                   className="col-sm-3 col-form-label">{t("fromCity")}</label>
                            <div className="col">
                                <select name="fromCity" id="fromCity"
                                        className="form-select"
                                        required={true}
                                        onChange={(e) => {
                                            setFromCityId(e.target.value)
                                        }}>
                                    <option>{t("select")}</option>
                                    {fromCityDepartureSelectorValues}
                                </select>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <label htmlFor="toCountry"
                                   className="col-sm-3 col-form-label">{t("toCountry")}</label>
                            <div className="col">
                                <select name="toCountry" id="toCountry"
                                        className="form-select"
                                        required={true}
                                        onChange={(e) => {
                                            getProvincesByCountryId(e.target.value, "to")
                                        }}>
                                    <option>{t("select")}</option>
                                    {toCountryDepartureSelectorValues}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <label htmlFor="toProvince"
                                   className="col-sm-3 col-form-label">{t("toProvince")}</label>
                            <div className="col">
                                <select name="toProvince" id="toProvince"
                                        className="form-select"
                                        onChange={(e) => {
                                            getCitiesByProvinceId(e.target.value, "to")
                                        }}>
                                    <option>{t("select")}</option>
                                    {toProvinceDepartureSelectorValues}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <label htmlFor="toCity"
                                   className="col-sm-3 col-form-label">{t("toCity")}</label>
                            <div className="col">
                                <select name="toCity" id="toCity"
                                        className="form-select"
                                        onChange={(e) => {
                                            setToCityId(e.target.value)
                                        }}>
                                    <option>{t("select")}</option>
                                    {toCityDepartureSelectorValues}
                                </select>
                            </div>
                        </div>
                        <br/>
                        <div>
                            <div className="row">
                                <label htmlFor="amountPassengers"
                                       className="col-sm-3 col-form-label">{t("amountPassengers")}</label>
                                <div className="col">
                                    <select name="amountPassengers" id="amountPassengers"
                                            className="form-select"
                                            required={true}
                                            value={amountPassengers}
                                            onChange={(e) => {
                                                setPassengers(e.target.value)
                                            }}>
                                        <option>{t("select")}</option>
                                        <option key={1} value={1}>1</option>
                                        <option key={2} value={2}>2</option>
                                        <option key={3} value={3}>3</option>
                                        <option key={4} value={4}>4</option>
                                        <option key={5} value={5}>5</option>
                                        <option key={6} value={6}>6</option>
                                        <option key={7} value={7}>7</option>
                                        <option key={8} value={8}>8</option>
                                        <option key={9} value={9}>9</option>
                                        <option key={10} value={10}>10</option>
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
                                    <DatePicker
                                        defaultValue={departureDate}
                                        onChange={value => {
                                            setLocationData({
                                                ...locationData, departureDate: value
                                            })
                                        }} value={locationData.departureDate}/>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div id="departureTime">
                            <div className="row">
                                <div className="col-sm-2">{t("departureTime")}</div>
                                <div className="col">
                                    <TimePicker
                                        defaultValue={departureTime}
                                        disableClock={true}
                                        onChange={value => {
                                            setLocationData({
                                                ...locationData, departureTime: value
                                            })
                                        }}
                                        value={locationData.departureTime}
                                    />
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className="mb-3" hidden={true}>
                            <div className="row">
                                <h6 className="form-check-label col-sm-3"
                                    htmlFor="onlyFriends">
                                    {t("onlyFriends")}
                                </h6>
                                <div className="form-check col-sm-3">
                                    <input className="form-check-input" type="checkbox"
                                           value={false}
                                           onChange={event => {
                                               console.log(event.target.checked)
                                               setIsOnlyFriends(event.target.checked)
                                           }}
                                           id="onlyFriends"/>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className="row-sm-2 submit">
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
