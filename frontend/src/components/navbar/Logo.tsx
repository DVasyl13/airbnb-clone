import {useNavigate} from "react-router-dom";

const Logo = () => {
    const navigator = useNavigate();
    const imagePath = require('../../assets/images/logo.png');
    return (
        <img
            onClick={() => navigator('/')}
            className="hidden md:block cursor-pointer"
            src={imagePath}
            height="100"
            width="100"
            alt="Logo"
        />
    );
}

export default Logo;