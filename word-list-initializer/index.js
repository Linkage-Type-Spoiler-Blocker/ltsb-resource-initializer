const {getMoviesToBeUploaded, extractWordsFromMovies} = require('./mainServices');
const initialize = require('./connectRDS').initialize;
const {asyncForEach} = require('./utils');
const {insertJSON} = require('./insertJSON');
const {insertMovieDetail} = require('./connectRDS');


exports.handler = async (event) =>{
    const promise = new Promise(async(resolve, reject)=> {
        await initialize();

        const moviesToBeUploaded = await getMoviesToBeUploaded();

        const wordsPerMovie = await extractWordsFromMovies(moviesToBeUploaded);

        await asyncForEach(wordsPerMovie, async(curMovie)=>{
            await insertJSON(curMovie.movieId, curMovie.words);
        });

        await asyncForEach(moviesToBeUploaded, async(curMovieDetail)=>{
            await insertMovieDetail(curMovieDetail);
        });

        resolve(200);
    });
    return promise
}