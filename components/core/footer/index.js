import {useTranslation} from "react-i18next";
import Script from "next/script";

export default function Footer({children}) {
    const {t,i18n} = useTranslation('common');


    return <>
        <footer className=" ">

        </footer>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
                crossOrigin={true}></Script>

    </>
}
