export default class RoleResourceFactory{

        constructor(http) {
            this.http = http;
        }

        static create(http){
            return new RoleResourceFactory(http);
        }

        async getAllRoles(auth) {
            return await this.http.get("/roles/getAll", auth)
        }

        async deleteRole(roleId,auth) {
            return await this.http.delete("/roles/delete?roleId=" + roleId,null, auth);
        }

        async createRole(body,auth){
            return await this.http.post("/roles/create", body, auth)
        }

        async updateRole(http, body,auth){
            return await this.http.put("/roles/update", body, auth)
        }

    async getRole(roleId, auth) {
        return await this.http.get("/roles/get?roleId="+roleId, auth)
    }
}