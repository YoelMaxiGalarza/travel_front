import {useTranslation} from "react-i18next";
import {useRouter} from "next/navigation";
import {HttpResourceFactory} from "../../../../../components/core/factory/HttpResourceFactory";
import {useContext, useEffect, useState} from "react";
import AdminNavbar from "../../../../../components/navbar/AdminNavbar";
import UserNavbar from "../../../../../components/navbar/UserNavbar";
import {forEach} from "react-bootstrap/ElementChildren";
import {HttpResourceFactoryContext} from "../../../../../components/core/context";

export default function Roles() {
    const [t, i18n] = useTranslation('common');
    const router = useRouter();
    const httpResource = useContext(HttpResourceFactoryContext);
    const [roles, setRoles] = useState([{}]);
    const [data, setData] = useState();

    useEffect(() => {
        httpResource.get("/roles", localStorage.getItem('Authorization')).then(value => {
            value.json().then(value => {
                setRoles(value)
            });
        });

    }, [setData]);

    function handleEditRole(roleId) {
        console.log("EditRole")
        console.log(roleId)
        httpResource.get("/roles?roleId="+roleId, localStorage.getItem('Authorization')).then(value => {
            value.json().then(value => {
                // setRoles(value)
                console.log(value)
            });
        });
    }

    return (<div>
        <UserNavbar>
            <AdminNavbar/>
        </UserNavbar>
        <h1>Roles</h1>
        <div className="mb-3">
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
                                   checked={!role.disabled}/></td>
                    </tr>
                })}

                </tbody>
            </table>
        </div>

    </div>);
}