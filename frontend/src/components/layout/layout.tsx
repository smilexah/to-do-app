import {Outlet} from "react-router-dom";
import Container from "../Container";
import Header from "../navbar/header";

const Layout = () => {
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