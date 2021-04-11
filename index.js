require("dotenv").config(); // load DB config from .env file
const express = require("express");
const { getRecords } = require("./controllers/recordCtrl");
const mongoose = require("mongoose");
const app = express();
const { body, validationResult } = require("express-validator");
const { validateCount, validateDate, ERRORS } = require("./utils/validators");

const PORT = process.env.PORT || 5000;
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("working! send POST request to /api/records");
});

app.post(
  "/api/records",
  [
    body("maxCount").custom(validateCount),
    body("minCount").custom(validateCount),
    body("startDate").custom(validateDate),
    body("endDate").custom(validateDate),
  ],
  async (req, res) => {
    //Error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let listOfErrors = errors.array();
      if (listOfErrors.length === 1) {
        let err = listOfErrors.pop();
        let errorType = err.msg.split(":")[0];
        let errorCode = ERRORS[errorType];
        return res.status(400).json({
          code: errorCode,
          msg: errorType,
          errors: errors.array(),
        });
      }
      return res.status(400).json({
        code: ERRORS.Mixed,
        msg: "MixedErrorType",
        errors: errors.array(),
      });
    }
    // Access and Use body items
    const { startDate, endDate, minCount, maxCount } = req.body;
    let records = await getRecords(startDate, endDate, minCount, maxCount);

    return res.json({ code: 0, msg: "Success", records: records });
  }
);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.error("Database connection failed", err.message);
    }
    console.log("Database connected");
    // Start Express server after we have confirmed Database has connected
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  }
);
