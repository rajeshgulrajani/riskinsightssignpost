module.exports = (sequelize, Sequelize) => {
    const signpostSnapshot = sequelize.define("signpost_snapshots", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      signpost_id: {
        type: Sequelize.UUID
      },
      historicjson: {
        type: Sequelize.JSONB
      },
      simulatedjson: {
        type: Sequelize.JSONB
      },
      no_of_iterations: {
        type: Sequelize.INTEGER,
      },
      no_of_intervals: {
        type: Sequelize.INTEGER,
      },
      snapshot_date: {
        type: Sequelize.DATE
      },
      mean: {
        type: Sequelize.FLOAT
      },
      stddev: {
        type: Sequelize.FLOAT
      },
      error: {
        type: Sequelize.STRING
      },
      freq: {
        type: Sequelize.STRING
      },
      scenario: {
        type: Sequelize.STRING
      }
    });
  
    return signpostSnapshot;
  };