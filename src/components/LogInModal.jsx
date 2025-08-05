import { useLocation, useNavigate } from "react-router-dom";
import LogIn from "../pages/LogIn";
import styled from "styled-components";
import SignUp from "../pages/SignUp";
import { Theme } from "../GlobalStyle";

export default function LoginModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;

  const backgroundLocation = location.state?.backgroundLocation || {
    pathname: "/",
  };

  const closeModal = () => {
    navigate(backgroundLocation);
  };

  const handlePath = (path) => {
    switch (path) {
      case "/login":
        return (
          <LogIn
            backgroundLocation={backgroundLocation}
            closeModal={closeModal}
          />
        );
      case "/signup":
        return (
          <SignUp
            backgroundLocation={backgroundLocation}
            closeModal={closeModal}
          />
        );
      default:
        return <p>잘못된 경로입니다.</p>;
    }
  };

  return (
    <ModalStyle onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeModal}>
          X
        </button>
        {handlePath(pathName)}
      </div>
    </ModalStyle>
  );
}

const ModalStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${Theme("overray")};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  /* transition: all 0.2s ease; */

  .modal-content {
    background: ${Theme("background")};
    padding: 2rem;
    border-radius: 12px;
    min-width: 400px;
    position: relative;
  }

  .close-btn {
    color: ${Theme("text")};
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: transparent;
    font-size: 1.5rem;
    border: none;
    cursor: pointer;
  }
`;
