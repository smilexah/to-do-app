import { Link } from "@nextui-org/react";
import type { AuthType } from "../pages/AuthPage";
import MyInput from "../components/ui/CustomInput";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "../app/features/auth/authApi";
import type { LoginRequest } from "../types/request/authRequest";
import ErrorMessage from "../components/ui/ErrorMessage";
import { useNavigate } from "react-router-dom";
import MyButton from "../components/ui/CustomButton";
import { useLazyCurrentUserQuery } from "../app/features/user/userApi";

type Props = {
    setSelected: (value: AuthType) => void;
};

const Login = ({ setSelected }: Props) => {
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { isValid } } = useForm<LoginRequest>({
        mode: 'onChange',
        defaultValues: {
            username: "user",
            password: "pass",
        }
    });

    const [login, { isLoading: isLoginLoading, isError: isLoginError, error: loginError }] = useLoginMutation();
    const [triggerCurrentUser] = useLazyCurrentUserQuery();

    const onSubmit: SubmitHandler<LoginRequest> = async (body) => {
        await login(body)
            .then(() => {
                triggerCurrentUser();
                navigate("/");
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6 w-full max-w-md p-8 bg-white rounded-lg shadow-md border border-gray-200"
            >
                <h2 className="text-2xl font-semibold text-gray-800 text-center">Вход</h2>

                <MyInput
                    control={control}
                    name="username"
                    label="Имя пользователя"
                    minLength={4}
                    minLengthErrorMessage="Минимальный размер 4"
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

                {isLoginError && <ErrorMessage error={loginError} />}

                <p className="text-center text-sm text-gray-600">
                    Нет аккаунта?{" "}
                    <Link
                        size="sm"
                        className="cursor-pointer text-blue-600 hover:underline"
                        onPress={() => setSelected("register")}
                    >
                        Зарегистрируйтесь
                    </Link>
                </p>

                <MyButton
                    fullWidth
                    color="primary"
                    type="submit"
                    isDisabled={!isValid}
                    isLoading={isLoginLoading}
                    className="w-full px-4 py-3 text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-md hover:from-blue-600 hover:to-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition font-medium text-lg"
                >
                    Войти
                </MyButton>
            </form>
        </div>
    );
};

export default Login;
