const cheerio = require("cheerio");
const { response } = require("express");
const openai = require("openai");
const dotenv = require("dotenv").config();


let body;

fetch("https://www.wsj.com/finance")
  .then((response) => {
    return response.text(); // or response.json() if the response is JSON
  })
  .then((body) => {
    const $ = cheerio.load(body)
    main($);
  });


async function main($){
  let link_data = $("a.e1sf124z13");
  let urls = [];
  for(i = 0; i < link_data.length; ++i){
    urls.push({"url": link_data.eq(i).attr("href"), "title":link_data.eq(i).text() });
    console.log(urls[i]);
  }

  const api_key = process.env.API_KEY7;

  const chatbot = new openai.OpenAI({apiKey:api_key});
  
  // for(i = 0; i < 1; ++i){
  //   fetch(urls[i]["url"]).then(
  //     async response => {
  //       site_data = await response.text();
  //       console.log(site_data);
  //       const chat_response = await chatbot.chat.completions.create({model: "gpt-3.5-turbo",messages: [{"role":"user",
  //         "content":"can you please write a 3 sentence summary about the following article?" + site_data}]});
  //       console.log(chat_response.choices[0]);
  //     }
      
  //   )
  // }

}