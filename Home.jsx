import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { listAll, ref, getDownloadURL, list } from "firebase/storage";
import { storage } from "../firebase/firebase";
import { Autentication } from "../services/Autentication";
import { Nav } from "./Nav";
import "../styles/Home.css";

export const Home = () => {
    const [user, setUser] = useState({});
    const [userDetails, setUserDetails] = useState([]);
    const [postsDetails, setPostsDetails] = useState([]);
    
    const { logoutService } = Autentication();
    const profilesPhotoRef = ref(storage, 'profiles/');
    const postPhotoRef = ref(storage, 'posts');
    const navigate = useNavigate();

    const handleLogout = (auth) => {
        logoutService(auth);

        navigate('/login');
    }
    
    const getDetailsProfile = async() => {
        try {
            const query = await getDocs(collection(firestore, 'users'));
            const data = [];

            query.forEach((doc) => {
                if(doc.id === user.uid){
                    listAll(profilesPhotoRef).then((response) => {
                        response.items.forEach((item) => {
                            if(item._location.path === `profiles/${user.uid}`){
                                getDownloadURL(item).then((photo) => {
                                    data.push({...doc.data(), photo:photo, id:doc.id});
                                    setUserDetails(data);
                                })
                            }
                        })
                    })
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getDetailsPosts = async() => {
        try {
            const query = await getDocs(collection(firestore, 'posts'));
            const data = query.docs.map(value => ({ ...value.data(), id: value.id }));
            setPostsDetails(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        getDetailsProfile();
        getDetailsPosts()

    }, [user])

    return(        
        user ? 
            <div id="HomePage">      
                <Nav/>
                <div id="Content">
                    <section id="profile"> 
                        {
                            userDetails.map((user) => (
                                <div id="content" key={user.id}>
                                    {/* <img src={user.photo} alt="Photo"/> */}
                                    <p><strong>{user.name} {user.last_name}</strong></p>
                                    <p>{user.username}</p>
                                </div>
                            ))
                        }
                        
                        <div id="buttons">
                            <button id="new_post" onClick={() => {navigate('/new/post')}}>New post</button>
                            <button id="logout" onClick={() => {handleLogout(auth)}}>Logout</button>
                        </div>
                    </section>
                    
                    <section id="posts">
                        {    
                            postsDetails.map((post) => (
                                <div id="post" key={post.id}>
                                    <div>
                                        {/* <div id="post_profile">
                                            <img src={post.profile_photo} alt="Photo"/> <h3>{post.name}</h3>
                                        </div> */}
                                        
                                        {/* <img id="foto_post" alt="Photo post" src={post.post_photo}/> */}
                                        <p>{post.text}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </section>
                </div>
            </div>
        : 
            <div id="HomePage">
                <Nav/>
                <section id="posts-notLogin">
                    {    
                        postsDetails.map((post) => (
                            <div id="post" key={post.id}>
                                <div>
                                    <div id="post_profile">
                                        
                                    </div>
                                    
                                    
                                    <p>{post.text}</p>
                                </div>
                            </div>
                        ))
                    }
                </section>
            </div>
    )
}