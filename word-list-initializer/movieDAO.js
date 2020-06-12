
const {MovieModel} = require('./connectRDS');

console.log(typeof MovieModel);

const isMovieAlreadyExist = async(movieId)=>{
    const entry = await MovieModel.findOne({
        where :{
            movie_id : movieId
        },
        raw :true
    });

    if(entry !== null){
        return true;
    }
    else{
        return false;
    }
}

const insertMovieDetail = async(movieDetail)=>{
    const releaseYear = movieDetail.release_date.substring(0,4);
    const result = await MovieModel.create({
        movie_id : movieDetail.id,
        movie_name : movieDetail.title,
        director_name : movieDetail.director,
        release_year : parseInt(releaseYear),
        language : movieDetail.original_language,
        wordset_created : 1
    });
    // console.log(result);
}

module.exports = {
    isMovieAlreadyExist,
    insertMovieDetail
};
