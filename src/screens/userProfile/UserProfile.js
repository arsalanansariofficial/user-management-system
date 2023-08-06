import {useParams} from "react-router-dom/cjs/react-router-dom";
import {useState, useEffect} from "react";
import {Paper} from "@material-ui/core";
import "./UserProfile.css";
import Form from "../../common/form/Form";
import Fetch from "../../util/fetch";
import loading from "../../assets/loading.gif";

const UserProfile = () => {
    const params = useParams();
    const id = params.id;

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [user, setUser] = useState({});

    useEffect(() => {
        setIsLoading(true);
        Fetch({methodName: "GetUser", id}).then(response => {
            setIsLoading(false);
            if (!response.error) {
                const user = {
                    id: response.id,
                    firstName: response.name && response.name.split(" ")[0],
                    lastName: response.name && response.name.split(" ")[1],
                    email: response.email && response.email,
                    mobileNumber: response.phone && response.phone
                };
                return setUser(user);
            }
            setError(response.message);
            return alert(response.message);
        });
    }, [id]);

    const updateUser = (user) => {
        return Fetch({methodName: "UpdateUser", id, user}).then(response => response);
    };

    if (isLoading) return <div className="loading-spinner"><img src={loading} alt="loading..."/></div>;

    return (<Paper className="paper">
        {error && <p>{error}</p>}
        {Object.keys(user).length > 0 && <Form mode="update" user={user} updateUser={updateUser}/>}
    </Paper>);
};

export default UserProfile;
