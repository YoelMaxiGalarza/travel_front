import {useRouter} from "next/navigation";

export class HttpResourceFactory {


    constructor() {
        this.baseUrl = "http://190.31.121.129:8080/api";
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }

    static create(){
        return new HttpResourceFactory();
    }

    _doRequest(endpoint, method, body, headers) {
        return fetch(this.baseUrl + endpoint, {method: method, body: body, headers: headers, })
    }

    get(endpoint,authorization) {
        this.headers['Authorization'] = authorization
        return this._doRequest(endpoint, "GET", null, this.headers)
    }

    post(endpoint, body, authorization) {
        this.headers['Authorization'] = authorization
        return this._doRequest(endpoint, "POST", body, this.headers)
    }

    put(endpoint, body, authorization) {
        this.headers['Authorization'] = authorization
        return this._doRequest(endpoint, "PUT", body, this.headers)
    }

}

