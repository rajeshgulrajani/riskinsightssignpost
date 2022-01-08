const db = require("../models");
const SignpostSnapshot = db.signpostSnapshot;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
// Find a single Tutorial with an id
exports.findSnapshot = (req, res) => {
    const id = req.params.id;
  
    SignpostSnapshot.findOne({
      where: {
      id: id
      },
      include: [{
        model: db.signPost,
        required: false
       }],
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id + err
        });
      });
  };

  // Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  
  SignpostSnapshot.findAll()
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
  exports.findSnapshots = (req, res) => {
    const signpostid = req.params.signpostid;
    SignpostSnapshot.findAll({where: {
      signpost_id: signpostid
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
  exports.findLatestSnapshots = (req, res) => {
    const signpostid = req.params.signpostid;
    SignpostSnapshot.findOne({
      limit: 1,
//      attributes: ['id', 'signpost_id'],
      where: {
      signpost_id: signpostid
      },
      include: [{
        model: db.signPost,
        required: false
       }],
      order: [ [ 'snapshot_date', 'DESC' ]]
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


