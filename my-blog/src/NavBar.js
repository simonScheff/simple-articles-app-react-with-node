import { Link, useNavigate } from "react-router-dom";
import useUser from "./hooks/use-user";

const NavBar = () => {
  const {user, logOut} = useUser();
  const navigate = useNavigate();

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/articles">Articles</Link></li>
       {user && <li onClick={() => logOut()} className="logout">Logout</li> }
       {!user && <li onClick={() => navigate('/login')} className="logout">Login</li> }
      </ul>
    </nav>
  );
};

export default NavBar;
