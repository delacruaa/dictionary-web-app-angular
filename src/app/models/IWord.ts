export interface IWord  {
    word:string,
    phonetics:IPhonetics[],
    meanings: IMeanings[],
    sourceUrls:string[],
   
}

export interface IPhonetics {
    audio:string,
    text:string,

}

export interface IMeanings {
    partOfSpeech: string,
    definitions:IDefinitions[],
    synonyms:string[],
    antonyms:string[]
}

export interface IDefinitions {
    definition:string,
    synonyms:string[],
    antonyms:string[],
}

