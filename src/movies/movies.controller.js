const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { paramsCheck } = require("./movies.middleware");


async function list(req, res){
    const {is_showing} = req.query;
    const data = (is_showing) ? await (await service.listShowing()).splice(0,15) : await service.list();

    res.status(200).json({ data: data });
}

async function read(req, res){
    res.status(200).json({ data: res.locals.movie });
}

async function listReviews(req, res){
    const movieId = res.locals.movie.movie_id;
    const reviews = await service.listReviews(movieId);
    const allReviews = [];

    for (let n=0; n < reviews.length; n++){
        const critic = await service.getCritics(reviews[n].critic_id);
        reviews[n].critic = critic[0];
        allReviews.push(reviews[n]);
    }
    res.status(200).json({ data: allReviews });
}

async function listTheaters(req, res){
    const movieId = res.locals.movie.movie_id;
    const result = await service.listTheaters(movieId);
    res.status(200).json({ data: result });
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(paramsCheck), asyncErrorBoundary(read)],
    listReviews: [asyncErrorBoundary(paramsCheck), asyncErrorBoundary(listReviews)],
    listTheaters: [asyncErrorBoundary(paramsCheck), asyncErrorBoundary(listTheaters)]
}
