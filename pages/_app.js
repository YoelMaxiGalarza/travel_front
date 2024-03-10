/**
 * App
 */
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {SSRProvider} from "react-bootstrap";
import i18next from "i18next";
import {I18nextProvider} from "react-i18next";
import common_en from "../i18lang/common_en.json";
import common_es from "../i18lang/common_es.json";
import Footer from "../components/core/footer";
import CustomHead from "../components/core/head/CustomHead";
import {useEffect} from "react";


function MyApp({Component, pageProps}) {

    i18next
        .init({
            interpolation: {escapeValue: false},  // React already does escaping
            lng: 'es',                              // language to use
            resources: {
                en: {
                    common: common_en               // 'common' is our custom namespace
                }, es: {
                    common: common_es
                }
            },
        });
    useEffect(() => {

    }, []);
    return (<>
        <SSRProvider>
            <I18nextProvider i18n={i18next}>
                <CustomHead></CustomHead>
                <Component {...pageProps}/>
                <Footer></Footer>
            </I18nextProvider>
        </SSRProvider>
    </>);
}

export default MyApp;
export const getStaticProps = async ({locale}) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "es", ["index",])),
        },
    };
};