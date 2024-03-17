import {HttpResourceFactory} from "../factory/HttpResourceFactory";

export class AuthenticationManager {
    constructor() {
        this.isAuthenticated = false;
        this.http = HttpResourceFactory.create()
    }

    static create() {
        return new AuthenticationManager();
    }

    async login(username, password) {
        return await fetch(this.http.baseUrl + `/authenticate`,
            {
                method: "POST",
                body: JSON.stringify({username: username, password: password}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Basic ' + btoa(username + ':' + password)
                }
            })
    }

    async register(registerData) {
        return await fetch(this.http.baseUrl + `/authenticate/register`, {
            method: "POST", body: JSON.stringify(registerData), headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Basic ' + btoa(registerData.username + ':' + registerData.password)
            }
        })
    }
}
