import AdminNavbar from "../../../../components/navbar/AdminNavbar";
import Footer from "../../../../components/core/footer";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {HttpResourceFactory} from "../../../../components/core/factory/HttpResourceFactory";

export default function Create() {
    const [t, i18n] = useTranslation("common");
    const [data, setData] = useState({});
    const httpResource = HttpResourceFactory.create();
    const router = useRouter();
    const [roles, setRoles] = useState([{}]);
    const [error, setError] = useState({});

    async function handleSubmit(event) {
        event.preventDefault();

        console.log(data)
        await httpResource.post("/user/create", JSON.stringify(data), localStorage.getItem('Authorization')).then(value => {
            if (value.status === 200) {
                router.push("/admin/user")
            } else {
                value.json().then(value => {
                    setError({...error, errorMessage: value.message, isError: true});
                    console.log(error);
                })
            }
        })

    }

    useEffect(() => {
        httpResource.get("/roles", localStorage.getItem('Authorization')).then(value => {
            value.json().then(value => {
                setRoles(value)
            });
        });
    }, [httpResource]);
    return (<>
        <AdminNavbar/>
        <div className="container ">
            <div className="row">
                <div className="col"></div>
                <div className="col">
                    <div className="card">
                        <form className="" onSubmit={handleSubmit}>
                            <div className="card-body">
                                <div className="mb-3">
                                    <h6 htmlFor="usernameInput"
                                        className="form-label">{t('user.username')}</h6>
                                    <input type="text" className="form-control"
                                           id="usernameInput"
                                           onChange={event => {
                                               setData({...data, username: event.target.value})
                                           }}
                                           required
                                    />
                                </div>
                                <div className="mb-3">
                                    <h6 htmlFor="nameInput"
                                        className="form-label">{t('user.name')}</h6>
                                    <input type="text" className="form-control" id="nameInput"
                                           onChange={event => {
                                               setData({...data, name: event.target.value})
                                           }} required
                                    />
                                </div>
                                <div className="mb-3">
                                    <h6 htmlFor="surnameInput"
                                        className="form-label">{t('user.surname')}</h6>
                                    <input type="text" className="form-control"
                                           id="surnameInput" onChange={event => {
                                        setData({...data, surname: event.target.value})
                                    }} required/>
                                </div>
                                <div className="mb-3">
                                    <h6 htmlFor="emailInput"
                                        className="form-label">{t('user.email')}</h6>
                                    <input type="email" className="form-control"
                                           id="emailInput" onChange={event => {
                                        setData({...data, email: event.target.value})
                                    }} required/>
                                </div>

                                <div className="mb-3">
                                    <h6 htmlFor="passwordInput"
                                        className="form-label">{t('user.password')}</h6>
                                    <input type="password" className="form-control"
                                           id="passwordInput"
                                           onChange={event => {
                                               setData({...data, password: event.target.value})
                                           }} required/>
                                </div>
                                <div className="mb-3">
                                    <h6 htmlFor="roleInput"
                                        className="form-label">{t('user.role')}</h6>
                                    <select className="form-select" id="roleInput"
                                            onChange={event => {
                                                setData({
                                                    ...data,
                                                    role: roles[event.target.value]
                                                })
                                            }}>
                                        {roles.map((role, index) => {
                                            return <option key={role.id}
                                                           value={index}>{role.name}</option>
                                        })}
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
                <div className="col">
                    <div className="alert alert-danger" role="alert" hidden={!error.isError}>
                        {t("error." + error.errorMessage)}
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </>)
}