import {Outlet} from "react-router-dom";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import Navbar from "../components/navbar/Navbar";

const RootLayout = () => {
    const currentUser = null;
    return <>

        <LoginModal/>
        <RegisterModal/>
        <Navbar currentUser={currentUser} />
        <main>
            <Outlet/>
        </main>

    </>
}

export default RootLayout