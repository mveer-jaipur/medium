import { SigninInput } from "@100xdevs/medium-common"
import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
import { LabeledInput } from "./LabeledInput"

export const SignInComponent = () => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SigninInput>({
        username: "",
        password: ""
    });

    async function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs)
            localStorage.setItem('token', response.data.jwt);
            navigate('/blogs')
        } catch(e) {
            console.log(e);
        }
    }


    return (
        <div className="h-screen flex flex-col justify-center text-center items-center">
            <div className="flex flex-col justify-start">
                <div className="text-3xl font-extrabold px-12">
                   Login
                </div>
                <div className="text-slate-400 m-3">
                    Have no account? Create an account 
                    <Link className="underline pl-2" to="{/signup}">Signup</Link>
                </div>

                <div className="flex justify-center align-middle flex-col text-center">
                        <LabeledInput label="Username" placeholder="please enter the username" onChange={(e) => {
                            setPostInputs(c => ({
                                ...c,
                                username: e.target.value
                            }))
                        }} />

                        <LabeledInput label="Password" type="password" placeholder="Please enter the password" onChange={(e) => {
                            setPostInputs(c => ({
                                ...c,
                                password: e.target.value
                            }))
                        }} />

                        <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-2">SignIn</button>
                </div>
            </div>
        </div>
       
    )
}