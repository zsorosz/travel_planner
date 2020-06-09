import React, { Component } from 'react'

class LogIn extends Component {
    render(){
        return(
            <div>
                <h1>Login!</h1>
                <div>
                    <form action="/api/users/login" method="POST">
                        <div>
                            <input type="text" name="username" placeholder="Username" />
                        </div>
                        <div>
                            <input type="password" name="password" placeholder="Password" />
                        </div>
                        <div>
                            <input type="submit" value="Login!" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default LogIn;