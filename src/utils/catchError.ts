import {toastError} from "./toast";

export const catchError = (error: { code?: string }) => {
    const {code} = error
    if (code === "auth/invalid-email") toastError("Invalid email")
    else if (code === "auth/weak-password") toastError("Password should be at least 6 characters long")
    else if (code === "auth/user-not-found") toastError("User not found")
    else if (code === "auth/email-already-in-use") toastError("Email already exists")
    else if (code === "auth/wrong-password") toastError("Wrong password")
    else toastError("An error occurred")
}