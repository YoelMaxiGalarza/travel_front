import TopNavbar from "../components/navbar/TopNavbar";
import Footer from "../components/core/footer";

export default function error404() {

    return (
        <>
            <TopNavbar></TopNavbar>
            <div className="non-navbar-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col"></div>
                        <div className="col-sm-3">
                            <div className="img-fluid">
                                <h1>404</h1>
                            </div>
                        </div>
                        <div className="col"></div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}