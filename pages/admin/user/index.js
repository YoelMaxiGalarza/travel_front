import {
    HttpResourceFactory
} from "../../../components/core/resourcefactory/HttpResourceFactory";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import Sidebar from "../../../components/navbar/Sidebar";
import UserManagementNavbar from "../../../components/navbar/UserManagementNavbar";

export default function UserManagement() {

    const http = HttpResourceFactory.create();
    const router = useRouter();
    const [t, i18n] = useTranslation('common');
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        http.get('/user/getAll', localStorage.getItem('Authorization')).then((res) => {
            res.json().then((data) => {
                setUserList(data)
            });
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    function deleteUser(event, id) {
        event.preventDefault();
        console.log(id)
    }

    function editUser(event, id) {
        event.preventDefault();
        router.push({
            pathname: '/admin/user/edit',
            query: {userId: id},
        })
    }

    return (
        <>
            <Sidebar/>
            <br/>
            <UserManagementNavbar/>
            <div className="blog-wrapper">

                <div className="card">
                    <div className="card-body">

                        <ul className="nav">
                            <li className="d-flex">
                                <input className="form-control me-2" type="search"
                                       placeholder="Search"
                                       aria-label="Search" />
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-primary" onClick={event => {
                                    event.preventDefault()
                                    router.push({pathname: "/admin/user/create"})
                                }}>Crear
                                </button>
                            </li>
                        </ul>
                        <table className="table">
                            <thead>
                            <tr>
                                <th className={"col"}>{t("name")}</th>
                                <th className={"col"}>{t('surname')}</th>
                                <th className={"col"}></th>
                            </tr>
                            </thead>
                            <tbody>
                            {userList.map((user) => {
                                if (user.id != null) {
                                    return <tr key={user.id} className={"tr-hover"}>
                                        <td className={"col"}> {user.name}</td>
                                        <td className={"col"}> {user.surname}</td>
                                        <td className={"col"}>
                                            <button type="button"
                                                    className="btn btn-primary "
                                                    onClick={event => editUser(event, user.id)}>
                                                <i className="fa-solid fa-pen"></i>
                                            </button>
                                            <button type="button"
                                                    className="btn btn-danger "
                                                    onClick={event => deleteUser(event, user.id)}>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>

                                    </tr>
                                }

                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}