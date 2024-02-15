const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers["authorization"].split(" ")[1];

    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized User!",
          err,
        });
      } else {
        
        req.body.id = decode._id;
        next();
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Unauthorized Access!",
      error,
    });
  }
};
