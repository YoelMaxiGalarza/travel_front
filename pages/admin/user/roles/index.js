import {useTranslation} from "react-i18next";
import {HttpResourceFactory} from "../../../../components/core/factory/HttpResourceFactory";
import {useEffect, useState} from "react";
import AdminSidebar from "../../../../components/navbar/AdminSidebar";
import UserNavbar from "../../../../components/navbar/UserNavbar";
import {useRouter} from "next/navigation";

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
    const router = useRouter()

    async function getAllRoles() {
        setRoles([{}])
        const response = await httpResource.get("/roles", localStorage.getItem('Authorization'));
        const roles = await response.json();
        setRoles(roles);
    }

    useEffect(() => {
        getAllRoles();
    }, []);

    async function handleEditRole(roleId) {
        router.push({
            pathname: '/admin/user/roles/view', query: {roleId: roleId}
        })
    }


    function removeRole(roleId) {
        console.log("removeRole", roleId);
    }

    return (<>
        <AdminSidebar/>

        <div className="mb-3">
            <div className="row">
                <h1>Roles</h1>
                <div className="col-sm-1"></div>
                <div className="col">
                    <div className="container card ">
                        <div className="card-body">
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
                                        <th scope="row" onClick={event => {
                                            handleEditRole(role.id)
                                        }}>{role.id}</th>
                                        <td onClick={event => {
                                            handleEditRole(role.id)
                                        }}>{role.name}</td>
                                        <td onClick={event => {
                                            handleEditRole(role.id)
                                        }}>{role.description}</td>
                                        <td onClick={event => {
                                            handleEditRole(role.id)
                                        }}><input className="form-check-input" type="checkbox"
                                                  value=""
                                                  id="flexCheckChecked"
                                                  defaultChecked={!role.disabled} disabled/>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger "
                                                    onClick={event => removeRole(role.id)}>
                                                <i className="fa-solid fa-trash">{t("delete")}</i>
                                            </button>
                                        </td>
                                    </tr>
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-sm-1">
                    <button type="button" className="btn btn-primary" onClick={event => {
                        router.push("/admin/user/roles/create")
                    }}>Add Role
                    </button>
                </div>
                <div className="col-sm-1"></div>
            </div>
        </div>
    </>);
}