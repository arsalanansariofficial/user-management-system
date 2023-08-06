import Modal from "react-modal";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../store/user-slice";
import logo from "../../assets/logo.jpeg";
import "./Header.css";
import Register from "../../screens/register/Register";

const Header = () => {
    const dispatch = useDispatch();
    const modalState = useSelector((state) => state.user.modalState);

    const closeModalHandler = () => {
        dispatch(userActions.setModalState(false));
    };

    const registerClickHandler = () => {
        dispatch(userActions.setModalState(true));
    };

    return (
        <div>
            <header className="app-header">
                <img src={logo} className="app-header__app-logo" alt="App Logo"/>
                <span className="app-header__app-title">User Management</span>
                <div className="app-header__cta">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={registerClickHandler}
                    >
                        Create Account
                    </Button>
                </div>
            </header>
            <Modal
                ariaHideApp={false}
                isOpen={modalState}
                onRequestClose={closeModalHandler}
                className="modal"
            >
                <header className="modal__header">
                    <p>Create Account</p>
                </header>
                <Register closeModalHandler={closeModalHandler}/>
            </Modal>
        </div>
    );
};

export default Header;
