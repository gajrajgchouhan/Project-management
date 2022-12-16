
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './navelements';

const Navbar = () => {
return (
	<>
	<Nav>
		<Bars />
		<NavMenu>
		<NavLink to='/Feed' activeStyle>
			Feed
		</NavLink>
		<NavLink to='/Projects' activeStyle>
			Projects
		</NavLink>
		<NavLink to='/Profile' activeStyle>
			Profile
		</NavLink>
		</NavMenu>
	</Nav>
	</>
);
};

export default Navbar;

