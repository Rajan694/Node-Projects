const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001; // Make sure this port is different from your React server port
const axios = require("axios");
const cheerio = require("cheerio");

app.use(cors()); // Enable CORS for your React app to make requests to this server
const BASE_URL = "https://www.amazon.in";

async function fetchPage(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      },
    });
    // console.log(`Fetched page: ${url}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching the page: ${error}`);
    return null;
  }
}

function extractSmartphoneData(html) {
  const $ = cheerio.load(html);
  const smartphoneData = [];

  $('div.s-main-slot div[data-component-type="s-search-result"]').each(
    (index, element) => {
      const title = $(element).find("h2 a span").text().trim();

      const price = "₹" + $(element).find(".a-price-whole").text().trim();
      const img = $(element).find("img").attr("src");
      const link = BASE_URL + $(element).find("h2 a").attr("href");

      if (title) {
        smartphoneData.push({ title, price, link, img });
      }
    }
  );
  console.log(smartphoneData[0]);
  return smartphoneData;
}

app.get("/search", async (req, res) => {
  const { q } = req.query; // Assume a query parameter 'q' is sent with the search keyword
  const searchUrl = `${BASE_URL}/s?k=${encodeURIComponent(q)}`;
  const pageHtml = await fetchPage(searchUrl);
  if (pageHtml) {
    const data = extractSmartphoneData(pageHtml);
    console.log(data);
    res.json(data);
  } else {
    res.status(500).send("Error fetching data");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
