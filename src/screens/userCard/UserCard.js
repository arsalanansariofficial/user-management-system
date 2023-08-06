import {useHistory} from "react-router-dom/cjs/react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Paper} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import "./UserCard.css";
import Fetch from "../../util/fetch";
import {userActions} from "../../store/user-slice";
import loading from "../../assets/loading.gif";
import {useState} from "react";

const UserCard = ({user}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.users);

    const [isLoading, setIsLoading] = useState(false);

    const editUser = () => history.push(`/users/${user.id}`);

    const deleteUser = () => {
        setIsLoading(true);
        return Fetch({methodName: "DeleteUser", id: user.id}).then(response => {
            setIsLoading(false);
            if (!response.error) {
                const updatedUsers = users.filter((userObject) => userObject.id !== user.id);
                alert('User deleted!');
                return dispatch(userActions.setUsers(updatedUsers));
            }
            alert(response.message);
        });
    };

    if (isLoading) return <div className="loading-spinner"><img src={loading} alt="loading..."/></div>;

    return (
        <Paper className="user-card__paper">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Mobile Number: {user.phone}</p>
            <Button variant="contained" color="primary" id="edit" onClick={editUser}>edit</Button>
            <Button variant="contained" color="secondary" id="delete" onClick={deleteUser}>delete</Button>
        </Paper>
    );
};

export default UserCard;
