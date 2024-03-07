import UserNavbar from "../../../../components/navbar/UserNavbar";
import Footer from "../../../../components/core/footer";
import {useEffect} from "react";
import CreateTripView from "../../../../components/trip/CreateTripView";

export default function CreateTrip(){
    useEffect(() => {



    }, []);
    return <>
        <UserNavbar/>
        <CreateTripView />
        <Footer/>
    </>
}