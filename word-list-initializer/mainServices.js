const extractProperNoun = require('./extractProperNoun');
const {getCredits,getPopularMovies} = require('./requestTMDB');
const {asyncForEach} = require('./utils');
const {isMovieAlreadyExist} = require('./movieDAO');

const getMoviesToBeUploaded = async()=>{
    const popularMovies = await getPopularMovies();

    const moviesToBeUploaded = [];
    await asyncForEach(popularMovies, async(curMovie)=>{
        const isExist = await isMovieAlreadyExist(curMovie.id);
        if(isExist === false){
            moviesToBeUploaded.push(curMovie);
        }
    });
    return moviesToBeUploaded;
}

//TODO director 정보를 원본 movies에 추가하고 있다는 점에 유의, 나중에 분리해야함.
const extractWordsFromMovies = async(movies)=>{

    const wordsPerMovie = [];

    await asyncForEach(movies,async (curMovie)=>{
        const curMovieId = curMovie.id;
        const words = extractProperNoun(curMovie.overview);

        const result = await getCredits(curMovieId);

        words.push(...result.chracters);
        words.push(...result.actors);

        wordsPerMovie.push({
            movieId : curMovieId,
            words : words
        });

        curMovie.director = result.directorName;
    });

    return wordsPerMovie;

}

module.exports = {
    getMoviesToBeUploaded,
    extractWordsFromMovies
}