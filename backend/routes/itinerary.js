const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { FirecrawlApp } = require("@mendable/firecrawl-js");
require("dotenv").config();

const itineraryRouter = express.Router();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function scrapeWebsite(url) {
    try {
        const firecrawl = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });
        const crawlResponse = await firecrawl.crawlUrl(url, {
            limit: 5,
            scrapeOptions: { formats: ['markdown'] }
        });

        if (!crawlResponse.success) {
            throw new Error(`Failed to crawl: ${crawlResponse.error}`);
        }

        return crawlResponse.data.map(item => item.content);
    } catch (error) {
        console.error("Error during web scraping:", error.message);
        return [];
    }
}

itineraryRouter.post("/generate-itinerary", async (req, res) => {
    const { location, days } = req.body;

    try {
        const prompt = `Generate a well-organized ${days}-day travel itinerary for ${location}.
        - Each day's heading should be clearly mentioned.
        - Each day’s activities should be listed in a structured manner.
        - Do not use bullet points, just structured text.
        - Keep it concise and readable.
        `;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        let itineraryText = result.response.text() || "No itinerary generated.";

        
        itineraryText = itineraryText.replace(/[*-]/g, "").trim();

        
        itineraryText = itineraryText.replace(/(Day \d+:)/g, "$1");

        
        const itineraryArray = itineraryText.split("\n").filter(line => line.trim() !== "");

        
        const extraInfo = await scrapeWebsite(`https://www.google.com/search?q=travel+guide+${location}`);

        res.json({ itinerary: itineraryArray, extraInfo });

    } catch (err) {
        console.error("Error generating itinerary:", err.message);
        res.status(500).json({ message: "Failed to generate itinerary" });
    }
});

module.exports = itineraryRouter;
