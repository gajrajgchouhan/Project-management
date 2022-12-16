import { Nav, NavLink, Bars, NavMenu } from "./navelements";

const Navbar = () => {
    return (
        <Nav>
            <Bars />
            <NavMenu>
                <NavLink to="/Chat" activeStyle>
                    Chat
                </NavLink>
                <NavLink to="/Feed" activeStyle>
                    Feed
                </NavLink>
                <NavLink to="/Projects" activeStyle>
                    Projects
                </NavLink>
                <NavLink to="/Profile" activeStyle>
                    Profile
                </NavLink>
            </NavMenu>
        </Nav>
    );
};

export default Navbar;
