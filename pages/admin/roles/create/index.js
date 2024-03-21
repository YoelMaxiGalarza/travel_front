import {useTranslation} from "react-i18next";
import {HttpResourceFactory} from "../../../../components/core/resourcefactory/HttpResourceFactory";
import {useContext, useState} from "react";
import {useRouter} from "next/navigation";
import Sidebar from "../../../../components/navbar/Sidebar";
import {HttpResourceContext} from "../../../../components/core/context";

export default function CreateRole() {
    const [t, i18n] = useTranslation('common');
    const {roleResource} = useContext(HttpResourceContext);
    const [role, setRole] = useState({name: "", description: "", disabled: false});
    const router = useRouter()

    const createRole = async (event) => {
        event.preventDefault();
        await roleResource.createRole(JSON.stringify(role), sessionStorage.getItem('Authorization'));
        router.push('/admin/user/roles')
    }
    return (<>
        <Sidebar/>
        <div>
            <div className="col">
                <h1>{t("createRole")}</h1>
                <form href="#" className={"container"} onSubmit={createRole}>
                    <div className="card">
                        <div className="card-body">
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
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>)
}