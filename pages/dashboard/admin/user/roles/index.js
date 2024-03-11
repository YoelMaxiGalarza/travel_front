import {useTranslation} from "react-i18next";
import {HttpResourceFactory} from "../../../../../components/core/factory/HttpResourceFactory";
import {useEffect, useState} from "react";
import AdminNavbar from "../../../../../components/navbar/AdminNavbar";
import UserNavbar from "../../../../../components/navbar/UserNavbar";
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
        httpResource.get("/roles", localStorage.getItem('Authorization')).then(value => {
            value.json().then(value => {
                setRoles(value)
            });
        });
    }

    useEffect(() => {
        getAllRoles();
    }, []);

    async function handleEditRole(roleId) {
        router.push({
            pathname: '/dashboard/admin/user/roles/view',
            query: { roleId: roleId }
        })
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
                                router.push("/dashboard/admin/user/roles#edit")
                            }}>
                                <th scope="row">{role.id}</th>
                                <td>{role.name}</td>
                                <td>{role.description}</td>
                                <td><input className="form-check-input" type="checkbox" value=""
                                           id="flexCheckChecked"
                                           defaultChecked={!role.disabled} disabled/></td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </div>);
}