const pos = require('pos');
const {cleanString} = require('./utils');

const lexer = new pos.Lexer();
const tagger = new pos.Tagger();

module.exports = (str)=>{
    const curWords = lexer.lex(str);
    const taggedWords = tagger.tag(curWords);

    const resultWords = [];

    for (let i in taggedWords) {
        const taggedWord = taggedWords[i];

        const curTag = taggedWord[1];
        const curWord = taggedWord[0];
        const cleanWords = cleanString(curWord);

        if(curTag === "NNP"||curTag === "NNPS"){
            resultWords.push(...cleanWords);
        }
    }
    return resultWords;
}