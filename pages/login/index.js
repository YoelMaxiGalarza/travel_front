import {useContext, useState} from 'react';
import {useTranslation} from "react-i18next";
import {HttpResourceContext} from "../../components/core/context/CustomContext";


export default function Login() {

    const {t} = useTranslation("common");
    const [registerView, setRegisterView] = useState(true);
    const [loginView, setLoginView] = useState(false);
    const [registerData, setRegisterData] = useState({
        name: "rockstonebb", surname: "rockstonebb", username: "rockstonebb", email: "saaimonsg@gmail.com", password: "123456", password2: "123456"
    });
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState({error: false, errorMessage: ""});

    const {router, auth} = useContext(HttpResourceContext);

    async function handleSubmitForm(event) {
        event.preventDefault()
        const request = await auth.login(username, password);
        try {
            const response = await request.json();
            if (request.status === 200) {
                let {username, roles, email, isDriver} = response.user;
                let permissions = []
                roles.forEach(role => {
                    role.permissions.forEach(permission => {
                        permissions.push(permission)
                    })
                })
                localStorage.setItem('username', username);
                localStorage.setItem('roles', JSON.stringify(roles));
                localStorage.setItem('email', email);
                localStorage.setItem('isDriver', isDriver);
                localStorage.setItem('permissions', JSON.stringify(permissions))
                localStorage.setItem('Authorization', 'Basic ' + response.base64EncodedAuthenticationKey)
                router.push("/dashboard")
            } else if (request.status === 401) {
                localStorage.clear()
                setError({error: true, errorMessage: t("unauthorized")});
            }
        } catch (e) {
            console.error(e)
        }
    }


    function handleChange() {
        setRegisterData({
            name: "rockstonebb", surname: "rockstonebb", username: "rockstonebb", email: "saaimonsg@gmail.com", password: "123456", password2: "123456"
        })
        setUsername("")
        setPassword("")
        setRegisterView(!registerView)
        setLoginView(!loginView)
    }

    async function registerUser(event) {
        event.preventDefault()
        if (registerData.password === registerData.password2) {
            if (registerData.username != "" && registerData.password != "" && registerData.email != "" && registerData.name != "" && registerData.surname != "") {
                await auth.register(registerData).then((result) => {
                    if (result.status === 200) {
                        handleChange()
                    } else {
                        alert(t("userNotRegistered"))
                    }
                });
            } else {
                alert(t("fillAllFields"))
            }
        } else {
            alert(t("passwordsNotMatch"))
        }
    }

    return (<>
        <br/>
        <div className="login" hidden={loginView}>
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
        <div className="register" hidden={registerView}>
            <form className="container card " onSubmit={registerUser}>
                <div className="card-body">
                    <div className="mb-3">
                        <h6 htmlFor="nameInput"
                            className="form-label">{t("nameInput")}</h6>
                        <input type="text" className="form-control"
                               id="nameInput"
                               required={true}
                               value={registerData.name} onChange={event => {
                            setRegisterData({...registerData, name: event.target.value})
                        }}/>

                    </div>
                    <div className="mb-3">
                        <h6 htmlFor="surnameInput"
                            className="form-label">{t("surnameInput")}</h6>
                        <input type="text" className="form-control"
                               id="surnameInput"
                               required={true}
                               value={registerData.surname}
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
                               value={registerData.username}
                               required={true}
                               onChange={event => {
                                   setRegisterData({
                                       ...registerData, username: event.target.value
                                   })
                               }}
                        />
                    </div>

                    <div className="mb-3">
                        <h6 htmlFor="emailInput"
                            className="form-label">{t("emailInput")}</h6>
                        <input type="email" className="form-control"
                               id="emailInput"
                               required={true}
                               value={registerData.email}
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
                               required={true}
                               value={registerData.password}
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
                               required={true}
                               value={registerData.password2}
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

