export class DateData {
    date: Date;
    active: number;
    confirmed: number;
    deaths: number;
    recovered: number;
    newConfirmed: number;
    newDeaths: number;
    newRecovered: number;


    constructor(date: Date, active: number, confirmed: number, recovered: number, deaths: number) {
        this.date = date;
        this.active = active;
        this.confirmed = confirmed;
        this.recovered = recovered;
        this.deaths = deaths;

        this.newConfirmed = -1;
        this.newDeaths = -1;
        this.newRecovered = -1;
    }


    setNewConfirmed(lastConfirmed: number) {
        this.newConfirmed = this.confirmed - lastConfirmed;
    }

    setNewDeaths(lastDeaths: number) {
        this.newDeaths = this.deaths - lastDeaths;
    }

    setNewRecovered(lastRecovered: number) {
        this.newRecovered = this.recovered - lastRecovered;
    }
    setActive(lastActive: number) {
        this.active = this.active - lastActive;
    }
}

