const pos = require('pos');

const lexer = new pos.Lexer();
const tagger = new pos.Tagger();

module.exports = (str)=>{
    const curWords = lexer.lex(str);
    const taggedWords = tagger.tag(curWords);

    const resultWords = [];

    for (let i in taggedWords) {
        const taggedWord = taggedWords[i];

        const curTag = taggedWord[1];
        if(curTag === "NNP"||curTag === "NNPS"){
            resultWords.push(taggedWord[0]);
        }
    }
    return resultWords;
}