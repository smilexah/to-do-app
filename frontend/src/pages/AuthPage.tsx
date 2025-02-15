import {useState} from 'react';
import {Card, CardBody, Tab, Tabs} from "@nextui-org/react";
import Login from "../features/login";
import Register from "../features/register";
import {useNavigate} from "react-router-dom";

export type AuthType = "login" | "register" | "logout";

type Props = {
    type: AuthType
}

const Auth = ({type}: Props) => {
    const [selected, setSelected] = useState<AuthType>(type);
    const navigate = useNavigate();


    const handleOnSelectionChange = (type: string) => {
        if (type === "login" || type === "register" || type === "logout") {
            setSelected(type);
            navigate(`/auth/${type}`)
        }
    }

    return (
        <div className="flex items-center justify-center w-full h-screen bg-gray-100">
            <div className="flex flex-col">
                <Card className="max-w-full w-[340px] h-auto">
                    <CardBody className="overflow-hidden">
                        <Tabs fullWidth size={"md"} selectedKey={selected}
                              onSelectionChange={(key) => handleOnSelectionChange(key as string)}>
                            <Tab key="login" title="Вход">
                                <Login setSelected={setSelected}/>
                            </Tab>
                            <Tab key="register" title="Регистрация">
                                <Register setSelected={setSelected}/>
                            </Tab>
                        </Tabs>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default Auth;