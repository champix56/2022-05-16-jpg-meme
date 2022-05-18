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
        const prImages=this.#images.load();
        const prMemes=this.#memes.load();
        Promise.all([prImages,prMemes])
        .then(arr_arr=>{
            console.log(arr_arr);
            arr_arr[1].map(memeUniqueJson=>{
                const memeI=new MemeImage(JSON.stringify(memeUniqueJson));
                memeI.image=arr_arr[0].find(img=>img.id===memeUniqueJson.imageId);
                this.#memes.push(memeI);
                return {memes:this.#memes,images:this.#images}
            })
        })
    }
}
export const memeGenerator=new MemeGenerator();
memeGenerator.loadInitial();