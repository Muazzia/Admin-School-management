const express = require("express");
const { resWrapper } = require("../utils");

const router = express.Router();


const adminRouter = require("./admin");
const courseRouter = require("./course");
const categoryRouter = require("./category");
const enrollmentRouter = require("./enrollment");

router.use("/admin", adminRouter)
router.use("/course", courseRouter)
router.use("/category", categoryRouter)
router.use("/enrollment", enrollmentRouter)



// Global Catch
router.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send(resWrapper("Internal Server Error", 500, null, err))
})


module.exports = router;