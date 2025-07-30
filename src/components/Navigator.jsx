import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { clearUser } from "../features/user/userSlice";
import {
  NavigatorContainer,
  NavigatorLogo,
  NavLinksContainer,
  UserActions,
} from "./Navigator.styles";
import SearchInput from "./SearchInput";
import { useAuth } from "../supabase/auth/useAuth";

function Navigator() {
  const { user, loading } = useSelector((state) => state.user);
  const { logout } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    dispatch(clearUser());
    navigate("/");
  };

  return (
    <NavigatorContainer>
      <NavigatorLogo onClick={() => navigate("/")}>
        ⬤ <span className="logo-text">Movibrary</span>
      </NavigatorLogo>
      <SearchInput />
      <NavLinksContainer>
        {loading ? (
          <span>Loading...</span>
        ) : user ? (
          <UserActions>
            <Link to="/profile">Hi! {user.userName}</Link>
            <button onClick={handleLogout}>Logout</button>
          </UserActions>
        ) : (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </NavLinksContainer>
    </NavigatorContainer>
  );
}

export default Navigator;
