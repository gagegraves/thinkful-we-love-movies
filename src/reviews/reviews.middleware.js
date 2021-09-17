const service = require("./reviews.service");

async function paramsCheck(req, res, next){
    const { reviewId } = req.params;
    const match = await service.read(reviewId);
    if (match.length === 0 || !reviewId) return next({ status: 404, message: "Review cannot be found." });
    res.locals.review = match[0];

    next();
}

function bodyCheck(req, res, next){
    const { data: { score = null, content = null } = {} } = req.body;
    let updateObj = {};
    if (!score && !content) return next({ status: 400, message: "Missing score or content in body" });

    if (score) updateObj.score = score;
    if (content) updateObj.content = content;
    res.locals.update = updateObj;

    next();
}

module.exports = {
    paramsCheck,
    bodyCheck
}
