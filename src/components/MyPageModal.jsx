import { useLocation, useNavigate } from "react-router-dom";
import { useLoginStore } from "../store/logIn_store";
import styled from "styled-components";
import { Theme } from "../GlobalStyle";

export default function MyPageModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation || {
    pathname: "/",
  };

  const { logout } = useLoginStore();

  const closeModal = () => navigate(backgroundLocation);

  const openMyPage = () => {
    navigate("/mypage");
  };

  const handleLogout = () => {
    logout();
    closeModal();
  };

  return (
    <ModalStyle onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* <button className="close-btn" onClick={closeModal}>
          X
        </button> */}
        <button onClick={openMyPage}>마이페이지</button>
        <button onClick={handleLogout}>로그아웃</button>
      </div>
    </ModalStyle>
  );
}

const ModalStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  /* transition: all 0.2s ease; */

  .modal-content {
    position: absolute;
    top: 6rem;
    right: 2rem;
    border: 1px solid ${Theme("text")};
    background: ${Theme("background")};
    padding: 0.5rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    button {
      font-size: 1.5rem;
      padding: 0.3rem;
    }
  }

  /* .close-btn {
    color: ${Theme("text")};
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: transparent;
    font-size: 1.5rem;
    border: none;
    cursor: pointer;
  } */
`;
