
import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword,
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
import { 
    addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwJ24NBIkvhDorbK_cX__Pqx5MJRPZeFQ",
  authDomain: "netflix-clone-6b4b8.firebaseapp.com",
  projectId: "netflix-clone-6b4b8",
  storageBucket: "netflix-clone-6b4b8.firebasestorage.app",
  messagingSenderId: "460185492789",
  appId: "1:460185492789:web:22614f4a14ca69b4b1c07c"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider : "local",
            email,

        })
    } catch (error) {
        console.log(error)
        alert(error)
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
        alert(error)
    }
}

const logout = () => {
    signOut(auth)
}

export {auth, db, login, signup, logout}