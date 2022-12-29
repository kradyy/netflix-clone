import { db, getDoc, doc, updateDoc, Timestamp, setDoc } from "../firebase";

const getUserData = async (user) => {
    if(!user)
        return false;

    const docRef = doc(db, "users", user.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    }

    return false;
}

const removeFromMyList = async (user, movie) => {
    if(!user) 
        return;

    const movieId = parseInt(movie.id || 0);

    const userData = await getUserData(user);
    const docRef = doc(db, "users", user.email);

    let updatedList = userData.myList || [];

    // Remove value from array if exists
    updatedList = updatedList.filter((id) => id !== movieId);

    await updateDoc(docRef, {
        myList: updatedList
    }).then(doc => {
        return true;
    }).catch(error => {
        console.log(error);
    }).finally(() => {
        return false;
    });
}

const addToMyList = async (user, movie) => {
    if(!user) 
        return;

    const movieId = parseInt(movie.id || 0);
 
    const userData = await getUserData(user);
    const docRef = doc(db, "users", user.email);

    let updatedList = userData.myList || [];

    // Add value to array if not exists
    if(!userData.myList.includes(movieId)) {
        updatedList.push(movieId);
    }

    await updateDoc(docRef, {
        myList: updatedList
    }).then(doc => {
        return doc.id;
    }).catch(error => {
        console.log(error);
    }).finally(() => {
        return false;
    });
}

export { addToMyList, removeFromMyList }

