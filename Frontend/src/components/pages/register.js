import React, { Component } from "react";
import http from "../../http";
class Register extends Component {
    state = {
        email: "",
        password: "",
        passwordRepeat: "",
        fullName: "",
    };
    handleChange(field, e) {
        this.setState({ [field]: e.target.value });
    }
    tryRegister(e) {
        e.preventDefault();
        http.post("/register", this.state).then(() => {
            this.props.history.push("/login");
        });
    }
    render() {
        return (
            <div className="columns is-centered">
                <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                    <form action="" onSubmit={e => this.tryRegister(e)} className="box">
                        <div className="field has-addons">
                            <p className="control has-icons-left has-icons-right">
                                <input
                                    value={this.state.firstName}
                                    onChange={e => this.handleChange("firstName", e)}
                                    className="input"
                                    type="text"
                                    required
                                    placeholder="Full Name"
                                />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-user"></i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left has-icons-right">
                                <input
                                    value={this.state.email}
                                    onChange={e => this.handleChange("email", e)}
                                    className="input"
                                    type="email"
                                    required
                                    placeholder="Email"
                                />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-envelope"></i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left">
                                <input
                                    className="input"
                                    type="password"
                                    required
                                    minLength="6"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={e => this.handleChange("password", e)}
                                />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left">
                                <input
                                    className="input"
                                    type="password"
                                    required
                                    minLength="6"
                                    placeholder="Password Repeat"
                                    value={this.state.passwordRepeat}
                                    onChange={e => this.handleChange("passwordRepeat", e)}
                                />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control">
                                <button className="button is-success">Sign Up</button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;
