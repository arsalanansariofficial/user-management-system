import Form from "../../common/form/Form";
import Fetch from "../../util/fetch";

const Register = () => {
    const registerUser = (user) => Fetch({methodName: "CreateUser", user}).then(response => response);

    return <Form registerUser={registerUser}/>;
};

export default Register;
