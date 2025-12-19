import { OpenAI } from "openai";
import Product from "../models/product.model.js";
import { Op } from "sequelize";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function handleProductChat(req, res) {
  try {
    const { prompt } = req.body; 

    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an assistant that extracts product filters (brand, category, minPrice, maxPrice, gender) from user text. Ignore the word 'shoes'. Return JSON like: { \"brand\": \"Nike\", \"category\": \"Lifestyle\", \"minPrice\": 50, \"maxPrice\": 200, \"gender\": \"Men\" }"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0
    });

    let extractedFilters = {};
    try {
      const text = completion.choices[0].message.content;
      extractedFilters = JSON.parse(text);
    } catch (err) {
      console.warn("Failed to parse GPT output:", err);
    }

    const { brand, category, minPrice, maxPrice, gender } = extractedFilters;

    const whereClause = {};
    if (brand) whereClause.brand = brand;
    if (category) whereClause.category = category;
    if (gender) whereClause.gender = gender;
    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) whereClause.price[Op.gte] = minPrice;
      if (maxPrice) whereClause.price[Op.lte] = maxPrice;
    }

    const products = await Product.findAll({ where: whereClause });

    res.json({ extractedFilters, products });
  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({ error: "AI product search failed" });
  }
}
