'use client';

import {AiFillGithub} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import {useCallback, useState} from "react";
import {toast} from "react-hot-toast";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";


import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "../../hooks/useLoginModal";
import doRegister from "../../api/register";
import {useSignIn} from "react-auth-kit";
import {useUser} from "../../hooks/useUser";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
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
            name: '',
            email: '',
            password: ''
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        doRegister(data).then(({ response, responseBody }) => {
            sessionStorage.setItem("jwt", responseBody.token);
            sessionStorage.setItem("rjwt", responseBody.refreshToken);
            userContext.setUser(responseBody.user);

            signIn({
                token: responseBody.token,
                expiresIn: 3600 * 24,
                tokenType: "Bearer",
                authState: {email: data.email},
            });

            toast.success('Registered!');
            registerModal.onClose();
            //loginModal.onOpen();
        }).catch((error) => {
            toast.error(error);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const onToggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [registerModal, loginModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome to Airbnb"
                subtitle="Create an account!"
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
                id="name"
                label="Name"
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
            <hr/>
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => {
                }}
                // onClick={() => signIn('google')}
            />
            <Button
                outline
                label="Continue with GitHub"
                icon={AiFillGithub}
                onClick={() => {
                }}
                //onClick={() => signIn('github')}
            />
            <div
                className="
                    text-neutral-500
                    text-center
                    mt-4
                    font-light
                    "
            >
                <p>Already have an account?
                    <span
                        onClick={onToggle}
                        className="
                            text-neutral-800
                            cursor-pointer
                            hover:underline
                        "
                    > Log in</span>
                </p>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default RegisterModal;