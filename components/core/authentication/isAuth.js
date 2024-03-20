import {useEffect} from "react";


export default function isAuth({children}) {





    // if (!auth) {
    //     return null;
    // }

    return function IsAuth() {
        return children;
    };
}