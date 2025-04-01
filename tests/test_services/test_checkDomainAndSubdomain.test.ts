import {
    checkIfDomainIsSuspicious,
    checkIfDomainIsTyposquatting,
    checkIfSubdomainPartsAreTyposquatting,
    checkIfTLDIsRare,
    isDomainAServiceToShortenURL
} from "@/services/checkDomainAndSubdomain";
import {
    typosquattedURLs,
    typosquattedInSubdomainURLs,
    nonTyposquattedURLs
} from "./test_services_data/typosquattedURLs";


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

test("Given a typosquatted URL that changes at least 1 character it should return true", () => {
    const typosquattedURL = 'http://7spotify.com';
    expect(checkIfDomainIsTyposquatting(typosquattedURL)).toBe(true)
});

test("Given a combined typosquatted URL it should return true", () => {
    // This URL is a problem because the domain is a composition of two words
    const typosquattedURL = 'http://account.instagramfacebook.click'
    expect(checkIfDomainIsTyposquatting(typosquattedURL)).toBe(true);
});

test("Given a large domain typosquatted in a URL ", () => {
    const typosquattedURL = 'https://steanmscommnuity.com';
    expect(checkIfDomainIsTyposquatting(typosquattedURL)).toBe(true);
});

test("Given a URL that contains a typosquatted subdomain it should return true", () => {
    const typosquattedSubdomainURL = 'https://aappleteamcommunitysupport.pages.dev/';
    expect(checkIfSubdomainPartsAreTyposquatting(typosquattedSubdomainURL)).toBe(true);
});

test("Given an array of typosquatted URLs all of them should return true", () => {
    typosquattedURLs.forEach((url) => {
        expect(checkIfDomainIsTyposquatting(url)).toBe(true);
    });
});

test("Given an array of typosquatted in subdomain URLs all of them should return true", () => {
    typosquattedInSubdomainURLs.forEach((url) => {
        expect(checkIfSubdomainPartsAreTyposquatting(url)).toBe(true);
    });
});

test("Given an array of non typosquatted URLs all of them should return false ", () => {
    nonTyposquattedURLs.forEach((url) => {
        expect(checkIfDomainIsTyposquatting(url)).toBe(false);
        expect(checkIfSubdomainPartsAreTyposquatting(url)).toBe(false);
    })
})
