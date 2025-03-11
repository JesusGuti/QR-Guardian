import { 
    checkIfThereAreHops,
    checkIfIsValidURL,
    areOriginalUrlAndHoppedSimilar
} from "@/services/checkUrl";

test("Given an URL that starts with https:// it should be a valid URL", () => {
    expect(checkIfIsValidURL("https://www.youtube.com/watch?v=4XTkiudd-_E")).toBe(true);
});

test("Given an URL that starts with http:// it should be a valid URL", () => {
    expect(checkIfIsValidURL("http://commons.wikimedia.org")).toBe(true);
});

test("Given an URL that doesn't follow the structure it is not a valid URL", () => {
    expect(checkIfIsValidURL("www.ejemplo.com")).toBe(false);
});

test("Given a shorten URL it should return a redirect URL from hops", async () => {
    const hoppedUrl = await checkIfThereAreHops("https://tinyurl.com/como-funcionan-los-qr");
    expect(hoppedUrl).toBe("https://www.youtube.com/watch?v=4XTkiudd-_E");
});

test("Given a normal URL it should return a redirect URL that shares structure with the original", async () => {
    const originalUrl = "https://github.com/JesusGuti/QR-Guardian/pull/4"
    const hoppedUrl = await checkIfThereAreHops(originalUrl);
    expect(areOriginalUrlAndHoppedSimilar(originalUrl, hoppedUrl)).toBe(true)
})
