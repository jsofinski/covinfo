export class Summary {
    country: string;
    countryCode: string;
    totalConfirmed: number;
    totalDeaths: number;


    constructor(country: string, countryCode: string, totalConfirmed: number, totalDeaths: number) {
        this.country = country;
        this.countryCode = countryCode;
        this.totalDeaths = totalDeaths;
        this.totalConfirmed = totalConfirmed;
    }
}
