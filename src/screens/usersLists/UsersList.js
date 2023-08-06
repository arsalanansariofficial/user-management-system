import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import UserCard from "../userCard/UserCard";
import Fetch from "../../util/fetch";
import {userActions} from "../../store/user-slice";
import loading from "../../assets/loading.gif";

const UsersList = () => {
    const users = useSelector(state => state.user.users);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (users.length === 0) {
            setIsLoading(true);
            Fetch({methodName: "GetUsers"}).then(response => {
                setIsLoading(false);
                if (!response.error) return dispatch(userActions.setUsers(response));
                alert(response.message);
            });
        }
        return () => undefined;
    }, [dispatch, users.length]);

    if (isLoading) return <div className="loading-spinner"><img src={loading} alt="loading..."/></div>;

    if (users) return users.map((user, index) => <UserCard key={index} user={user}/>);
};

export default UsersList;
