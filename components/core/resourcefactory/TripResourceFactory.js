export default class TripResourceFactory {

    constructor(http){
        this.http = http;
    }
    static create(http){
        return new TripResourceFactory(http);
    }

    async getAllTrips(auth) {
        return await this.http.get("/trip/getAll", auth)
    }

    async getMyTrips(auth) {
        return await this.http.get("/trip/getMyTrips", auth)
    }

    async deleteTrip(tripId, auth) {
        return await this.http.delete("/trip/delete?tripId=" + tripId,null, auth);
    }

    async createTrip(body, auth) {
        return await this.http.post("/trip/create", body, auth)
    }

    async updateTrip(http, body, auth) {
        return await this.http.put("/trip/update", body, auth)
    }

}