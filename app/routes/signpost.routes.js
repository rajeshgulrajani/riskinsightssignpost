module.exports = app => {
    const signpost = require("../controllers/signpost.controller.js");
  
    var router = require("express").Router();
  // a middleware function with no mount path. This code is executed for every request to the router
    router.use(function (req, res, next) {
      console.log('Time:', Date.now() + req)
      next()
    })
    // Retrieve all Tutorials
    router.get("/", signpost.findAll);
    router.get("/id/:id", signpost.findOne);
    router.put("/id/:id", signpost.update);

    // Delete a Tutorial with id
    router.delete("/id/:id", signpost.delete);

    // Retrieve all published Tutorials
    router.post("/", signpost.create);
    router.get("/all",signpost.findSignPostSnapshots)
    router.get("/riskid/:riskcategoryid", signpost.findAllByRiskId);

    app.use('/signpost', router) ;
    
  };