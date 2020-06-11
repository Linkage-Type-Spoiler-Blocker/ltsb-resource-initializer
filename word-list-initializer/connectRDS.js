const Sequelize = require('sequelize');

const rdsEndpoint = {
    host : process.env.RDS_HOST,
    port : process.env.RDS_PORT
};

const createMovieModel =(sequelize, DataTypes) =>{
    sequelize.define('movie',{
        movie_id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            allowNull : false
        },
        movie_name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        director_name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        release_year : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        language : {
            type : DataTypes.STRING,
            allowNull : false
        },
        wordset_created : {
            type : DataTypes.INTEGER,
            allowNull : false,
            defaultValue : 0
        }
    },{
        timestamps : false,
        freezeTableName : true
    });
};

const sequelize = new Sequelize(process.env.RDS_DBNAME, process.env.RDS_ID, process.env.RDS_PW,{
    host : rdsEndpoint.host,
    port : rdsEndpoint.port
})

const movieModel = createMovieModel(sequelize,Sequelize);

const isInitialized = false;

module.exports = {
    initialize : (async()=>{
        if(isInitialized === false){
            sequelize.sync();
        }
    }),
    MovieModel : movieModel
}

// initialize가 먼저 실행된다는 보장만 있다면 다른 곳은 다 async가 아니므로 그냥 써도 된다.