import Head from "next/head";
import {useContext} from "react";
import {InitDataContext} from "../context";
import Link from "next/link";

export default function CustomHead() {

    const initDataContext = useContext(InitDataContext)
    return (<>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta charSet="utf-8"/>
            <title>{initDataContext.name}</title>
            <meta name="description" content={initDataContext.description}/>
            <link rel="icon" href="./img/favicon.ico"/>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
                  integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
                  crossOrigin="anonymous"/>
        </Head>
    </>)
}