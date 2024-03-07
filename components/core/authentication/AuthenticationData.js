
class AuthenticationData {

    constructor() {
        this._rememberMe = false;
        this._authenticated = false;
        this._bearer = "";
        this._username = "";
        this._password ="";
        this._roles = [];
    }


    get rememberMe() {
        return this._rememberMe;
    }

    set rememberMe(value) {
        this._rememberMe = value;
    }

    get authenticated() {
        return this._authenticated;
    }

    set authenticated(value) {
        this._authenticated = value;
    }

    get bearer() {
        return this._bearer;
    }

    set bearer(value) {
        this._bearer = value;
    }

    get username() {
        return this._username;
    }

    set username(value) {
        this._username = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    get roles() {
        return this._roles;
    }

    set roles(value) {
        this._roles = value;
    }
}