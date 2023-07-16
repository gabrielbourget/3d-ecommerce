import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const { OPENAI_API_KEY } = process.env;

const router = express.Router();

const config = new Configuration({
  apiKey: OPENAI_API_KEY,
})

const openAI = new OpenAIApi(config);

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from imagegen routes"});
});

router.route("/").post(async (req, res) => {

  try {
    const { prompt } = req.body;

    const response = await openAI.createImage({
      prompt, n: 1,
      size: "1024x1024",
      response_format: "b64_json"
    });

    const image = response.data.data[0].b64_json;

    res.status(200).json({ photo: image });
    
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: "something went wrong when generating your image" });
  }
});

export default router;
