import Header from "./components/header";
import React from "react";
import { Route, Switch } from "react-router-dom";
import routes from "./routes";
import http from "./http";

class App extends React.Component {
    state = {
        isLoggedIn: false,
        user: {}
    };

    login() {
        this.setState({ isLoggedIn: true });
    }

    logout() {
        http.post("/logout").then(() => {
            this.setState({ isLoggedIn: false, user: {} });
        });
    }

    componentDidMount() {
        http.get(`/user/isLoggedIn`)
            .then(data => {
                this.setState({ user: data, isLoggedIn: true });
            })
            .catch(e => {
                this.setState({ isLoggedIn: false });
            });
    }

    render() {
        return (
            <React.Fragment>
                <Header
                    logout={e => this.logout(e)}
                    isLoggedIn={this.state.isLoggedIn}
                ></Header>
                <br></br>
                <div className="container is-fluid">
                    <Switch>
                        {routes.map((route, index) => (
                            <Route
                                isLoggedIn={this.state.isLoggedIn}
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                render={props => (
                                    <route.component
                                        {...props}
                                        login={e => this.login(e)}
                                        isLoggedIn={this.state.isLoggedIn}
                                    />
                                )}
                            />
                        ))}
                    </Switch>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
