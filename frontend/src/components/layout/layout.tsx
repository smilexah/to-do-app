import {Outlet} from "react-router-dom";
import Container from "../Container";
import Header from "../navbar/header";
import {useAppSelector} from "../../app/hooks";
import {selectCurrentUser, selectUser} from "../../app/features/user/userSlice";
import {useCurrentUserQuery} from "../../app/features/user/userApi";

const Layout = () => {
    const {isLoading} = useCurrentUserQuery()
    const user = useAppSelector(selectUser)

    return (
        <>
            <Header/>

            <Container>
                <>
                    <div className="flex-1 p-4 ">
                        <Outlet/>
                    </div>
                    <div className="flex-2 p-4">
                    </div>
                </>
            </Container>
        </>
    );
};

export default Layout;