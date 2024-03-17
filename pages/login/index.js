import {useState} from 'react';
import {useRouter} from 'next/navigation'
import {useTranslation} from "react-i18next";
import {
    AuthenticationManager
} from "../../components/core/authentication/AuthenticationManager";

export default function Login() {

    const [t, i18n] = useTranslation("common");
    const authenticationManager = AuthenticationManager.create();
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [register, setRegister] = useState(true)
    const [login, setLogin] = useState(false)
    const [registerData, setRegisterData] = useState({
        name: "", surname: "", username: "", email: "", password: "", password2: ""
    })

    async function handleSubmitForm(event) {
        event.preventDefault()
        await authenticationManager.login(username, password).then((result) => {
            if (result.status === 200) {
                result.json().then((data) => {
                    localStorage.setItem('Authorization', 'Basic ' + data.base64EncodedAuthenticationKey)
                    localStorage.setItem('Username', data.username)
                    router.push("/dashboard")
                });
            } else {
                localStorage.clear()
                router.push("/login")
            }
        });
    }

    function handleChange() {
        setRegisterData({
            name: "", surname: "", username: "", email: "", password: "", password2: ""
        })
        setUsername("")
        setPassword("")
        setRegister(!register)
        setLogin(!login)
    }

    function registerUser(event) {
        event.preventDefault()
        if (registerData.password === registerData.password2) {

            authenticationManager.register(registerData).then((result) => {
                if (result.status === 200) {
                    alert(t("userRegistered"))
                    handleChange()
                } else {
                    alert(t("userNotRegistered"))
                }
            });
        } else {
            alert(t("passwordsNotMatch"))
        }
    }

    return (<>
        <br/>
        <div className="login" hidden={login}>
            <form id='loginform' className="card container" onSubmit={handleSubmitForm}>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="usernameInput"
                               className="form-label">{t("usernameInput")}</label>
                        <input type="text" className="form-control" id="username"
                               value={username}
                               onChange={event => {
                                   setUsername(event.target.value)
                               }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordInput"
                               className="form-label">{t("passwordInput")}</label>
                        <input type="password" className="form-control" id="password"
                               value={password} onChange={event => {
                            setPassword(event.target.value)
                        }}
                        />
                    </div>
                    <div className="mb-3">
                        <input className="btn btn-primary" type='submit' value="Submit"/>
                    </div>
                    <div className="mb-3">
                        <a href="#register" onClick={handleChange}>{t("register")}</a>
                    </div>
                </div>
            </form>
        </div>
        <div className="register" hidden={register}>
            <form className="container card " onSubmit={registerUser}>
                <div className="card-body">
                    <div className="mb-3">
                        <h6 htmlFor="nameInput" className="form-label">{t("nameInput")}</h6>
                        <input type="text" className="form-control"
                               id="nameInput" onChange={event => {
                            setRegisterData({...registerData, name: event.target.value})
                        }}/>

                    </div>
                    <div className="mb-3">
                        <h6 htmlFor="surnameInput"
                            className="form-label">{t("surnameInput")}</h6>
                        <input type="text" className="form-control"
                               id="surnameInput"
                               onChange={event => {
                                   setRegisterData({
                                       ...registerData, surname: event.target.value
                                   })
                               }}
                        />
                    </div>
                    <div className="mb-3">
                        <h6 htmlFor="usernameInput"
                            className="form-label">{t("usernameInput")}</h6>
                        <input type="text" className="form-control" id="username"
                               onChange={event => {
                                   setRegisterData({
                                       ...registerData, username: event.target.value
                                   })
                               }}
                        />
                    </div>

                    <div className="mb-3">
                        <h6 htmlFor="emailInput" className="form-label">{t("emailInput")}</h6>
                        <input type="email" className="form-control"
                               id="emailInput"
                               onChange={event => {
                                   setRegisterData({
                                       ...registerData, email: event.target.value
                                   })
                               }}
                        />
                    </div>

                    <div className="mb-3">
                        <h6 htmlFor="passwordInput"
                            className="form-label">{t("passwordInput")}</h6>
                        <input type="password" className="form-control"
                               id="passwordInput"
                               onChange={event => {
                                   setRegisterData({
                                       ...registerData, password: event.target.value
                                   })
                               }}
                        />
                    </div>
                    <div className="mb-3">
                        <h6 htmlFor="password2Input"
                            className="form-label">{t("password2Input")}</h6>
                        <input type="password" className="form-control"
                               id="password2Input"
                               onChange={event => {
                                   setRegisterData({
                                       ...registerData, password2: event.target.value
                                   })
                               }}
                        />
                    </div>
                    <div className="mb-3">
                        <input className="btn btn-primary" type='submit' value="Submit"/>
                    </div>
                    <div className="mb-3">
                        <a href="#login" onClick={handleChange}>{t("login.tag")}</a>
                    </div>
                </div>

            </form>
        </div>
    </>)
}


