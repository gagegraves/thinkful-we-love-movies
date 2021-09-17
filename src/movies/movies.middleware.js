const service = require("./movies.service");

async function paramsCheck(req, res, next){
    const { movieId } = req.params;
    const match = await service.read(Number(movieId));
    if (match.length === 0 || !movieId) return next({ status: 404, message: `movieId: ${movieId} does not exist in the database` });
    res.locals.movie = match[0];
    next();
}

module.exports = {
    paramsCheck
}
