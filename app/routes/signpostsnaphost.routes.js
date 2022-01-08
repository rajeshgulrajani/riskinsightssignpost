module.exports = app => {
    const signpostSnapshot = require("../controllers/signpostsnapshot.controller.js");
  
    var router = require("express").Router();
  // a middleware function with no mount path. This code is executed for every request to the router
    router.use(function (req, res, next) {
      console.log('Time:', Date.now() + req)
      next()
    })
    // Retrieve all Tutorials
    //router.get("/", signpostSnapshot.findAll);
    // Retrieve all published Tutorials
    router.get("/snapshot/:id", signpostSnapshot.findSnapshot);
    router.get("/snapshots/:signpostid", signpostSnapshot.findSnapshots);
    
    router.get("/latestsnapshots/:signpostid", signpostSnapshot.findLatestSnapshots);

    app.use('/signpost', router) ;
  };