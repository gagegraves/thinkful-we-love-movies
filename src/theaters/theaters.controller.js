const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./theaters.service");

async function list(req, res){
    const theaters = await service.list();
    const theatersAndMovies = [];

    for (let n=0; n < theaters.length; n++){
        const { theater_id } = theaters[n];
        const movies = await service.getMovies(theater_id);
        const TM = { ...theaters[n], movies: movies };
        theatersAndMovies.push(TM);
    }
    res.status(200).json({ data: theatersAndMovies });
}

module.exports = {
    list: [asyncErrorBoundary(list)]
}
