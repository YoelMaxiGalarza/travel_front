import AdminNavbar from "../../../../../components/navbar/AdminNavbar";
import {useTranslation} from "react-i18next";
import {HttpResourceFactory} from "../../../../../components/core/factory/HttpResourceFactory";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function CreateRole() {
    const [t, i18n] = useTranslation('common');
    const http = HttpResourceFactory.create();
    const [role, setRole] = useState({
        name: "",
        description: "",
        disabled: false
    });
    const router = useRouter()

    const createRole = async (event) => {
        event.preventDefault();
        await http.post("/roles/save",JSON.stringify(role),localStorage.getItem('Authorization'));
        router.push('/admin/user/roles')
    }
    return (<>
            <AdminNavbar/>
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
                                                   ...role,
                                                   description: event.target.value
                                               })

                                           }}/>
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input"
                                           id="disabled"
                                           value={!role.disabled}
                                           onChange={event => {
                                               setRole({
                                                   ...role,
                                                   disabled: !event.target.checked
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
        </>
    )
}