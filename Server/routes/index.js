const apiRoutes = require("../routes/showID");

const constructorMethod = (app) => {
  app.use("/accounts", apiRoutes);
  app.use("/health", (req, res) => {
    res.status(200).json();
  });
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
