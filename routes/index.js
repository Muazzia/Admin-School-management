const express = require("express");

const { resWrapper } = require("../utils");
const { jwtAuthentication } = require("../middlewares/authentication");

const router = express.Router();


const adminRouter = require("./admin");
const courseRouter = require("./course");
const categoryRouter = require("./category");
const enrollmentRouter = require("./enrollment");
const studnetRouter = require("./student");



router.use("/admin", adminRouter)
router.use("/course", jwtAuthentication, courseRouter)
router.use("/category", jwtAuthentication, categoryRouter)
router.use("/student", jwtAuthentication, studnetRouter)
router.use("/enrollment", jwtAuthentication, enrollmentRouter)



// Global Catch
router.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send(resWrapper("Internal Server Error", 500, null, err))
})


module.exports = router;