import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

import MenuItem from "./MenuItem";
import Avatar from "../Avatar";
import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";
import {AppUser} from "../../types/AppUser";
import {useSignOut} from "react-auth-kit";
import {useUser} from "../../hooks/useUser";
import {toast} from "react-hot-toast";

interface UserMenuProps {
    currentUser?: AppUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
   currentUser
}) => {
    const signOut = useSignOut();
    const loginModal = useLoginModal();
    const userContext = useUser();
    const registerModal = useRegisterModal();
    //const rentModal = useRentModal();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const logOut = () => {
        sessionStorage.removeItem('jwt');
        sessionStorage.removeItem('rjwt');
        userContext.setUser(null);
        signOut();
        //TODO: make a call to logout on Backend also
    }

    // const onRent = useCallback(() => {
    //     if (!currentUser) {
    //         return loginModal.onOpen();
    //     }
    //
    //     rentModal.onOpen();
    // }, [loginModal, rentModal, currentUser]);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    //onClick={onRent}
                    className="
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        rounded-full
                        hover:bg-neutral-100
                        transition
                        cursor-pointer
                    "
                >
                    Airbnb your home
                </div>
                <div
                    onClick={toggleOpen}
                    className="
                        p-4
                        md:py-1
                        md:px-2
                        border-[1px]
                        border-neutral-200
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded-full
                        cursor-pointer
                        hover:shadow-md
                        transition
                    "
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div
                    className="
                        absolute
                        rounded-xl
                        shadow-md
                        w-[40vw]
                        md:w-3/4
                        bg-white
                        overflow-hidden
                        right-0
                        top-12
                        text-sm
                    "
                >
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                                <MenuItem
                                    label="My trips"
                                    onClick={() => {}}
                                />
                                <MenuItem
                                    label="My favorites"
                                    onClick={() => {}}
                                />
                                <MenuItem
                                    label="My reservations"
                                    onClick={() => {}}
                                />
                                <MenuItem
                                    label="My properties"
                                    onClick={() => {}}
                                />
                                <MenuItem
                                    label="Airbnb your home"
                                    onClick={() => {}}
                                />
                                <hr />
                                <MenuItem
                                    label="Logout"
                                    onClick={logOut}
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    label="Login"
                                    onClick={loginModal.onOpen}
                                />
                                <MenuItem
                                    label="Sign up"
                                    onClick={registerModal.onOpen}
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserMenu;