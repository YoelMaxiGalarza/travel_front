import {useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useSearchParams} from "next/navigation";
import Sidebar from "../../../../components/navbar/Sidebar";
import {HttpResourceContext} from "../../../../components/core/context/CustomContext";
import RoleResourceFactory
    from "../../../../components/core/resourcefactory/RoleResourceFactory";
import UserManagementNavbar from "../../../../components/navbar/UserManagementNavbar";

export default function ViewRoles() {
    const [t, i18n] = useTranslation('common');
    const {http, router} = useContext(HttpResourceContext)
    const roleResource = RoleResourceFactory.create(http)
    const params = useSearchParams();
    const [role, setRole] = useState({})
    let roleId = params.get('roleId');

    async function getRoleByRoleID() {
        const request = await roleResource.getRole(roleId, localStorage.getItem('Authorization'));
        const response = await request.json();
        setRole(response)
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
        }
        router.push("/admin/user/roles");
    }

    function resetForm() {
        setRole({
            name: "", description: "", disabled: false, id: null
        });
    }

    useEffect(() => {

        getRoleByRoleID()
    }, []);
    return (<>
        <Sidebar/>
        <br/>
        <UserManagementNavbar />
        <h3 id="edit">Edit Role &quot{role.name}&quot</h3>

        <div className="blog-wrapper">
            <form href="#" className={"container"} onSubmit={editRole}>
                <div className="card">
                    <div className="card-body">
                        <div className="mb-3">
                            <input type="text" hidden className="form-control-plaintext "
                                   readOnly id="id"
                                   value={role.id}/>
                            <label htmlFor="name" className="form-label">{t("name")}</label>
                            <input type="text" className="form-control" id="name"
                                   required={true} value={role.name}
                                   onChange={event => {
                                       setRole({...role, name: event.target.value})
                                   }}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description"
                                   className="form-label">{t("description")}</label>
                            <input type="text" className="form-control" id="description"
                                   value={role.description}
                                   onChange={event => {
                                       setRole({...role, description: event.target.value})

                                   }}/>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="disabled"
                                   checked={!role.disabled}
                                   onChange={event => {
                                       setRole({...role, disabled: !event.target.checked})
                                   }}/>
                            <label className="form-check-label"
                                   htmlFor="disabled">{t("enabled")}</label>
                        </div>
                        <div className="row-sm-2">
                            <input className="btn btn-primary" type='submit' value='Submit'/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </>);
}