import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, firestore } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

export const Autentication = () => {

    const registerService = async(email, password, username, name, last_name) => {
        const details = {
            username: username,
            name: name,
            last_name: last_name
        }
        
        try{
            const user = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            
            const userDocument = await createUserDocument(user.user.uid, details);

            return user
        }catch (error){
            alert('Error registrando el usuario');
        }
    }

    const createUserDocument = async(user, details) => {

        try{
            const docRef = await setDoc(doc(firestore, "users", user), details);
        }catch (error){
            alert("Error agregando la información del usuario");
        }
    }

    const loginService = async(loginEmail, loginPassword) => {
        try{
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            
            return "success"
        }catch (error){
            alert('Error logueando al usuario');
        }
    }

    const logoutService = async(auth) => {
        await signOut(auth);
    }

    return {
        registerService,
        loginService,
        logoutService
    }
}