import React, {useState} from 'react';
import Input from "./Input";
import Button from "./Button";
import {BE_signIn, BE_signUp} from "../Backend/Queries";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../Redux/store";
import {authDataType} from "../Types";
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;
import avatarGenerator from "../utils/avatarGenerator";


const Login = () => {
    const [login, setLogin] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [signUpLoading, setSignUpLoading] = useState(false)
    const [signInLoading, setSignInLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const resetForm = () => {
        setEmail("")
        setPassword("")
        setConfirmPassword("")

    }
    const handleSignUp = () => {
        const data = {email, password, confirmPassword}
        auth(data,BE_signUp, setSignUpLoading)
    }
    const handleSignIn = () => {
        const data = {email, password}
        auth(data, BE_signIn,setSignInLoading)
    }

    const auth = (
        data: authDataType,
        func: any,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
        func(data, setLoading, resetForm, navigate, dispatch)
    }


    return (
        <div className="w-full md:w-[450px]">
            <h1 className={"text-white text-center font-bold text-4xl md:text-6xl mb-10"}>
                {login ? "Login" : "Register"}
            </h1>
            <div className="flex flex-col gap-3 w-full bg-white p-6 min-h-[60px] rounded-xl drop-shadow-xl">
                <Input name={"email"} type={"email"} value={email} onChange={e => setEmail(e.target.value)}/>
                <Input name={"password"} type={"password"} value={password}
                       onChange={e => setPassword(e.target.value)}/>
                {!login && <Input name={"confirm password"} type={"password"} value={confirmPassword}
                                  onChange={e => setConfirmPassword(e.target.value)}/>}
                {login ? (<>
                        <Button text={"Login"} onClick={handleSignIn} loading={signInLoading}/>
                        <Button onClick={() => setLogin(false)} text={"Register"} secondary={true}/>
                    </>) :
                    (<>
                        <Button text={"Register"} onClick={handleSignUp} loading={signUpLoading}/>
                        <Button onClick={() => setLogin(true)} text={"Login"} secondary={true}/>
                    </>)
                }
            </div>
        </div>
    );
};

export default Login;