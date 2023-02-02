const axios = require('axios')

exports.handler = function (event) {
  console.log(event)
  if (true) {
    return axios
      .get(
        `https://maps.googleapis.com/maps/api/distancematrix/json?${event.rawQuery}&key=${process.env.GMAP_API_KEY}`
      )
      .then((res) => ({
        statusCode: 200,
        body: JSON.stringify(res.data),
      }))
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify('Unauthorized'),
    }
  }
}
