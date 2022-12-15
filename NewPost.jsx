import { React, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "../firebase/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/NewPost.css";

export const NewPost = () => {

    const [preview, setPreview] = useState(null);
    const [text, setText] = useState('');
    const [user, setUser] = useState({});
    const [postPhoto, setPostPhoto] = useState();
    const [nameUser, setNameUser] = useState('');

    const navigate = useNavigate();

    const fileSelected = (event) => {
        const image = event.target.files[0];

        let reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        } 
        reader.readAsDataURL(image);

        setPostPhoto(image);
        getUserDetails();
    }

    const uploadImage = async(photo, postCode) => {
        const imageRef = ref(storage, `posts/${postCode}`);
        await uploadBytes(imageRef, photo);
    }

    const getUserDetails = async() => {
        
        const query = await getDocs(collection(firestore, 'users'));
        const data = [];

        query.forEach((doc) => {
            if(doc.id === user.uid){
                data.push({...doc.data(), id:doc.id})
            }
        })

        setNameUser(data[0].name + ' ' + data[0].last_name);
    }
    
    const postInformation = async(e, postCode, name, uid_profile_photo, text, photo) => {
        e.preventDefault();
        
        const details = {
            name: name,
            uid_profile_photo: uid_profile_photo,
            text: text
        }

        try{
            const docRef = await setDoc(doc(firestore, "posts", postCode), details);

            uploadImage(photo, postCode);
            
            navigate('/')
        }catch (error){
            alert("Error agregando la información del usuario");
        }
    }

    const codeGenerator = () => {
        const alpha = 'abcdefghijklmnopqrstuvwxyz';
        const calpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const num = '1234567890';
        const specials = ',.!@#$%^&*';
        const options = [alpha, alpha, alpha, alpha, calpha, calpha, calpha, num, num, num, specials, specials];
        let opt, choose;
        let pass = "";
        
        for ( let i = 0; i < 12; i++ ) {
            opt = Math.floor(Math.random() * options.length);
            choose = Math.floor(Math.random() * (options[opt].length));
            pass = pass + options[opt][choose];
            options.splice(opt, 1);
        }
        return pass;
    }

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, [setUser])

    return(
        <div id="newPostPage">
            <section id="form-section">
                <form onSubmit={(e) => postInformation(e, codeGenerator(), nameUser, user.uid, text, postPhoto)}>
                    <h2>Haz un post</h2>
                    <div className="form-info">
                        
                        
                    </div>
                    <div className="form-info">
                        <label htmlFor="infoPost">Comentario</label>
                        <textarea onChange={(event) => setText(event.target.value)} name="infoPost" rows="15"></textarea>
                    </div>
                    <button type="submit">Postear</button>
                </form>
            </section>
            <section id="preview">
                <div id="post-preview">
                    
                    <p>{text}</p>
                </div>
            </section>
        </div>
    )
}