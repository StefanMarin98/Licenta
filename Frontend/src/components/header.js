import React from "react";
import { Link } from "react-router-dom";
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            burgerToggled: false
        };
    }

    toggleBurgers() {
        this.setState({ burgerToggled: !this.state.burgerToggled });
    }

    getBurgersClass() {
        return this.state.burgerToggled ? "is-active" : "";
    }

    logout(e) {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        const isLoggedIn = this.props.isLoggedIn;
        return (
            <nav
                className="navbar is-primary"
                role="navigation"
                aria-label="main navigation"
            >
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/">
                        <img src="logo.png" alt="logo" />
                    </Link>

                    <a
                        role="button"
                        href="#navbar"
                        className={
                            "navbar-burger burger" + this.getBurgersClass()
                        }
                        onClick={() => this.toggleBurgers()}
                        aria-label="menu"
                        aria-expanded="false"
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div className={"navbar-menu" + this.getBurgersClass()}>
                    {isLoggedIn && (
                        <div className="navbar-start">
                            <Link className="navbar-item" to="/courses">
                                Courses
                            </Link>
                            <Link className="navbar-item" to="/groups">
                                Groups
                            </Link>
                        </div>
                    )}

                    <div className="navbar-end">
                        <div className="navbar-item">
                            {!isLoggedIn && (
                                <div className="buttons">
                                    <Link
                                        className="button is-primary"
                                        to="/signup"
                                    >
                                        <strong>Sign up</strong>
                                    </Link>
                                    <Link
                                        className="button is-light"
                                        to="/login"
                                    >
                                        Log in
                                    </Link>
                                </div>
                            )}

                            {isLoggedIn && (
                                <div className="buttons">
                                    <a
                                        className="button is-light"
                                        onClick={e => this.logout(e)}
                                    >
                                        Log out
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}
export default Header;