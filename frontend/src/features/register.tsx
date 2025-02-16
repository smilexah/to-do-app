import type { AuthType } from "../pages/AuthPage";
import { type SubmitHandler, useForm } from "react-hook-form";
import MyInput from "../components/ui/CustomInput";
import ErrorMessage from "../components/ui/ErrorMessage";
import { Link } from "@nextui-org/react";
import type { RegisterRequest } from "../types/request/authRequest";
import { useRegisterMutation } from "../app/features/auth/authApi";
import MyButton from "../components/ui/CustomButton";
import { useState } from "react";

type Props = {
    setSelected: (value: AuthType) => void;
};

const Register = ({ setSelected }: Props) => {
    const [username, setUsername] = useState<string | null>(null);
    const { control, handleSubmit, formState: { isValid } } = useForm<RegisterRequest>({
        mode: 'onChange',
    });

    const [register, { isLoading, isError, error }] = useRegisterMutation();

    const onSubmit: SubmitHandler<RegisterRequest> = async (body) => {
        try {
            await register(body).unwrap();
            setUsername(body.username);
            setSelected("login");
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-6 w-full max-w-md p-8 bg-white rounded-lg shadow-md border border-gray-200"
                >
                    <h2 className="text-2xl font-semibold text-gray-800 text-center">Регистрация</h2>

                    <MyInput
                        control={control}
                        name="username"
                        label="Имя пользователя"
                        minLength={2}
                        minLengthErrorMessage="Минимальный размер 2"
                        required
                        className="w-full"
                    />

                    <MyInput
                        control={control}
                        name="password"
                        label="Пароль"
                        type="password"
                        minLength={4}
                        minLengthErrorMessage="Минимальный размер 4"
                        required
                        className="w-full"
                    />

                    {isError && <ErrorMessage error={error} />}

                    <p className="text-center text-sm text-gray-600">
                        Уже есть аккаунт?{" "}
                        <Link
                            size="sm"
                            className="cursor-pointer text-blue-600 hover:underline"
                            onPress={() => setSelected("login")}
                        >
                            Войдите
                        </Link>
                    </p>

                    <MyButton
                        fullWidth
                        color="primary"
                        type="submit"
                        isDisabled={!isValid}
                        isLoading={isLoading}
                        className="w-full px-4 py-3 text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-md hover:from-blue-600 hover:to-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition font-medium text-lg"
                    >
                        Зарегистрироваться
                    </MyButton>
                </form>
            </div>
        )
};

export default Register;
