
const {MovieModel} = require('./connectRDS');

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
    MovieModel.create({
        movie_id : movieDetail.id,
        movie_name : movieDetail.title,
        director_name : movieDetail.director,
        release_year : parseInt(releaseYear),
        language : movieDetail.original_language,
        wordset_created : 1
    });
}

module.exports = {
    isMovieAlreadyExist,
    insertMovieDetail
};
