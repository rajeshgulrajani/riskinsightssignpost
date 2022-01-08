module.exports = (sequelize, Sequelize) => {
    const signPost = sequelize.define("signpost", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      riskcategoryid: {
        type: Sequelize.INTEGER
      },
      desc: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.INTEGER
      },
      parameters: {
        type: Sequelize.JSONB
      },
      noofiterations: {
        type: Sequelize.INTEGER,
      },
      timeframe: {
        type: Sequelize.INTEGER,
      },
      date_last_run: {
        type: Sequelize.DATE
      },
      date_next_run: {
        type: Sequelize.DATE
      },
      optValue: {
        type: Sequelize.FLOAT
      },
      pessValue: {
        type: Sequelize.FLOAT
      }
    });
  
    return signPost;
  };