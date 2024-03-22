import React, {useState} from 'react';
import Input from "./Input";
import Button from "./Button";

const Login = () => {
    const [login, setLogin] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

 const handleSignUp = () => {
const data = {email, password, confirmPassword}
 }
 const handleSignIn = () => {
     const data = {email, password}
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
                        <Button text={"Login"} onClick={handleSignIn}/>
                        <Button onClick={() => setLogin(false)} text={"Register"} secondary={true}/>
                    </>) :
                    (<>
                        <Button text={"Register"} onClick={handleSignUp}/>
                        <Button onClick={() => setLogin(true)} text={"Login"} secondary={true}/>
                    </>)
                }
            </div>
        </div>
    );
};

export default Login;