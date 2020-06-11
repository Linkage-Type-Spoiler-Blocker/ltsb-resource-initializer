const AWS = require('aws-sdk');

//TODO 일단 이렇게 해보기, 자동으로 config 있을지도 모른다.
const s3 = new AWS.S3();

const bucketName = 'temp';
const dirName = 'tempDir/';

const insertJSON = async(movieId, wordList)=> {
    s3.putObject({
        Bucket: bucketName,
        Key: dirName + movieId + '.json',
        Body: JSON.stringify(wordList),
        ContentType: "application/json"
    });
};

module.exports = {
    insertJSON
}

