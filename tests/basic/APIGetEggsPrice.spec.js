import { test, expect, request } from "@playwright/test";
const { JSDOM } = require('jsdom');

test("Get Eggs Price", async () => {
    // Create a new API context for making HTTP requests
    const apiContext = await request.newContext()
    
    // Make a GET request to fetch egg prices from a Vietnamese website
    const res = await apiContext.get("https://trungsonglong.com/bang-gia-trung-ga-tuoi-trung-vit-tuoi-hom-nay-10-11-2023/")
    
    // Verify the response is OK (status 200)
    expect(res).toBeOK()
    
    // Get the HTML content from the response
    const resBody = await res.text();
    
    // Create a DOM parser to parse the HTML string
    const dom = new JSDOM(resBody);
    const document = dom.window.document;

    // Find all h3 elements in the document
    const h3Elements = document.querySelectorAll('h3');
    const eggPrices = [];

    // Loop through h3 elements and find ones containing "Trứng gà tươi" (Fresh chicken eggs)
    h3Elements.forEach(element => {
        const text = element.textContent.trim();
        if (text.includes('Trứng gà tươi')) {
            eggPrices.push(text);
        }
    });

    // Print the list of egg prices found
    console.log('✅ Danh sách giá trứng:'); // "List of egg prices:" in Vietnamese
    console.log(eggPrices);
})