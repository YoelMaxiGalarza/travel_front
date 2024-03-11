import Head from "next/head";
import {useContext} from "react";
import {InitDataContext} from "../context";
import Link from "next/link";
import Script from "next/script";

export default function CustomHead() {

    const initDataContext = useContext(InitDataContext)
    return (<>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta charSet="utf-8"/>
            <title>{initDataContext.name}</title>
            <meta name="description" content={initDataContext.description}/>
            <link rel="icon" href="/img/favicon.ico"/>
            <link href="/styles/fontawesome-free-6.5.1/css/all.css" rel="stylesheet"/>
            <link href="/styles/index.css" rel="stylesheet"/>
        </Head>

    </>)
}