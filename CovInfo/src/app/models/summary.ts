type Summary = {
    cases: number;
    deaths: number;
}

export type CountrySummary = {
    country: string;
    countryCode: string;
} & Summary;

export default Summary;