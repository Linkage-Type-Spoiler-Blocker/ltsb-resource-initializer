const axios = require('axios');
const {cleanString} = require('./utils');

const apiKey = process.env.TMDB_API_KEY;

const getPopularMovies = async()=>{
    const url = 'https://api.themoviedb.org/3/movie/popular';
    const response = await axios.get(url, {
        params: {
            api_key : apiKey,
            page : 1
        }
    });
    console.log('getPopularMovies Finished');

    return response.data.results;
    //TODO 여기서 필요한 부분만 걸러서 주기?
}

const getCredits = async(movieId)=>{
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`
    const response = await axios.get(url,{
        params : {
            api_key : apiKey
        }
    });

    const {cast,crew} = response.data;

    //TODO director이 여러명일 가능성도 고려해야함.
    const result = {
        directorName : "",
        chracters : [],
        actors : []
    };

    cast.forEach((curCast)=>{
        const cleanActorNames = cleanString(curCast.name);
        const cleanCharacterNames = cleanString(curCast.character);
        result.actors.push(...cleanActorNames);
        result.chracters.push(...cleanCharacterNames);
    });

    crew.forEach((curCrew)=>{
        if(curCrew.job === "Director"){
            // 얘는 cleanString 적용하지 맙시다.
            result.directorName  = curCrew.name.toLowerCase();
        }
    });

    return result;
}

// const getMovieDetail = async(movieId)=>{
//     const url = 'https://api.themoviedb.org/3/movie/' + movieId;
//     return axios.get(url,{
//        params: {
//            api_key : apiKey
//        }
//     });
// }


module.exports = {
    getPopularMovies,
    getCredits
}