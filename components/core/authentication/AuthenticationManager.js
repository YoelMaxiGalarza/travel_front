import {HttpResourceFactory} from "../factory/HttpResourceFactory";

export class AuthenticationManager {
    constructor() {
        this.isAuthenticated = false;
        this.http = new HttpResourceFactory();
    }

    static create() {
        return new AuthenticationManager();
    }

    async login(username, password) {
        return await fetch(this.http.baseUrl + `/authenticate`, {
            method: "POST", body: JSON.stringify({username: username, password: password}), headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Basic ' + btoa(username + ':' + password)
            }
        }).then(value => {
            value.json().then(data => {
                try {
                    localStorage.setItem('Username', data.username)
                    let rolesData = ""
                    var roles = data.roles;
                    for (let i = 0; i < roles.length; i++) {
                        if (i == (roles.length - 1)) {
                            rolesData += roles[i].role
                        } else {
                            rolesData += roles[i].role + ","
                        }
                    }
                    localStorage.setItem('Roles', rolesData)
                    localStorage.setItem('Authorization', 'Basic ' + data.base64EncodedAuthenticationKey)
                } catch (e) {
                    console.error(e)
                }

            })
        })
    }

}
