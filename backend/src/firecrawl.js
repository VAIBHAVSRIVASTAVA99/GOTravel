const FirecrawlApp =require( '@mendable/firecrawl-js')
const dotenv =require('dotenv');

dotenv.config();

async function scrapeWebsite(url) {
  try {
    const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });
    const crawlResponse = await app.crawlUrl(url, {
      limit: 100,
      scrapeOptions: {
        formats: ['markdown', 'html'],
      }
    });

    if (!crawlResponse.success) {
      throw new Error(`Failed to crawl: ${crawlResponse.error}`);
    }

    console.log("Scraped Data:", crawlResponse);
    return crawlResponse; 
  } catch (error) {
    console.error("Error during web scraping:", error.message);
  }
}

// Example usage
scrapeWebsite('https://firecrawl.dev');
