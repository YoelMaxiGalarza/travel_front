export class UserSession{
    constructor(){
        this.authorization = null;
        this.user = null;
        this.roles= [];
        this.permissions = [];
    }
}