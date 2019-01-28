const express = require('express'); // require express module
const api = express(); // instantiate or start express
const port = 3001; // port the app will listen on

api.get('/', (req, res) => { // http get request to landing page
  res.json({ // respond with json
    success: true,
    message: "Welcome to the Bionet API.",
    errors: [],
    data: {}
  });
});

api.listen(port, () => { // listen on port
  console.log(`API listening on localhost:${port}`);
});