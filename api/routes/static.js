module.exports = function(router) {

  router.get('/', (req, res) => { // http get request to landing page
    res.status(200).json({ // respond with json
      success: true,
      message: "Welcome to the Bionet API.",
      errors: [],
      data: {}
    });
  }); 

};