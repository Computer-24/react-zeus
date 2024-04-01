import React, {useEffect, useState} from 'react';
import logo from "../Assets/logo.svg"
import AddListBoard from "./AddListBoard";
import Icon from "./Icon";
import {BsFillChatFill} from "react-icons/bs";
import {FiList} from "react-icons/fi";
import UserHeaderProfile from "./UserHeaderProfile";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../Redux/store";
import {useNavigate} from "react-router-dom";
import {BE_signOut, getStorageUser} from "../Backend/Queries";
import {setUser} from "../Redux/userSlice";

const Header = () => {
    const currentUser = useSelector((state: RootState) => state.user.currentUser)
    const [logoutLoading, setLogoutLoading] = useState(false)
    const dispatch = useDispatch()
    const goTo = useNavigate()
    const user = getStorageUser()

    useEffect(() => {
        if (user?.id) {
            dispatch(setUser(user));
        } else {
            goTo("/auth")
        }
    }, []);

    useEffect(() => {
        const currentPage = getCurrentPage();
       if (currentPage) goTo("/dashboard/"+currentPage)
    }, [goTo]);

    const handleSignOut = async () => {
        BE_signOut(dispatch, goTo, setLogoutLoading)
    };

    const setCurrentPage = (page: string) => {
        localStorage.setItem("superhero_page", page)
    }
    const getCurrentPage = () => {
        return localStorage.getItem("superhero_page")
    }

    const handleGoToPage = (page: string) => {
        goTo("/dashboard/" + page)
        setCurrentPage(page)

    }
    return (
        <div
            className={"flex flex-wrap sm:flex-row gap-5 items-center justify-between drop-shadow-md bg-gradient-to-r from-myBlue to-myPink px-5 py-5 md:py-2 text-white"}>
            <img className={"w-[70px] drop-shadow-md cursor-pointer"} src={logo} alt={"logo"}/>
            <div className="flex flex-row-reverse md:flex-row items-center justify-center gap-5 flex-wrap">

                {getCurrentPage() === "chat" ? (<Icon IconName={FiList} onClick={() => handleGoToPage("")}/>)
                    : getCurrentPage() === "profile" ? (
                        <>
                            <Icon IconName={BsFillChatFill} ping={true} onClick={() => handleGoToPage("chat")}/>
                            <Icon IconName={FiList} onClick={() => handleGoToPage("")}/>
                        </>
                    ) : <>
                        <AddListBoard/>
                        <Icon IconName={BsFillChatFill} ping={true} onClick={() => handleGoToPage("chat")}/>
                    </>}

                <div className={"group relative"}>
                    <UserHeaderProfile user={currentUser}/>
                    <div className={"absolute pt-5 hidden group-hover:block w-full min-w-max"}>
                        <ul className={"w-full bg-white overflow-hidden rounded-md shadow-md text-gray-700 pt-1"}>
                            <p className={"hover:bg-gray-200 py-2 px-4 block cursor-pointer"}
                               onClick={() => handleGoToPage("profile")}>Profile</p>
                            <p className={`hover:bg-gray-200 py-2 px-4 cursor-pointer flex items-center gap-4`}
                               onClick={handleSignOut}>Logout</p>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;