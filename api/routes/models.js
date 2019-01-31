const Fetch = require('../modules/fetch');
const ApiAccess = require("../modules/apiAccess");

module.exports = function(api) {

  // wildcard create
  api.post('/:modelPlural/new', ApiAccess.userRequired, validateModelParam, (req, res) => {
    let Model = res.locals.Model;
    let newRecord = new Model(req.body);
    newRecord.save()
    .then(data => {
      let jsonResponse = {
        success: true,
        message: "Success - data retrieved from Bionet Centralized Database",
        error: {},
        data
      };
      res.status(200).json(jsonResponse);
    })
    .catch(error => {
      let jsonResponse = {
        success: false,
        message: `Fail - problem creating new ${Model}`,
        error,
        data: {}
      };
      res.status(500).json(jsonResponse);
    })  
  });

  // wildcard update
  api.put('/:modelPlural/:recordId/edit', ApiAccess.userRequired, validateModelParam, (req, res) => {
    let Model = res.locals.Model;
    let jsonResponse;   
    // param 1 - {_id: req.params.recordId} - the id for the findOne
    // param 2 - req.body? // if the full object is submitted in the form(req.body)
    newRecord.findByIdAndUpdate(req.params.recordId, req.body) 
    .then(data => {
      jsonResponse = {
        message: "Success = data updated",
        error: {},
        data      
      };
      res.status(200).json(jsonResponse);                  
    })
    .catch((error) => {
      jsonResponse = {
        message: "Fail - there was a problem updating the record",
        error,
        data: {}     
      };
      res.status(500).json(jsonResponse);  
    });
  });

  // wildcard delete
  api.delete('/:modelPlural/:recordId/remove', ApiAccess.userRequired, validateModelParam, (req, res) => {
    let Model = res.locals.Model;
    let jsonResponse;
    Model.findOneAndDelete({_id: req.params.recordId}).exec(error => {
      if (error) {
        jsonResponse = {
          message: "There was a problem removing the record.",
          error,
          data: {}
        };
        res.status(500).json(jsonResponse);
      } else {
        jsonResponse = {
          message: "The record was successfully removed.",
          error: {},
          data: {}
        };
        res.status(200).json(jsonResponse);
      }
    });         
  });

  // wildcard get one route
  api.get("/:modelPlural/:recordId", validateModelParam,  (req, res) => {

      Fetch.fetchOne(res.locals.Model, req.params.recordId)
      .then((result) => {
        let jsonResponse = {
          message: "Success - data retrieved from Bionet Centralized Database",
          error: {},
          data: result
        };
        res.json(jsonResponse);
      })
      .catch((error) => {
        let message;
        let statusCode;
        if (error.name === 'CastError'){
          statusCode = 404;
          message = `Record with _id ${error.value} not found`;
        } else {
          statusCode = 500;
          message = "An error occurred."
        }
        let jsonResponse = {
          message,
          error,
          data: {}
        };
        res.status(statusCode).json(jsonResponse);
      });

 
  });      

  // wildcard get all route
  api.get("/:modelPlural", validateModelParam, (req, res) => {
    Fetch.fetchAll(res.locals.Model)
    .then((result) => {
      let jsonResponse = {
        message: "Success",
        error: {},
        data: result
      };
      res.status(200).json(jsonResponse);
    })
    .catch((error) => {
      let jsonResponse = {
        message: "There was an error",
        error,
        data: []
      };
      res.status(500).json(jsonResponse);      
    });
  });




};

// this middleware catches the request if the :modelPlural parameter does not match a valid model and returns the error
function validateModelParam(req, res, next) {
  let modelNames = ['User', 'Lab', 'Physical', 'Container', 'Virtual'];
  let modelPlural = req.params.modelPlural;
  let modelName = modelPlural[0].toUpperCase() + modelPlural.slice(1, modelPlural.length - 1);
  let modelExists = modelNames.indexOf(modelName) > -1;
  if (modelExists) {
    let Model = require(`../models/${modelName}`);
    res.locals.Model = Model;
    next();
  } else {
    let message = `The route parameter requested, ${modelPlural} does not have a matching model ${modelName}`;
    let error = new Error(message);
    let jsonResponse = {
      message,
      error,
      data: {}
    };
    res.status(404).json(jsonResponse);
  }
}