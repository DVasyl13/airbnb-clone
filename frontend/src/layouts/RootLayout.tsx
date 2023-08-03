import {Outlet} from "react-router-dom";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import Navbar from "../components/navbar/Navbar";
import {useUser} from "../hooks/useUser";
import {useEffect} from "react";
import getCurrentUser from "../actions/getCurrentUser";
import {toast} from "react-hot-toast";

const RootLayout = () => {
    const userContext = useUser();
    useEffect(() => {
        const userToken = sessionStorage.getItem("jwt");
        if (userToken) {
            getCurrentUser().then(({ response, responseBody }) => {
                toast.success('Welcome Back!');
                userContext.setUser(responseBody);
            }).catch((error) => {
                toast.error(error);
            });
        }
    }, []);

    return <>
        <LoginModal/>
        <RegisterModal/>
        <Navbar currentUser={userContext.user} />
        <main>
            <Outlet/>
        </main>

    </>
}

export default RootLayout