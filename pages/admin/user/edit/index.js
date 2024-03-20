import AdminSidebar from "../../../../components/navbar/AdminSidebar";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {HttpResourceFactory} from "../../../../components/core/factory/HttpResourceFactory";
import {useTranslation} from "react-i18next";
import Sidebar from "../../../../components/navbar/Sidebar";

export default function Edit() {
    const params = useSearchParams()
    let userId = params.get("userId");

    const [t, i18n] = useTranslation("common");
    const http = HttpResourceFactory.create();
    const [roles, setRoles] = useState([{}]);
    const [selectedRole, setSelectedRole] = useState([{}]);
    const [error, setError] = useState({});
    const router = useRouter();
    const [data, setData] = useState({
        "id": 1,
        "username": "",
        "password": null,
        "name": "",
        "surname": "",
        "email": "",
        "roles": [{
            "id": 1,
            "name": "",
            "description": "",
            "disabled": false,
            "new": false
        }],
        "driver": false
    });

    async function handleSubmit(event) {
        event.preventDefault();
        http.put("/user/update", JSON.stringify(data), localStorage.getItem('Authorization')).then(value => {
            if (value.ok) {
                router.push("/admin/user");
            } else {
                value.json().then(value => {
                    setError({isError: true, errorMessage: value.message});
                });
            }
        });
    }

    async function getUserData() {
        try {
            const response = await http.get(`/user/get/${userId}`, localStorage.getItem('Authorization'));
            const userData = await response.json();
            setData(userData);
            // Set selected role based on user's roles
            if (userData.roles.length > 0) {
                setSelectedRole(userData.roles[0].id); // Assuming a single selected role
            }
        } catch (error) {
            console.error("An error occurred while fetching user data:", error);
            setError("An error occurred while fetching user data.");
        }
    }

    async function getRoles() {
        try {
            const response = await http.get("/roles", localStorage.getItem('Authorization'));
            const rolesData = await response.json();
            setRoles(rolesData);
        } catch (error) {
            console.error("An error occurred while fetching roles:", error);
            setError("An error occurred while fetching roles.");
        }
    }
    useEffect(() => {
        getRoles()
        getUserData();

    }, []);

    return (<>
        <Sidebar />
        <br/>
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
                                           value={data.username}
                                           onChange={event => {
                                               setData({
                                                   ...data, username: event.target.value
                                               })
                                           }}
                                           required
                                    />
                                </div>
                                <div className="mb-3">
                                    <h6 htmlFor="nameInput"
                                        className="form-label">{t('user.name')}</h6>
                                    <input type="text" className="form-control"
                                           id="nameInput"
                                           value={data.name}
                                           onChange={event => {
                                               setData({...data, name: event.target.value})
                                           }} required
                                    />
                                </div>
                                <div className="mb-3">
                                    <h6 htmlFor="surnameInput"
                                        className="form-label">{t('user.surname')}</h6>
                                    <input type="text" className="form-control"
                                           id="surnameInput"
                                           value={data.surname}
                                           onChange={event => {
                                               setData({
                                                   ...data, surname: event.target.value
                                               })
                                           }} required/>
                                </div>
                                <div className="mb-3">
                                    <h6 htmlFor="emailInput"
                                        className="form-label">{t('user.email')}</h6>
                                    <input type="email" className="form-control"
                                           id="emailInput"
                                           value={data.email}
                                           onChange={event => {
                                               setData({
                                                   ...data, email: event.target.value
                                               })
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
                                            if (role.id === selectedRole) {
                                                return <option
                                                    key={index}
                                                    value={data.roles[0].id}
                                                    selected>{role.name}</option>
                                            } else {
                                                return <option
                                                    key={index}
                                                    value={role.id}>{role.name}</option>
                                            }
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
                    <div className="alert alert-danger" role="alert"
                         hidden={!error.isError}>
                        {t("error." + error.errorMessage)}
                    </div>
                </div>
            </div>
        </div>
    </>)
}