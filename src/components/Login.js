import Notification from "./Notification";

const Login = props => {
    return (
        <div>
            <h2>Log in to application</h2>
            <Notification info={props.info} />
            <form onSubmit={props.onLogin}>
                <div>
                    username
                    <input
                        id="username"
                        type="text"
                        value={props.username}
                        onChange={event => props.setUsername(event.target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        id="password"
                        type="password"
                        value={props.password}
                        onChange={event => props.setPassword(event.target.value)}
                    />
                </div>
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default Login;