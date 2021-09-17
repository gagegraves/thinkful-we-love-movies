const service = require("./reviews.service");
const { paramsCheck, bodyCheck } = require("./reviews.middleware");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res){
    const reviews = await service.list();
    res.status(200).json({ data: reviews });
}

function read(req, res){
    res.status(200).json({ data: res.locals.review });
}

async function put(req, res){
    const { critic_id, review_id } = res.locals.review;
    const update = res.locals.update;
    await service.update(update, review_id);
    const updatedReview = await service.read(review_id);
    const critic = await service.getCritic(critic_id);

    res.status(200).json({ data: {...updatedReview[0], critic: critic[0]} })
}

async function destroy(req, res){
    const { review_id } = res.locals.review;
    await service.destroy(review_id);

    res.sendStatus(204);
}


module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(paramsCheck), read],
    put: [asyncErrorBoundary(paramsCheck), bodyCheck, asyncErrorBoundary(put)],
    delete: [asyncErrorBoundary(paramsCheck), asyncErrorBoundary(destroy)]
}
