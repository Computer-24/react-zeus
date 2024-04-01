import {toastError, toastInfo} from "./toast";

export const catchError = (error: { code?: string }) => {
    const { code } = error;
    if (code === "auth/invalid-email") toastError("invalid email");
    else if (code === "auth/weak-password")
        toastError("password should be at least 6 characters");
    else if (code === "auth/user-not-found") toastError("user not found");
    else if (code === "auth/email-already-in-use")
        toastError("email already exists");
    else if (code === "auth/wrong-password") toastError("wrong password");
    else if (code === "auth/requires-recent-login")
        toastInfo("logout and login before updating your profile");
    else if (code === "unavailable") toastError("firebase client is offline");
    else if (code === "auth/invalid-login-credentials")
        toastError("invalid credentials");
    else if (code === "auth/operation-not-allowed")
        toastError("Can't change email now!");
    else toastError("An error occurred!");
}


