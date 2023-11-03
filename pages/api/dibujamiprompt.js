// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
import Replicate from "replicate";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ error: "This request is not accepted" });
    return;
  }

  //obtener el prompt del cliente
  const body = req.body;
  const prompt = body.prompt;

  try {
    //generar una imagen utilizando el prompt y replicate
    const replicateAPI = process.env.REPLICATE_API;
    const replicate = new Replicate({
      auth: replicateAPI,
    });

    const output = await replicate.run(
      "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
      {
        input: {
          prompt: prompt,
        },
      }
    );

    const imageUrl = output[0];

    res.status(200).json({
      imageUrl: imageUrl,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
