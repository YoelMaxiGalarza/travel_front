import {useTranslation} from "react-i18next";

import {useContext, useEffect, useState} from "react";
import Sidebar from "../../../components/navbar/Sidebar";
import RoleResourceFactory from "../../../components/core/resourcefactory/RoleResourceFactory";
import UserManagementNavbar from "../../../components/navbar/UserManagementNavbar";
import {HttpResourceContext} from "../../../components/core/context/CustomContext";

/**
 *
 * TODO: agregar badges para los roles
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function Roles() {
    const [t, i18n] = useTranslation('common');
    const {http, router} = useContext(HttpResourceContext);
    const [roles, setRoles] = useState([{}]);
    const roleResource = RoleResourceFactory.create(http);

    async function getAllRoles() {
        setRoles([{}])
        const response = await roleResource.getAllRoles(localStorage.getItem('Authorization'));
        const role = await response.json();
        setRoles(role);
    }

    useEffect(() => {
        getAllRoles();

    }, []);

    async function handleEditRole(roleId) {
        router.push({
            pathname: '/admin/roles/edit', query: {roleId: roleId}
        })
    }


    async function deleteRole(roleId) {
        await roleResource.deleteRole(roleId, localStorage.getItem("Authorization"));
        await getAllRoles();
    }

    return (<>
        <Sidebar/>
        <br/>
        <UserManagementNavbar/>

        <div className="blog-wrapper ">
            <div className="card ">
                <div className="card-body">
                    <ul className="nav">
                        <li className="d-flex">
                            <input className="form-control mb-3" type="search"
                                   placeholder="Search"
                                   aria-label="Search"/>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn "
                                    onClick={event => {
                                        router.push("/admin/roles/create")
                                    }}>Add Role
                            </button>
                        </li>
                    </ul>
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
                            return <tr key={role.id}>
                                <th>{role.id}</th>
                                <td>{role.name}</td>
                                <td>{role.description}</td>
                                <td><input className="form-check-input" type="checkbox"
                                           value=""
                                           id="flexCheckChecked"
                                           defaultChecked={!role.disabled} disabled/>
                                </td>
                                <td>


                                    <button className="btn btn-success "
                                            onClick={event => handleEditRole(role.id)}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button className="btn btn-danger "
                                            onClick={event => deleteRole(role.id)}>
                                        <i className="fa-solid fa-trash">{}</i>
                                    </button>
                                </td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>);
}