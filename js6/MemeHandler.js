import {MemeArray, MemeImage} from './Meme6.js'
import {ArrayImages} from './Image.js'

class MemeGenerator{
    #memes;
    #images;
    constructor(){
        this.#images=new ArrayImages();
        this.#memes=new MemeArray();
    }
    loadInitial(){
        
    }
}
export const memeGenerator=new MemeGenerator();
memeGenerator.loadInitial();