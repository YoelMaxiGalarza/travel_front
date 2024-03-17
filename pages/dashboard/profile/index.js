import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import Image from "next/image";
import {HttpResourceFactory} from "../../../components/core/factory/HttpResourceFactory";
import Sidebar from "../../../components/navbar/Sidebar";

function Profile() {
    const [t, i18n] = useTranslation("common");
    const http = HttpResourceFactory.create()
    let [countrySelectorValues, setCountrySelectorValues] = useState([])
    let [citySelectorValues, setCitySelectorValues] = useState([])
    let [provinceSelectorValues, setProvinceSelectorValues] = useState([])

    let [countryId, setCountryId] = useState(null)

    let user = {
        name: "Martin",
        surname: "Perez",
        email: "",
        isDriver: false,
        country: 10,
        province: 1,
        city: 1
    }

    async function GetCountrySelectorValues() {


    }

    async function GetProvinceSelectorValues() {

    }


    async function getUserData() {
        // const request = await http.get("/user/", localStorage.getItem('Authorization'));
        // const reponse = await request.json();
        // console.log(reponse)
    }

    useEffect(() => {
        // TODO redireccionar si no esta logueado
        // console.log(isLogged)
        // if(isLogged === false){
        //     router.push("/")
        // }
        getUserData()
    }, []);


    return (<>
        <Sidebar></Sidebar>
        <div className="container">
            <div className="mb3">
                <div className="card">
                    <img src="/img/favicon.ico" className="profile-img "
                         alt="userprofilepicture"
                         style={{width: "5rem", height: "5rem", alignSelf: "center"}}/>
                    <form>
                        <div className="card-body">
                            <div className="mb-3">
                                <h6 htmlFor="nameInput"
                                    className="form-label">{t("nameInput")}</h6>
                                <input type="text" className="form-control"
                                       id="exampleFormControlInput1"
                                       placeholder={user.name}/>
                            </div>
                            <div className="mb-3">
                                <h6 htmlFor="surnameInput"
                                    className="form-label">{t("surnameInput")}</h6>
                                <input type="text" className="form-control"
                                       id="exampleFormControlInput1"
                                       placeholder={user.surname}/>
                            </div>
                            <div className="mb-3">
                                <h6 htmlFor="usernameInput"
                                    className="form-label">{t("usernameInput")}</h6>
                                <input type="text" className="form-control" id="username"
                                       placeholder={user.username}/>
                            </div>

                            <div className="mb-3">
                                <h6 htmlFor="emailInput"
                                    className="form-label">{t("emailInput")}</h6>
                                <input type="email" className="form-control"
                                       id="exampleFormControlInput1"
                                       placeholder={user.email}/>
                            </div>

                            <div className="mb-3">
                                <div className="row">
                                    <h6 className="form-check-label col-sm-3"
                                        htmlFor="flexCheckDefault">
                                        {t("isDriver")}
                                    </h6>
                                    <div className="form-check col-sm-3">
                                        <input className="form-check-input" type="checkbox"
                                               value={user.isDriver}
                                               id="flexCheckDefault"/>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <h6 htmlFor="countrySelector"
                                    className="form-label">{t("countrySelector")}</h6>
                                <select id="countrySelector" className="form-select"
                                        value={user.country}>
                                    <option>{t("select")}</option>
                                    {countrySelectorValues}
                                </select>
                            </div>
                            <div className="mb-3">
                                <h6 htmlFor="provinceSelector"
                                    className="form-label">{t("provinceSelector")}</h6>
                                <select id="provinceSelector" className="form-select"
                                        value={user.province}>
                                    <option>{t("select")}</option>
                                    {provinceSelectorValues}
                                </select>
                            </div>
                            <div className="mb-3">
                                <h6 htmlFor="citySelector"
                                    className="form-label">{t("citySelector")}</h6>
                                <select id="citySelector" className="form-select"
                                        value={user.city}>
                                    <option>{t("select")}</option>
                                    {citySelectorValues}
                                </select>
                            </div>
                            <div className="row-sm-2">
                                <input className="btn btn-primary" type='submit'
                                       value='Submit'/>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </>);

}

export default Profile;

