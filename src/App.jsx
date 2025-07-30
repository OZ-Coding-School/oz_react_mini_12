import { Route, Routes } from "react-router-dom";
import { lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "./supabase/auth/useAuth";
import { setUser, clearUser, setLoading } from "./features/user/userSlice";
import { fetchPopularMovie } from "./features/movie/movieThunk";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

const Main = lazy(() => import("./pages/Main"));
const MovieDetail = lazy(() => import("./pages/MovieDetail"));
const Search = lazy(() => import("./pages/Search"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Profile = lazy(() => import("./pages/Profile"));

function App() {
  const dispatch = useDispatch();
  const { getUserInfo } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(setLoading(true));
      const userInfo = await getUserInfo();
      if (userInfo && userInfo.user) {
        dispatch(setUser(userInfo.user));
      } else {
        dispatch(clearUser());
      }
    };

    fetchUser();
    dispatch(fetchPopularMovie());
  }, [dispatch, getUserInfo]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="/detail/:id" element={<MovieDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
