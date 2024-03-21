export class CountryResourceFactory {

    constructor(http) {
        this.http = http;
    }

    static create(http) {
        return new CountryResourceFactory(http);
    }

    async getAllCountries(auth) {
        return await this.http.get("/country/getAll", auth)
    }

    async getById(countryId, auth) {
        return await this.http.get("/country/get?countryId=" + countryId, auth)
    }

    async saveCountry(body, auth) {
        return await this.http.post("/country/save", body, auth)
    }

    async deleteCountry(countryId, auth) {
        return await this.http.delete("/country/delete?countryId=" + countryId, null, auth);
    }

    async updateCountry(http, body, auth) {
        return await this.http.put("/country/update", body, auth)
    }


}