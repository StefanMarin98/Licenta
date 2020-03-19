import React, { Component } from "react";
class Home extends Component {
    state = {};
    render() {
        const isLoggedIn = this.props.isLoggedIn;
        return (
            <div>
                <br></br>
                {!isLoggedIn && (
                    <figure className="image is-fullwidth">
                        <img alt="main" src="/main.jpg" />
                    </figure>
                )}
                {isLoggedIn}
            </div>
        );
    }
}

export default Home;
