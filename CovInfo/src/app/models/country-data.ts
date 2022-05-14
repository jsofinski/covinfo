import { DateData } from "./date-data";

export class CountryData {
    country: string;
    countryCode: string;
    dateData: Array<DateData>;


    constructor(country: string, countryCode: string) {
        this.country = country;
        this.countryCode = countryCode;
        this.dateData = new Array<DateData>();
    }

    addDateData(dateData: DateData) {
        this.dateData.push(dateData);
    }
}
