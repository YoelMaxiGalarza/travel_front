import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import Image from "next/image";

function Profile() {
    const [t, i18n] = useTranslation("common");

    let [countrySelectorValues, setCountrySelectorValues] = useState([])
    let [citySelectorValues, setCitySelectorValues] = useState([])
    let [provinceSelectorValues, setProvinceSelectorValues] = useState([])

    let [countryId, setCountryId] = useState(null)

    let user = {
        name: "Martin",
        surname: "Perez",
        email: "",
        isDriver: false,
        country: "",
        province: "",

    }
    async function GetCountrySelectorValues() {

        const request = await fetch("http://localhost:8080/app/country/", {
            method: "GET",

            headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }, mode: "cors"

        })
        if (request.ok) {
            let countryOptionValues = [];
            const responseData = await request.json();
            for (let i = 0; i < responseData.length; i++) {
                countryOptionValues.push(<>
                    <option value={responseData[i].id}>{responseData[i].nice_name}</option>
                </>)
            }
            setCountrySelectorValues(countryOptionValues)
        } else {
            console.error('Error al enviar los datos:', response.statusText);
        }

    }

    async function GetProvinceSelectorValues() {

        const request = await fetch("http://localhost:8080/app/country/?countryId=", {
            method: "GET",

            headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }, mode: "cors"

        })
        if (request.ok) {
            let countryOptionValues = [];
            const responseData = await request.json();
            for (let i = 0; i < responseData.length; i++) {
                countryOptionValues.push(<>
                    <option value={responseData[i].id}>{responseData[i].nice_name}</option>
                </>)
            }
            setCountrySelectorValues(countryOptionValues)
        } else {
            console.error('Error al enviar los datos:', response.statusText);
        }

    }


    useEffect(() => {
        // TODO redireccionar si no esta logueado
        // console.log(isLogged)
        // if(isLogged === false){
        //     router.push("/")
        // }
        GetCountrySelectorValues();
    }, []);


    return (<>
        <hr/>
        <div className="container ">
            <div className="row">
                <div className="col-sm-2"></div>
                <div className="col">
                    <div className="card">
                        <Image src="/img/user.png" className="profile-img " alt="userprofilepicture"/>
                        <form className="">
                            <div className="card-body">
                                <div className="mb-3">
                                    <h6 htmlFor="usernameInput" className="form-label">{t("usernameInput")}</h6>
                                    <input type="text" className="form-control" id="username"
                                           placeholder={user.name}/>
                                </div>
                                <div className="mb-3">
                                    <h6 htmlFor="nameInput" className="form-label">{t("nameInput")}</h6>
                                    <input type="text" className="form-control" id="exampleFormControlInput1"
                                           placeholder={user.name}/>
                                </div>
                                <div className="mb-3">
                                    <h6 htmlFor="surnameInput" className="form-label">{t("surnameInput")}</h6>
                                    <input type="text" className="form-control" id="exampleFormControlInput1"
                                           placeholder={user.name}/>
                                </div>
                                <div className="mb-3">
                                    <h6 htmlFor="emailInput" className="form-label">{t("emailInput")}</h6>
                                    <input type="email" className="form-control" id="exampleFormControlInput1"
                                           placeholder={user.name}/>
                                </div>

                                <div className="mb-3">
                                    <div className="row">
                                        <h6 className="form-check-label col-sm-3" htmlFor="flexCheckDefault">
                                            {t("isDriver")}
                                        </h6>
                                        <div className="form-check col-sm-3">
                                            <input className="form-check-input" type="checkbox" value=""
                                                   id="flexCheckDefault"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <h6 htmlFor="countrySelector" className="form-label">{t("countrySelector")}</h6>
                                    <select id="countrySelector" className="form-select">
                                        <option>{t("select")}</option>
                                        {countrySelectorValues}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <h6 htmlFor="provinceSelector" className="form-label">{t("provinceSelector")}</h6>
                                    <select id="provinceSelector" className="form-select">
                                        <option>{t("select")}</option>
                                        {provinceSelectorValues}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <h6 htmlFor="citySelector" className="form-label">{t("citySelector")}</h6>
                                    <select id="citySelector" className="form-select">
                                        <option>{t("select")}</option>
                                        {citySelectorValues}
                                    </select>
                                </div>
                                <div className="row-sm-2">
                                    <input className="btn btn-primary" type='submit' value='Submit'/>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
                <div className="col-sm-2"></div>
            </div>
        </div>
    </>);

}

export default Profile;

