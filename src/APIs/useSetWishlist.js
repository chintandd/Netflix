import { db } from "../Firebase"
import { setDoc,doc,getDoc,deleteDoc  } from "firebase/firestore"



export const setWhislist =  async (uid,movieId,poster,title,year,genres,popularity) => {
        
        
        if(uid === null) return;
        const movie = await getDoc(doc(db,`users/${uid}/profiles/p1/whislist/${movieId}`))
        if(movie.exists()){
            await deleteDoc(doc(db,`users/${uid}/profiles/p1/whislist/${movieId}`))
            return { remove: true, movie:movieId };
        }
        else{
            await setDoc(doc(db,`users/${uid}/profiles/p1/whislist/${movieId}`),{
                movieId: movieId,
                title: title,
                genres: genres,
                year: year,
                poster: poster,
                popularity: popularity
        })
        return({remove:false,movie:{movieId: movieId,
                title: title,
                genres: genres,
                year: year,
                poster: poster,
                popularity: popularity}})
        
        }
        
    }





