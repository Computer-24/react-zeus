import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "@firebase/auth"
import {auth, db} from "./Firebase";
import {toastError} from "../utils/toast";
import {catchError} from "../utils/catchError";
import {authDataType, setLoadingType, userType} from "../Types";
import {NavigateFunction} from "react-router-dom";
import {doc, getDoc, serverTimestamp, setDoc, updateDoc} from 'firebase/firestore';
import {defaultUser, setUser, userStorageName} from "../Redux/userSlice";
import {AppDispatch} from "../Redux/store";
import convertTime from "../utils/ConverterTime";
import avatarGenerator from "../utils/avatarGenerator";

const COLLECTION_USERS = "users"
const COLLECTION_TASKS = "tasks"
const COLLECTION_TASK_LIST = "taskList"
const COLLECTION_CHATS = "chats"
const COLLECTION_MESSAGES = "messages"

const getUserInfo = async (id: string): Promise<userType> => {
    const userRef = doc(db, COLLECTION_USERS, id)
    const user = await getDoc(userRef)
    if (user.exists()) {
        const {
            isOnline,
            img,
            username,
            email,
            creationTime,
            lastSeen,
            bio,
        } = user.data()

        return {
            id: user.id,
            isOnline,
            img,
            username,
            email,
            creationTime: creationTime ? convertTime(creationTime.toDate()) : "no date: user info",
            lastSeen: lastSeen ? convertTime(lastSeen.toDate()) : "no date: user info",
            bio,
        }
    } else {
        toastError(`User with ID ${id} not found`)
        return defaultUser
    }
}
const addUserToCollection = async (
    id: string,
    email: string,
    username: string,
    img: string,
) => {
    await setDoc(doc(db, COLLECTION_USERS, id), {
        isOnline: true,
        img,
        username,
        email,
        creationTime: serverTimestamp(),
        lastSeen: serverTimestamp(),
        bio: `I am ${username}`,
    })
    return getUserInfo(id)
};

const updateUserInfo = async ({
                                  id, username, img, isOnline, isOffline,
                              }: {
    id?: string,
    username?: string,
    img?: string,
    isOnline?: boolean,
    isOffline?: boolean
}) => {
    if (!id) {
        id = getStorageUser().id
    }
    if (id) {
        await updateDoc(doc(db, COLLECTION_USERS, id), {
            ...(username && {username}),
            ...(img && {img}),
            ...(isOnline && {isOnline}),
            ...(isOffline && {isOnline: false}),
            lastSeen: serverTimestamp(),
        })
    }
}

export const getStorageUser = () => {
    const user = localStorage.getItem(userStorageName)
    if (user) return JSON.parse(user)
    else return null
}
export const BE_signUp = (data: authDataType,
                          setLoading: setLoadingType,
                          reset: () => void,
                          navigate: NavigateFunction,
                          dispatch: AppDispatch,
) => {
    const {email, password, confirmPassword} = data

    if (email && password) {
        if (password === confirmPassword) {
            setLoading(true)
            createUserWithEmailAndPassword(auth, email, password)
                .then(async ({user}) => {
                    const userName = user.email?.split("@")[0];
                    const imgLink = avatarGenerator(userName)
                    const userInfo = await addUserToCollection(user.uid, user.email || "", userName || "", imgLink)
                    dispatch(setUser(userInfo))
                    reset()
                    setLoading(false)
                    navigate("/dashboard")
                })
                .catch(err => {
                    catchError(err)
                    setLoading(false)
                });
        } else {
            toastError("Password must match", setLoading)
        }
    } else {
        toastError("Field must not be blank", setLoading)
    }
}

export const BE_signIn = (data: authDataType,
                          setLoading: setLoadingType,
                          reset: () => void,
                          navigate: NavigateFunction,
                          dispatch: AppDispatch,
) => {
    const {email, password} = data
    if (email && password) {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then(async ({user}) => {
                await updateUserInfo({id: user.uid, isOnline: true})
                const userInfo = await getUserInfo(user.uid)
                dispatch(setUser(userInfo))
                reset()
                setLoading(false)
                navigate("/dashboard")
            })
            .catch(err => {
                catchError(err)
                setLoading(false)
            });
    } else {
        toastError("Field must not be blank", setLoading)

    }
}

export const BE_signOut = (dispatch: AppDispatch, goTo: NavigateFunction, setLoading: setLoadingType) => {
    setLoading(true)
    signOut(auth)
        .then(async () => {
            goTo("/auth")
            await updateUserInfo({isOffline: true})
            dispatch(setUser(defaultUser))
            localStorage.removeItem(userStorageName)
            setLoading(false)
        })
        .catch((err) => catchError(err))
}