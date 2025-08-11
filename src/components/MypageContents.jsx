import {  useState } from "react";
import { useLoginStore } from "../store/logIn_store";
import { AvatarSelector, updateProfileImage } from "../util/pofileImg";

export function EditProfileImg() {
  const { user, login } = useLoginStore();
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  console.log("EditProfileImg 진입");

  const handleSelectAvatar = async (url) => {
    try {
      const updatedUser = await updateProfileImage(url);
      login(updatedUser);
    //   alert("프로필 이미지가 성공적으로 변경되었습니다!");
    } catch (err) {
    //   setError("프로필 이미지 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleAddCustom = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      setIsUploading(true);
      try {
        const publicUrl = await uploadCustomAvatar(file, user.id);
        const updatedUser = await updateProfileImage(publicUrl);
        login(updatedUser);
        alert("커스텀 프로필 이미지가 성공적으로 업로드되었습니다!");
      } catch (err) {
        setError("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
      } finally {
        setIsUploading(false);
      }
    };
    input.click();
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {isUploading && <p>업로드 중...</p>}
      <h3>이미지를 클릭해 프로필 이미지를 변경하세요</h3>
      <AvatarSelector
        onSelect={handleSelectAvatar}
        onAddCustom={handleAddCustom}
      />
    </div>
  );
}
export function UserInfo() {
  const { user } = useLoginStore();
  const data = user?.user_metadata;

  const handleChangePassword = () => {
    console.log("change password");
  };

  return (
    <>
      <div className="email">{data.email}</div>
      <div className="user_name">{data.userName}</div>
      <div className="change_password" onClick={() => handleChangePassword()}>
        비밀번호 변경
      </div>
    </>
  );
}
export function MyReview() {
  return <>MyReview</>;
}
export function WishList() {
  return <>WishList</>;
}
export function ServiceCenter() {
  return <>ServiceCenter</>;
}
