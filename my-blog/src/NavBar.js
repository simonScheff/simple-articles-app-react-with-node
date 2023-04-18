import { Link, useNavigate } from "react-router-dom";

const NavBar = ({ isLoading, logOut, userData }) => {
  const navigate = useNavigate();
  return (
    <nav>
      {!isLoading && (
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/articles">Articles</Link>
          </li>
          {userData && (
            <>
              <li onClick={() => logOut()} className="logout">
                Logout
              </li>
              <li className="userName">Hello {userData.userName}</li>
            </>
          )}
          {!userData && (
            <li onClick={() => navigate("/login")} className="logout">
              Login
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
