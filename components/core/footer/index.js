import {useContext, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {InitDataContext} from "../context";
import Script from "next/script";

export default function Footer({children}) {
    const initDataContext = useContext(InitDataContext)
    const [t, i18n] = useTranslation("common");
    let contactAddress = initDataContext.contact.addr + " - " + initDataContext.contact.cp + " " + initDataContext.contact.city;
    let contactList = [];
    useEffect(() => {
        Object.keys(initDataContext.contact.social).forEach(key => {
            if (key === "facebook") {
                contactList.push(<a href={key}>
                    <a><i className={"fab fa-" + key + "-f"}></i></a>
                </a>);
            } else {
                contactList.push(<a href={key}>
                    <a><i className={"fab fa-" + key}></i></a>
                </a>);
            }
        });
    })


    return <>
        <footer className="" >

        </footer>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
                crossOrigin={true}></Script>
        <Script src="/styles/fontawesome-free-6.5.1/js/all.js"></Script>
    </>
}
