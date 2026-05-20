import React, { useEffect, useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import '../styles/LoginSignUp.css'
import Navbar from '../Components/Navbar';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import {toast, Bounce} from 'react-toastify'
import errorMapping from '../Utils/errorMapping';
import GoogleButton from "react-google-button";
import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import { Navigate, Router, useNavigate } from "react-router-dom";
// import { redirect } from "react-router-dom";


const googleProvider = new GoogleAuthProvider();

const handleGoogleSignIn = () => {

    signInWithPopup(auth, googleProvider).then((res)=>{
        toast.success('Google Login Successful', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
    }).catch((err)=> {
        toast.error(errorMapping[err.code] || 'Not able to use Google Authentication', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
    })
}

const Login = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate()

    //Function for Handling Sign up Requests
    const handleSignUp = () => {
        if (!userName || !email || !password || !confirmPassword) {
            toast.warning('Fill all the Details', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
            return;
        }
        if (password !== confirmPassword) {
            toast.warning('Password Mismatched', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                toast.success('User Created', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });

                    navigate('/');
            })
            .catch((err) => {
                
                toast.error(errorMapping[err.code] || 'Something went Wrong', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
            });
    };

    // Function to handle Login
    const handleLogin = () => {
        if (!email || !password) {
            toast.warning("Fill all the Details", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: 'light',
                transition: Bounce,
                });
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
                toast.success('Logged In', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
                toast.error(errorMapping[err.code] || 'Something went Wrong', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
            });
    };

    const [action, setAction] = useState("Login");

    const [changePassword, setChangePassword] = useState(true);
    const changeIcon = changePassword === true ? false : true;

    return(

        <>
        <Navbar />
        <div className="container">
            <div className="page-header">
            <div className="toggle-container">
                <div className={action === "Sign Up"?"sumit gray":"toggle"} onClick={()=>{setAction("Login")}}>Login</div>
                <div className={action === "Login"?"sumit gray":"toggle"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
            </div>
            </div>
            <div className="inputs">
                {action === "Login" ? <div></div>:
                //Field for Name 
                <div className="input">
                <PersonIcon className="icons" fontSize="medium"/>
                <input 
                    type="text" 
                    placeholder="Name"
                    name="userName"
                    onChange={(e)=>setUserName(e.target.value)}
                    required/>
                </div>
                }
                
                {/* Field for Email Request  */}
                <div className="input">
                    <EmailIcon className="icons" fontSize="medium"/>
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Email"
                        onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="input">
                <span className="icon"
                 onClick={() => {
                    setChangePassword(changeIcon);
                 }}
                >
                    {changeIcon ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </span>    

                {/*Field for Password Request */}
              <input 
                    type={changePassword ? "password" : "text"} 
                    name="password" 
                    placeholder="Password"
                    onChange={(e)=>setPassword(e.target.value)}
                    required/>
                        
                </div>
                {action === "Login" ? <div></div>:
                <div className="input">
                    <span className="icon"
                 onClick={() => {
                    setChangePassword(changeIcon);
                 }}
              >
                 {changeIcon ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </span> 
                {/*Field for Re-confirm Password */}
                    <input 
                    type={changePassword ? "password" : "text"} 
                    name="confirm-password" 
                    placeholder=" Confirm Password"
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    required/>
            </div>
                }

                <button className="submit-btn" onClick={action === "Login" ? handleLogin : handleSignUp}>
                    {action}
                </button>
            </div>
            <div>
                <span className="gbutton">
                --Or--
                <GoogleButton onClick={handleGoogleSignIn}/>
                </span>
            </div>
            
        </div>
        </>
    )
}

export default Login;