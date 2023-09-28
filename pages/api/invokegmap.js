const axios = require("axios");

export default function handler(req, res) {
  let host = req.headers.host;
  let params = req.headers["x-invoke-query"];
  let q = JSON.parse(decodeURIComponent(params));
  let queryString = new URLSearchParams(q).toString();
  if (
    host.includes("impactco2.fr") ||
    host.includes("deploy-preview-429--impactco2.netlify.app") ||
    host.includes("develop--impactco2.netlify.app") ||
    host.includes("monimpacttransport.fr")
  ) {
    return axios
      .get(`https://maps.googleapis.com/maps/api/distancematrix/json?${queryString}&key=${process.env.GMAP_API_KEY}`)
      .then((resp) => ({
        statusCode: 200,
        body: JSON.stringify(resp.data),
      }));
  } else {
    return res.status(401).json(JSON.stringify("Unauthorized"));
  }
}
