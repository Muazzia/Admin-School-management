const express = require("express");
const { createEnrollment } = require("../controllers/enrollment");
const enrollmentRouter = express.Router();


enrollmentRouter.get("/",);
enrollmentRouter.get("/:id");

enrollmentRouter.post("/", createEnrollment);

enrollmentRouter.put("/:id");
enrollmentRouter.delete("/:id");





module.exports = enrollmentRouter;