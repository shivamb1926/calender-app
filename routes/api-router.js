const express = require("express");

const ApiController = require("../controller/api-controller");

const router = express.Router();

router.get("/meetings/:user", ApiController.getMeetings);
router.get("/delete/:id", ApiController.deleteMeeting);
router.post("/meeting", ApiController.createMeeting);
router.post("/update/:id", (req, res) => {
	ApiController.updateMeeting(req, res);
});

module.exports = router;
