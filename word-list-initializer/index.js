const initialize = require('./connectRDS').initialize;
const {getMoviesToBeUploaded, extractWordsFromMovies} = require('./mainServices');
const {asyncForEach} = require('./utils');
const {insertJSON} = require('./insertJSON');
const {insertMovieDetail} = require('./movieDAO');


exports.handler = async (event) =>{
    const promise = new Promise(async(resolve, reject)=> {

        await initialize();

        const moviesToBeUploaded = await getMoviesToBeUploaded();

        const wordsPerMovie = await extractWordsFromMovies(moviesToBeUploaded);

        await asyncForEach(wordsPerMovie, async (curMovie) => {
            await insertJSON(curMovie.movieId, curMovie.words);
            // console.log('putObject Finished');
        });

        await asyncForEach(moviesToBeUploaded, async (curMovieDetail) => {
            await insertMovieDetail(curMovieDetail);
            // console.log('putDetail Finished');
        });



        resolve(200);
    });
    return promise
}