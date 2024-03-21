export default class RoleResourceFactory{

        constructor(http) {
            this.http = http;
        }

        static create(http){
            return new RoleResourceFactory(http);
        }

        async getAllRoles(auth) {
            return await this.http.get("/role/getAll", auth)
        }

        async deleteRole(roleId,auth) {
            return await this.http.delete("/role/delete?roleId=" + roleId, null);
        }

        async createRole(body,auth){
            return await this.http.post("/role/create", body, auth)
        }

        async updateRole(http, body,auth){
            return await this.http.put("/role/update", body, auth)
        }
}