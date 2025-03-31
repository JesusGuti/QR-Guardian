import {
    checkIfDomainIsSuspicious,
    checkIfDomainIsTyposquatting,
    checkIfTLDIsRare,
    isDomainAServiceToShortenURL
} from "@/services/checkDomainAndSubdomain";

test("Given an URL that contains a normal TLD it should return false", () => {
    const url = 'https://icpc.global/';
    expect(checkIfTLDIsRare(url)).toBe(false);
})

test("Given an URL that contains a suspicious TLD from the list it should return true", () => {
    const url = 'https://estasfeta.life/';
    expect(checkIfTLDIsRare(url)).toBe(true);
});

test("Given an URL that contains a domain from a service that shortens URLs it should return true", () => {
    const shortenURL = 
});

