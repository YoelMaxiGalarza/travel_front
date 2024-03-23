export default class PermissionResourceFactory{

    constructor(http) {
        this.http = http;
    }

    static create(http){
        return new PermissionResourceFactory(http);
    }

    async getAllPermissions(auth) {
        return await this.http.get("/permission/getAll", auth)
    }
    async createPermission(body,auth){
        return await this.http.post("/permission/create", body, auth)
    }

    async getPermissionById(permissionId,auth) {
        return await this.http.get("/permission?permissionId="+permissionId,auth)
    }
    async deletePermission(permissionId,auth) {
        return await this.http.delete("/permission/delete?permissionId=" + permissionId, null);
    }


    async updatePermission(http, body,auth){
        return await this.http.put("/permission/update", body, auth)
    }

}

