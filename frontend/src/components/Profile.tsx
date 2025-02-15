import {useAppSelector} from "../app/hooks";
import {selectCurrentUser} from "../app/features/user/userSlice";
import {Card, CardHeader, Image, CardBody} from "@nextui-org/react"
import {BASE_URL} from "../contants";
import {Link} from "react-router-dom";

const Profile = () => {
    const currentUser = useAppSelector(selectCurrentUser);
    if (!currentUser) {
        return null
    }

    const {Id, Username} = currentUser
    return (
        <Card className="py-4 w-[302px]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                <Image
                    alt="Card Profile"
                    className="object-cover rounded-xl"
                    src={`https://flowbite.com/docs/images/people/profile-picture-3.jpg`}
                    width={370}
                />
            </CardHeader>
            <CardBody className="px-4">
                <Link to={`users/${Id}`}>
                    <h4 className="font-bold text-large mb-2">{`(@${Username})`} </h4>
                    <p className="text-default flex items-center gap-2">
                        <span>{Username}</span>
                    </p>
                </Link>
            </CardBody>
        </Card>
    );
};

export default Profile;