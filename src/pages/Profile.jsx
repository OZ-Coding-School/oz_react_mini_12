import { FaUserCircle } from "react-icons/fa";
import {
  ProfileContainer,
  ProfileInfo,
  ProfileUserName,
  ProfileUserEmail,
} from "../styles/Profile.styles";
import { useSelector } from "react-redux";

function Profile() {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <ProfileContainer>
        <FaUserCircle size="200" color="#ccc" />
        <ProfileInfo>
          <ProfileUserName>{user.userName}</ProfileUserName>
          <ProfileUserEmail>{user.email}</ProfileUserEmail>
        </ProfileInfo>
      </ProfileContainer>
    </>
  );
}

export default Profile;
