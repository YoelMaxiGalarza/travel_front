import {useTranslation} from "react-i18next";
import {useContext, useState} from "react";
import {useRouter} from "next/navigation";
import Sidebar from "../../../../components/navbar/Sidebar";
import UserManagementNavbar from "../../../../components/navbar/UserManagementNavbar";
import {HttpResourceContext} from "../../../../components/core/context/CustomContext";
import RoleResourceFactory
    from "../../../../components/core/resourcefactory/RoleResourceFactory";

export default function CreateRole() {
    const [t, i18n] = useTranslation('common');
    const {http,router} = useContext(HttpResourceContext);
    const [role, setRole] = useState({name: "", description: "", disabled: false});
    const roleResource = RoleResourceFactory.create(http);

    const createRole = async (event) => {
        event.preventDefault();
        await roleResource.createRole(JSON.stringify(role), localStorage.getItem('Authorization'));
        router.push('/admin/roles')
    }
    return (<>
        <Sidebar/>
        <br/>
        <UserManagementNavbar/>
        <div>
            <div className="blog-wrapper">
                <div className="card">
                    <div className="card-body">
                        <form href="#" className={""} onSubmit={createRole}>
                            <div className="mb-3">
                                <label htmlFor="name"
                                       className="form-label">{t("name")}</label>
                                <input type="text" className="form-control" id="name"
                                       required={true}
                                       onChange={event => {
                                           setRole({...role, name: event.target.value})
                                       }}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description"
                                       className="form-label">{t("description")}</label>
                                <input type="text" className="form-control"
                                       id="description"

                                       onChange={event => {
                                           setRole({
                                               ...role, description: event.target.value
                                           })

                                       }}/>
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input"
                                       id="disabled"
                                       value={!role.disabled}
                                       onChange={event => {
                                           setRole({
                                               ...role, disabled: !event.target.checked
                                           })
                                       }}/>
                                <label className="form-check-label"
                                       htmlFor="disabled">{t("enabled")}</label>
                            </div>
                            <div className="row-sm-2">
                                <input className="btn btn-primary" type='submit'
                                       value='Submit'/>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </>)
}