import { useState } from "react"
import { SignInForm, SignUpForm } from "./";
// import "../styles/LogIngStyle.css"

export const LogIn = ()=>{
    const [activateSignUp, setActivateSignUp] = useState(false);

    const SuccessAuthSignUp = ()=>{
        console.log("Ingreso exitoso")
    }

    const SuccessAuthSignIn = ()=>{
        console.log("Bienvenido, nuevo usuario")
    }

    return (
        <div className="container-login">
            <div className="container-buttons-login">
                {activateSignUp ? 
                    <SignUpForm  switchToSignIn={()=>setActivateSignUp(false)}  onSuccess={SuccessAuthSignUp}/> :
                    <SignInForm switchToSignUp={()=>setActivateSignUp(true)} onSuccess={SuccessAuthSignIn}/>
                }
            </div>
        </div>
    )
}