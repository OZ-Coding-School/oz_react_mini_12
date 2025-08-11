import styled from "styled-components";
import { Theme } from "../GlobalStyle";
import { useLoginStore } from "../store/logIn_store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  EditProfileImg,
  MyReview,
  ServiceCenter,
  UserInfo,
  WishList,
} from "../components/MypageContents";

export default function MyPage() {
  const { isLogIn, user, logout } = useLoginStore();
  const [content, setContent] = useState("user_info");

  const data = user?.user_metadata;
  console.log("data:", data);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogIn) {
      navigate("/");
      navigate("/login", { state: { backgroundLocation: "/" } });
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleContent = (content) => {
    setContent(content);
    // console.log("content:", content);
  };

  return (
    <MyPageContainer>
      <div className="config_bar">
        <img
          className="profile_img"
          src={data?.avatarUrl}
          alt="profile_img"
          onClick={() => handleContent("edit_profile_img")}
          title="프로필 이미지 변경"
        ></img>
        <p className="user_name">{data?.userName}님</p>
        <div className="user_info" onClick={() => handleContent("user_info")}>
          회원 정보
        </div>
        <div className="my_review" onClick={() => handleContent("my_review")}>
          나의 리뷰
        </div>
        <div className="wish_list" onClick={() => handleContent("wish_list")}>
          찜 목록
        </div>
        <div
          className="service_center"
          onClick={() => handleContent("service_center")}
        >
          고객 센터
        </div>
        <div onClick={() => handleLogout()}>로그아웃</div>
      </div>
      <div className="config_content">
        <ConfigContent param={content} />
      </div>
    </MyPageContainer>
  );
}

const MyPageContainer = styled.div`
  background-color: ${Theme("background")};
  display: flex;
  flex: 1;

  .config_bar {
    display: flex;
    flex-direction: column;
    width: 20rem;
    height: 50.9rem;
    gap: 2rem;
    padding: 2rem;
    padding-top: 4rem;
    align-items: center;
    border-right: 1px solid ${Theme("text")};

    .profile_img {
      width: 6rem;
      height: 6rem;
      border-radius: 50%;
      cursor: pointer;
    }
    div {
      padding: 1rem;
      cursor: pointer;
      border: 1px solid ${Theme("text")};
      color: ${Theme("text")};
      width: 10rem;
      text-align: center;
      transition: all 0.1s ease;
      &:hover {
        background-color: ${Theme("cardBG")};
      }
    }
  }

  .config_content {
    padding:2rem;
    flex: 1;
  }
`;

function ConfigContent({param}) {
  switch (param) {
    case "edit_profile_img":
      return <EditProfileImg />;
    case "user_info":
      return <UserInfo />;
    case "my_review":
      return <MyReview />;
    case "wish_list":
      return <WishList />;
    case "service_center":
      return <ServiceCenter />;
    default:
      return <UserInfo />;
  }
}
