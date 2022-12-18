import { Nav, NavLink, Bars, NavMenu } from "./navelements";

const Navbar = () => {
    return (
        <Nav>
            <Bars />
            <NavMenu>
                <NavLink to="/Chat">Chat</NavLink>
                <NavLink to="/Feed">Feed</NavLink>
                <NavLink to="/Projects">Projects</NavLink>
                <NavLink to="/Profile">Profile</NavLink>
                <NavLink to="/logout">Logout</NavLink>
            </NavMenu>
        </Nav>
    );
};

export default Navbar;
