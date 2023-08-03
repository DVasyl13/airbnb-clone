import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import {useNavigate} from "react-router-dom";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";
import doLogin from "../../api/login";
import {useSignIn} from "react-auth-kit";
import {useUser} from "../../hooks/useUser";

const LoginModal = () => {
    const navigator = useNavigate();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    const signIn = useSignIn();
    const userContext = useUser();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        },
    });

    const onSubmit: SubmitHandler<FieldValues> =
        (data) => {
            setIsLoading(true);

            doLogin(data).then(({ response, responseBody }) => {
                toast.success('Welcome Back!');
                sessionStorage.setItem("jwt", responseBody.token);
                sessionStorage.setItem("rjwt", responseBody.refreshToken);
                userContext.setUser(responseBody.user);

                signIn({
                    token: responseBody.token,
                    expiresIn: 3600 * 24,
                    tokenType: "Bearer",
                    authState: {email: data.email},
                });
                loginModal.onClose();
            }).catch((error) => {
                toast.error(error);
            }).finally(() => {
                setIsLoading(false);
            });
    }

    const onToggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome back"
                subtitle="Login to your account!"
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            {/*<Button*/}
            {/*    outline*/}
            {/*    label="Continue with Google"*/}
            {/*    icon={FcGoogle}*/}
            {/*    onClick={() => signIn('google')}*/}
            {/*/>*/}
            {/*<Button*/}
            {/*    outline*/}
            {/*    label="Continue with Github"*/}
            {/*    icon={AiFillGithub}*/}
            {/*    onClick={() => signIn('github')}*/}
            {/*/>*/}
            <div className="
                    text-neutral-500 text-center mt-4 font-light"
            >
                <p>First time using Airbnb?
                    <span
                        onClick={onToggle}
                        className="
                            text-neutral-800
                            cursor-pointer
                            hover:underline
                        "
                    > Create an account</span>
                </p>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default LoginModal;