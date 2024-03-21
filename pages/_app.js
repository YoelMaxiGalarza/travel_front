/**
 * App
 */
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import Footer from "../components/core/footer";
import CustomHead from "../components/core/head";
import i18next from "i18next";
import {I18nextProvider} from "react-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import common_en from "../i18lang/common_en.json";
import common_es from "../i18lang/common_es.json";

import {HttpResourceContext} from "../components/core/context/CustomContext";
import {HttpResourceFactory} from "../components/core/resourcefactory/HttpResourceFactory";
import {HttpAuthenticationResourceFactory}
    from "../components/core/resourcefactory/HttpAuthenticationResourceFactory";


function MyApp({Component, pageProps}) {

    const router = useRouter();
    const http = HttpResourceFactory.create();

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
        <I18nextProvider i18n={i18next}>
            <HttpResourceContext.Provider value={{
                http: http,
                router: router,
                auth: HttpAuthenticationResourceFactory.create(http),

            }}>
                <CustomHead/>
                <Component {...pageProps}/>
                <Footer/>
            </HttpResourceContext.Provider>
        </I18nextProvider>

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