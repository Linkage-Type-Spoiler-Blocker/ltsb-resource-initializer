const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;

const asyncForEach = async(array, callback)=>{
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

const cleanString = (str)=>{
    const lowerStr = str.toLowerCase();
    const withoutSpecialCharStr = lowerStr.replace(regExp," ");
    const splittedWords = withoutSpecialCharStr.split(" ");

    const longerWords = [];
    splittedWords.forEach(element=>{
        if(element.length>2){
            longerWords.push(element);
        }
    });

    return longerWords;
}

module.exports = {
    asyncForEach,
    cleanString
}