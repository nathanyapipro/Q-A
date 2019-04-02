const queryMap = require("../utils/queryMap.json");

module.exports = app => {
  app.use("/graphql", (req, resp, next) => {
    console.log(req.body);
    if (req && req.body && req.body.query) {
      const isWhitelistedQuery = queryMap[req.body.query] !== undefined;
      if (!isWhitelistedQuery) {
        res.status(403).send(err);
      }
      next();
    }
  });
};
