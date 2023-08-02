import {useNavigate} from "react-router-dom";

const Logo = () => {
    const navigator = useNavigate();

    return (
        <img
            onClick={() => navigator('/')}
            className="hidden md:block cursor-pointer"
            src="/src/assets/images/logo.png"
            height="100"
            width="100"
            alt="Logo"
        />
    );
}

export default Logo;