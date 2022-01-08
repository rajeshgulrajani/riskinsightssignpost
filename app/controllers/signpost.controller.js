const db = require("../models");
const SignPost = db.signPost;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  console.log(req);
    // Validate request
    if (!req.body.id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    const signpost = {
     id: req.body.id,
     riskcategoryid: req.body.riskcategoryid,
     type: req.body.type,
     desc: req.body.desc,
     parameters: req.body.parameters,
     noofiterations: req.body.noofiterations,
     timeframe: req.body.timeframe,
     date_last_run: req.body.date_last_run,
     date_next_run: req.body.date_next_run ,
     optValue:req.body.optValue,
     pessValue:req.body.pessValue
   
    };
  
    // Save Tutorial in the database
    SignPost.create(signpost)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  };


  // Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  
  SignPost.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

  // Retrieve all Tutorials from the database.
  exports.findAllByRiskId = (req, res) => {
  
    const riskcategoryid = req.params.riskcategoryid;
    SignPost.findAll({where: {
      riskcategoryid: riskcategoryid
      },
      })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };
  // Retrieve all Tutorials from the database.
  exports.findSignPostSnapshots = (req, res) => {
  
    SignPost.findAll(
      {
        include: [{
          model: db.signpostSnapshot,
          required: false
         }],
         order: [
           [db.signpostSnapshot, 'createdAt', 'DESC']
         ]
      }
    )
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };
  
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  SignPost.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  SignPost.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "SignPost was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  SignPost.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};
