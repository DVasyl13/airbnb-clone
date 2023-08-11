import {Outlet} from "react-router-dom";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import Navbar from "../components/navbar/Navbar";
import {useUser} from "../hooks/useUser";
import {useEffect} from "react";
import getCurrentUser from "../actions/getCurrentUser";
import {toast} from "react-hot-toast";
import ToasterProvider from "../storage/ToasterProvider";
import RentModal from "../components/modals/RentModal";
import SearchModal from "../components/modals/SearchModal";

const RootLayout = () => {
    const userContext = useUser();

    useEffect(() => {
        const userToken = sessionStorage.getItem("jwt");
        if (userToken) {
            getCurrentUser().then(({ response, responseBody }) => {
                userContext.setUser(responseBody);
            }).catch((error) => {
                toast.error(error);
            });
        }
    }, []);

    return <>
        <ToasterProvider/>
        <RentModal/>
        <LoginModal/>
        <SearchModal />
        <RegisterModal/>
        <Navbar currentUser={userContext.user} />
        <main>
            <Outlet/>
        </main>

    </>
}

export default RootLayout