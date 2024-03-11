import {useEffect, useState} from "react";
import UserNavbar from "../../../../../../components/navbar/UserNavbar";
import {useTranslation} from "react-i18next";
import {useRouter} from "next/navigation";
import AdminNavbar from "../../../../../../components/navbar/AdminNavbar";
import {useSearchParams} from "next/navigation";
import {HttpResourceFactory} from "../../../../../../components/core/factory/HttpResourceFactory";

export default function ViewRoles() {
    const [t, i18n] = useTranslation('common');
    const router = useRouter();
    const http = HttpResourceFactory.create();
    const params = useSearchParams();
    const [role, setRole] = useState({})
    let roleId = params.get('roleId');

    function getRoleByRoleID() {
        http.get("/roles?roleId=" + roleId, localStorage.getItem('Authorization')).then(value => {
            value.json().then(value => {
                console.log(value)
                setRole(value)
            });
        });
    }

    function editRole(event) {
        event.preventDefault();
        if (role.id != null || role.id != undefined) {
            console.log(role)
            http.post("/roles/edit", JSON.stringify(role), localStorage.getItem('Authorization')).then(value => {
                value.json().then(value => {
                    resetForm();
                });
            });
        } else {
            http.post("/roles/create", JSON.stringify(role), localStorage.getItem('Authorization')).then(value => {
                value.json().then(value => {
                    resetForm();
                });
            });
        }
        router.back();
    }
    function resetForm() {
        setRole({
            name: "",
            description: "",
            disabled: false,
            id: null
        });
    }
    useEffect(() => {

        getRoleByRoleID()
    }, []);
    return (<div>
        <UserNavbar>
            <AdminNavbar/>
        </UserNavbar>

        <div className="col">
            <h3 id="edit"><a href="#edit" onClick={event => {
                resetForm()
            }}>Create</a></h3>

            <form href="#" onSubmit={editRole}>
                <div className="mb-3">
                    <input type="text" hidden className="form-control-plaintext " readOnly id="id"
                           value={role.id}/>
                    <label htmlFor="name" className="form-label">{t("name")}</label>
                    <input type="text" className="form-control" id="name" required={true} value={role.name}
                           onChange={event => {
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
    </div>);
}