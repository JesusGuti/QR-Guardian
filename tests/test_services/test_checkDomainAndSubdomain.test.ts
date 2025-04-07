import {
    checkIfDomainIsSuspicious,
    checkIfTLDIsRare,
    isDomainAServiceToShortenURL
} from "@/services/URLServices/checkDomainAndSubdomain";

test("Given an URL that contains a suspicious word in the URL it should return true", () => {
    const url = 'https://chat.atendimento24chatb.com/consultag8?nome=visitante';
    expect(checkIfDomainIsSuspicious(url)).toBe(true);
});

test("Given an URL that contains a normal TLD it should return false", () => {
    const url = 'https://icpc.global/';
    expect(checkIfTLDIsRare(url)).toBe(false);
});

test("Given an URL that contains a suspicious TLD from the list it should return true", () => {
    const url = 'https://estasfeta.life/';
    expect(checkIfTLDIsRare(url)).toBe(true);
});

test("Given an URL that contains a domain from a service that shortens URLs it should return true", () => {
    const shortenURL = 'http://bit.ly/4iIZe6F';
    expect(isDomainAServiceToShortenURL(shortenURL)).toBe(true);
});

test("Given an URL that doesn't contain a domain from a service that shortens URLs it should return false", () => {
    const normalURL = 'https://nestjs.com/';
    expect(isDomainAServiceToShortenURL(normalURL)).toBe(false);
});
