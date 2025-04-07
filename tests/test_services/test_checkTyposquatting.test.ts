import {
    checkIfDomainIsTyposquatting,
    checkIfSubdomainPartsAreTyposquatting
} from "@/services/URLServices/checkTyposquattingInURL"
import {
    typosquattedURLs,
    typosquattedInSubdomainURLs,
    nonTyposquattedURLs
} from "./test_services_data/typosquattedURLs";

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
    });
});
