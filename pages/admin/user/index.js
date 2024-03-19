import AdminSidebar from "../../../components/navbar/AdminSidebar";
import {HttpResourceFactory} from "../../../components/core/factory/HttpResourceFactory";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

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
            query: { userId: id },
        })}

    return (
        <>
            <AdminSidebar/>
            <br/>
            <div className="container">


                <div className="card">
                    <div className="card-body">
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search"
                                   placeholder="Search"
                                   aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">Search
                            </button>
                        </form>

                        <table className="table">
                            <thead>
                            <tr>
                                <th className={"col"}>{t("name")}</th>
                                <th className={"col"}>{t('surname')}</th>
                                <th className={"col"}></th>
                            </tr>
                            </thead>
                            <tbody>
                            {userList.map((user, index) => {
                                if (user.id != null) {
                                    return <tr key={index} className={"tr-hover"}>
                                        <td className={"col"}> {user.name}</td>
                                        <td className={"col"}> {user.surname}</td>
                                        <td className={"col"}>
                                            <button type="button" className="btn btn-primary "
                                                    onClick={event => editUser(event, user.id)}>
                                                <i className="fa-solid fa-pen"></i>
                                            </button>
                                            <button type="button" className="btn btn-danger "
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