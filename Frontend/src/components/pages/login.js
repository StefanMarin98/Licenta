import React, { Component } from "react";
import Http from "../../http";
class Login extends Component {
    state = {
        email: "",
        password: ""
    };
    handleChange(field, e) {
        this.setState({ [field]: e.target.value });
    }
    tryLogin(e) {
        e.preventDefault();
        console.log(this.props);
        Http.post("/login", this.state).then(({ success }) => {
            if (success) {
                this.props.login();
                this.props.history.push("/");
            }
        });
    }
    render() {
        return (
            <div className="columns is-centered">
                <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                    <form
                        action=""
                        className="box"
                        onSubmit={e => this.tryLogin(e)}
                    >
                        <div className="field">
                            <p className="control has-icons-left has-icons-right">
                                <input
                                    value={this.state.email}
                                    onChange={e =>
                                        this.handleChange("email", e)
                                    }
                                    className="input"
                                    type="email"
                                    required
                                    placeholder="Email"
                                />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-envelope"></i>
                                </span>
                                <span className="icon is-small is-right">
                                    <i className="fas fa-check"></i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left">
                                <input
                                    value={this.state.password}
                                    onChange={e =>
                                        this.handleChange("password", e)
                                    }
                                    className="input"
                                    type="password"
                                    required
                                    placeholder="Password"
                                />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control">
                                <button className="button is-success">
                                    Login
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
