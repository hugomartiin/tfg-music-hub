import { onRequest } from "firebase-functions/v2/https";
import axios from "axios";
import * as functions from "firebase-functions";

export const proxyDeezer = onRequest(async (req, res) => {
  // Cabeceras CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  // Si es una petición preflight (OPTIONS), responde directamente
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    const url = req.originalUrl.replace(/^\/proxyDeezer\/?/, '');
    const response = await axios.get(`https://api.deezer.com/${url}`, {
  params: req.query
});

    res.status(200).json(response.data);
  } catch (error) {
    functions.logger.error("Error al hacer proxy a Deezer", error);
    res.status(500).json({ error: "Error al hacer proxy a Deezer" });
  }
});  