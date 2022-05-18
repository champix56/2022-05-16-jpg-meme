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
        const syncPromise=Promise.all([prImages,prMemes])
        
        const tmPromise=new Promise((resolve=(message)=>console.log(message))=>{
            let wait = setTimeout(() => {
                clearTimeout(wait);
                resolve('Promise B win!');
              }, 5)
              return "error"
        });
        Promise.race([syncPromise,tmPromise])
        .then(arr_arr=>{
            if(!Array.isArray(arr_arr))return;
            console.log(arr_arr);
            arr_arr.map(memeUniqueJson=>{
                const memeI=new MemeImage(JSON.stringify(memeUniqueJson));
                memeI.image=arr_arr.find(img=>img.id===memeUniqueJson.imageId);
                this.#memes.push(memeI);
                console.trace(this);
                return {memes:this.#memes,images:this.#images}
            })
        });
    }
}
export const memeGenerator=new MemeGenerator();
memeGenerator.loadInitial();