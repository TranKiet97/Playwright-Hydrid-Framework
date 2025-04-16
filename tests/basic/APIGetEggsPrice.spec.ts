import { test, expect, request } from "@playwright/test";
import { JSDOM } from 'jsdom';

test("Get Eggs Price", async () => {
    try {
        // Create a new API context for making HTTP requests
        const apiContext = await request.newContext();
        
        // Make a GET request to fetch egg prices
        const baseUrl = "https://trungsonglong.com";
        const res = await apiContext.get(`${baseUrl}/bang-gia-trung-ga-tuoi-trung-vit-tuoi-hom-nay`);
        
        // Verify the response is OK (status 200)
        expect(res).toBeOK();
        
        // Get the HTML content from the response
        const resBody = await res.text();
        
        // Create a DOM parser to parse the HTML string
        const dom = new JSDOM(resBody);
        const document = dom.window.document;

        // Find all h3 elements in the document
        const h3Elements = document.querySelectorAll('h3');
        const eggPrices: string[] = [];

        // Loop through h3 elements and find ones containing "Trứng gà tươi" (Fresh chicken eggs)
        h3Elements.forEach((element: Element) => {
            const text = element.textContent?.trim() || '';
            if (text.includes('Trứng gà tươi')) {
                eggPrices.push(text);
            }
        });

        // Verify we found at least one price
        expect(eggPrices.length).toBeGreaterThan(0);
        if (eggPrices.length === 0) {
            console.warn('No egg prices found on the page');
        }

        // Print the list of egg prices found
        console.log('✅ Danh sách giá trứng:');
        console.log(eggPrices);
    } catch (error) {
        console.error('❌ Error fetching egg prices:', error);
        throw error;
    }
});