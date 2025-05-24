import {onRequest} from "firebase-functions/v2/https";
import axios from "axios";
import * as functions from "firebase-functions";

export const proxyDeezer = onRequest(async (req, res) => {
  try {
    const {q} = req.query;

    if (!q || typeof q !== "string") {
      res.status(400).json({error: "Falta el parámetro 'q'"});
      return;
    }

    const response = await axios.get("https://api.deezer.com/search", {
      params: {q},
    });

    res.status(200).json(response.data);
  } catch (error) {
    functions.logger.error("Error al hacer proxy a Deezer", error);
    res.status(500).json({error: "Error al hacer proxy a Deezer"});
  }
});
