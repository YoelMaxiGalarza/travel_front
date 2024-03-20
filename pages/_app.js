/**
 * App
 */
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import i18next from "i18next";
import {I18nextProvider} from "react-i18next";
import common_en from "../i18lang/common_en.json";
import common_es from "../i18lang/common_es.json";
import Footer from "../components/core/footer";
import CustomHead from "../components/core/head/CustomHead";
import {AppResourceContext, HttpResourceContext} from "../components/core/context";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {HttpResourceFactory} from "../components/core/factory/HttpResourceFactory";
import {
    HttpAuthenticationResourceFactory
} from "../components/core/factory/HttpAuthenticationResourceFactory";
import {CountryResourceFactory} from "../components/core/factory/CountryResourceFactory";
import PermissionResourceFactory from "../components/core/factory/PermissionResourceFactory";
import RoleResourceFactory from "../components/core/factory/RoleResourceFactory";


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
                <AppResourceContext.Provider value={{
                    countryResource: CountryResourceFactory.create(http),
                    permissionsResource: PermissionResourceFactory.create(http),
                    roleResource: RoleResourceFactory.create(http)
                }}>
                    <CustomHead/>
                    <Component {...pageProps}/>
                    <Footer/>
                </AppResourceContext.Provider>
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