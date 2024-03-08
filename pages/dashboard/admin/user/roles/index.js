import {useTranslation} from "react-i18next";
import {useRouter} from "next/navigation";
import {HttpResourceFactory} from "../../../../../components/core/factory/HttpResourceFactory";
import {useContext, useEffect, useState} from "react";
import AdminNavbar from "../../../../../components/navbar/AdminNavbar";
import UserNavbar from "../../../../../components/navbar/UserNavbar";
import {forEach} from "react-bootstrap/ElementChildren";
import {HttpResourceFactoryContext} from "../../../../../components/core/context";

/**
 *
 * TODO: agregar badges para los roles
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function Roles() {
    const [t, i18n] = useTranslation('common');
    const httpResource = HttpResourceFactory.create();
    const [roles, setRoles] = useState([{}]);
    const [role, setRole] = useState({});
    async function getAllRoles(){
        setRoles([{}])
        httpResource.get("/roles", localStorage.getItem('Authorization')).then(value => {
            value.json().then(value => {
                setRoles(value)
            });
        });
    }
    useEffect(() => {
        getAllRoles();
    }, []);
    function resetForm() {
        setRole({
            name: "",
            description: "",
            disabled: false,
            id: null
        });
    }
    async function handleEditRole(roleId) {
        console.log("EditRole")
        console.log(roleId)
        httpResource.get("/roles?roleId=" + roleId, localStorage.getItem('Authorization')).then(value => {
            value.json().then(value => {
                setRole(value)
            });
        });
    }

    async function editRole(event) {
        event.preventDefault();
        console.log("EditRole")
        console.log(role.id)
        if(role.id != null || role.id != undefined) {
            console.log(role)
            httpResource.post("/roles/edit", JSON.stringify(role), localStorage.getItem('Authorization')).then(value => {
                value.json().then(value => {
                    resetForm();
                    getAllRoles();
                });
            });
        }else{
            httpResource.post("/roles/create", JSON.stringify(role), localStorage.getItem('Authorization')).then(value => {
                value.json().then(value => {
                    resetForm();
                    getAllRoles();
                });
            });
        }
        setRole({})

    }

    return (<div>
        <UserNavbar>
            <AdminNavbar/>
        </UserNavbar>

        <div className="mb-3">
            <div className="row">
                <h1>Roles</h1>
                <div className="col">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">#Id</th>
                            <th scope="col">name</th>
                            <th scope="col">description</th>
                            <th scope="col">enabled</th>
                        </tr>
                        </thead>
                        <tbody>
                        {roles.map((role, index) => {
                            return <tr key={role.id} onClick={event => {
                                handleEditRole(role.id)
                            }}>
                                <th scope="row">{role.id}</th>
                                <td>{role.name}</td>
                                <td>{role.description}</td>
                                <td><input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"
                                           defaultChecked={!role.disabled} disabled/></td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
                <div className="col">
                    <h2>Edit/Create</h2>
                    <form href="#" onSubmit={editRole}>
                        <div className="mb-3">
                            <input type="text" hidden className="form-control-plaintext " readOnly id="id"
                                   value={role.id}/>
                            <label htmlFor="name" className="form-label">{t("name")}</label>
                            <input type="text" className="form-control" id="name" value={role.name} onChange={event => {
                                setRole({...role, name: event.target.value})
                            }}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">{t("description")}</label>
                            <input type="text" className="form-control" id="description" value={role.description}
                                   onChange={event => {
                                       setRole({...role, description: event.target.value})

                                   }}/>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="disabled" checked={!role.disabled}
                                   onChange={event => {
                                       setRole({...role, disabled: !event.target.checked})
                                   }}/>
                            <label className="form-check-label" htmlFor="disabled">{t("enabled")}</label>
                        </div>
                        <div className="row-sm-2">
                            <input className="btn btn-primary" type='submit' value='Submit'/>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>);
}