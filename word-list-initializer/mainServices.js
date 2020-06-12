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
    // console.log('getMoviesToBeUploaded Finished');
    return moviesToBeUploaded;
}

//TODO director 정보를 원본 movies에 추가하고 있다는 점에 유의, 나중에 분리해야함.
//TODO 특수문자 제거나 split등 해줘야 한다.
const extractWordsFromMovies = async(movies)=>{

    const wordsPerMovie = [];

    await asyncForEach(movies,async (curMovie)=>{
        const curMovieId = curMovie.id;
        const words = extractProperNoun(curMovie.overview);

        const result = await getCredits(curMovieId);

        words.push(...result.chracters);
        words.push(...result.actors);

        //단어들에 대해서 특수문자 공백으로 대체하기
        //단어들에 대해서 공백기준으로 분할하기.

        wordsPerMovie.push({
            movieId : curMovieId,
            words : words
        });

        curMovie.director = result.directorName;
    });
    // console.log('extractWords Finished');

    return wordsPerMovie;
}

module.exports = {
    getMoviesToBeUploaded,
    extractWordsFromMovies
}