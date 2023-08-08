import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <ul>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/pricing">Pricing</NavLink>
      <NavLink to="/product">Product</NavLink>
    </ul>
  );
}

export default Navbar;
