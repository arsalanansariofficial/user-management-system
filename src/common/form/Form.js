import {useState} from "react";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import "./Form.css";
import {userActions} from "../../store/user-slice";
import {useHistory} from "react-router-dom/cjs/react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import loading from "../../assets/loading.gif";

const Form = ({mode = "register", user, registerUser, updateUser}) => {
    const history = useHistory();
    const usersList = useSelector((state) => state.user.users);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const [firstName, setFirstName] = useState(user ? user.firstName : "");
    const [lastName, setLastName] = useState(user ? user.lastName : "");
    const [email, setEmail] = useState(user ? user.email : "");
    const [mobileNumber, setMobileNumber] = useState(user ? user.mobileNumber : "");

    const [firstNameWarning, setFirstNameWarning] = useState("hide");
    const [lastNameWarning, setLastNameWarning] = useState("hide");
    const [emailWarning, setEmailWarning] = useState("hide");
    const [mobileNumberWarning, setMobileNumberWarning] = useState("hide");

    const [response, setResponse] = useState(false);

    const changeFirstName = (firstName) => {
        setFirstName(firstName);
        setFirstNameWarning("hide");
    };

    const changeLastName = (lastName) => {
        setLastName(lastName);
        setLastNameWarning("hide");
    };

    const changeEmail = (email) => {
        setEmail(email);
        setEmailWarning("hide");
    };

    const changeMobileNumber = (mobileNumber) => {
        setMobileNumber(mobileNumber);
        setMobileNumberWarning("hide");
    };

    const registrationHandler = () => {
        let validEmailExpression = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;

        let validMobileNumber = /^[0-9]{10}$/;

        if (!firstName && !lastName && !email && !mobileNumber) return setFirstNameWarning("container-form-helper");

        if (firstName.length < 3) return setFirstNameWarning("container-form-helper");

        if (lastName.length < 3) return setLastNameWarning("display");

        if (!validEmailExpression.test(email)) return setEmailWarning("display");

        if (!validMobileNumber.test(mobileNumber)) return setMobileNumberWarning("display");

        if (mode === "register") {
            let requestBody = {
                id: new Date().getTime(), name: `${firstName} ${lastName}`, email, phone: mobileNumber
            };
            setIsLoading(true);
            registerUser(requestBody).then((response) => {
                setIsLoading(false);
                if (!response.error) {
                    setResponse(true);
                    const updatedUsers = [response, ...usersList];
                    dispatch(userActions.setUsers(updatedUsers));
                    return setTimeout(() => {
                        dispatch(userActions.setModalState(false));
                    }, 1000);
                }
                alert(response.message);
            });
        }

        if (mode === "update") {
            let requestBody = {
                id: user.id, name: `${firstName} ${lastName}`, email, phone: mobileNumber
            };
            setIsLoading(true);
            updateUser(requestBody).then(response => {
                setIsLoading(false);
                setResponse(true);
                if (!response.error) {
                    const updatedUsers = usersList.map((userObject) => {
                        if (userObject.id === response.id) return response;
                        return userObject;
                    });
                    if (updatedUsers.length === 0) updatedUsers.push(response);
                    dispatch(userActions.setUsers(updatedUsers));
                    return setTimeout(() => {
                        history.push("/");
                    }, 1000);
                }
                return alert(response.message);
            });
        }
    };

    if (isLoading) return <div className="loading-spinner"><img src={loading} alt="loading..."/></div>;

    return (<Typography component="div" className="container">
            <FormControl required>
                <InputLabel>First Name</InputLabel>
                <Input
                    id="firstName"
                    type="text"
                    onChange={(event) => changeFirstName(event.target.value)}
                    value={firstName}
                />
            </FormControl>
            <div className={firstNameWarning}>
                {<div className="form-helper-text">Please fill out this field.</div>}
            </div>
            <br/>
            <FormControl required>
                <InputLabel>Last Name</InputLabel>
                <Input
                    id="lastName"
                    type="text"
                    onChange={(event) => changeLastName(event.target.value)}
                    value={lastName}
                />
                <FormHelperText className={lastNameWarning}>
                    <span className="validation-message">Enter last name</span>
                </FormHelperText>
            </FormControl>
            <br/>
            <FormControl required>
                <InputLabel>Email Id</InputLabel>
                <Input
                    id="email"
                    type="text"
                    onChange={(event) => changeEmail(event.target.value)}
                    value={email}
                />
                <FormHelperText className={emailWarning}>
                    <span className="validation-message">Enter valid Email</span>
                </FormHelperText>
            </FormControl>
            <br/>
            <FormControl required>
                <InputLabel>Mobile No.</InputLabel>
                <Input
                    id="mobileNumber"
                    type="text"
                    onChange={(event) => changeMobileNumber(event.target.value)}
                    value={mobileNumber}
                />
                <FormHelperText className={mobileNumberWarning}>
                    <span className="validation-message">Enter valid mobile number</span>
                </FormHelperText>
            </FormControl>
            <br/>
            <br/>
            {response && (<FormControl>
          <span className="successText">
            {mode === "register" ? "Registration Successful!" : "Profile Updated!"}
          </span>
            </FormControl>)}
            <br/>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={registrationHandler}
            >
                {mode === "register" ? "Register" : "Update"}
            </Button>
        </Typography>);
};

export default Form;
