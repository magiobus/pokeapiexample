// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ error: "This request is not accepted" });
    return;
  }

  //obtener el pokemon del cliente
  const body = req.body;
  const pokemon = body.pokemon;

  //mandar el body a el pokemon api usando axios async await
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  try {
    //enviar url a pokeapi y esperar la respuesta
    const response = await axios.get(url);
    const pokeInfo = response.data;

    const { order, stats, sprites } = pokeInfo;

    const pokeData = {
      name: pokemon,
      order,
      spriteDefault: sprites.front_default,
      stats,
    };

    res.status(200).json(pokeData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
