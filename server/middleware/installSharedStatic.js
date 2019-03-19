const express = require("express");
const path = require("path");

module.exports = app => {
  app.use(express.static(path.join(__dirname, "../../client/build")));

  app.get("/*", function(req, res) {
    res.sendFile(
      path.join(__dirname, "../../client/build/index.html"),
      function(err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });
};
