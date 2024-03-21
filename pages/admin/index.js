import {useTranslation} from "react-i18next";
import Sidebar from "../../components/navbar/Sidebar";

const Admin = () => {

    const {t} = useTranslation("common");

    return (<>
        <Sidebar/>
        <div className={"blog-wrapper"}>
            <h1>Admin</h1>
        </div>
    </>)
}

export default Admin