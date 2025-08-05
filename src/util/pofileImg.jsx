import styled from "styled-components";
import { supabase } from "./supabaseClient";
import { Theme } from "../GlobalStyle";

const defaultAvatars = Array.from(
  { length: 17 },
  (_, i) => `/public/profileImgs/${String(i + 1).padStart(2, "0")}.jpg`
);

export function AvatarSelector({ onSelect, onAddCustom }) {
  return (
    <GridContainer>
      {defaultAvatars.map((url, idx) => (
        <AvatarOption
          key={idx}
          src={url}
          alt={`Cat ${idx + 1}`}
          onClick={() => onSelect(url)}
        />
      ))}
      <AddButton onClick={onAddCustom}>+</AddButton>
    </GridContainer>
  );
}
export async function updateProfileImage(url) {
  try {
    const { data, error } = await supabase.auth.updateUser({
      data: { avatarUrl: url },
    });
    if (error) {
      console.error("Avatar update error:", error);
      throw error;
    }
    return data.user;
  } catch (error) {
    console.error("Failed to update profile image:", error);
    throw error;
  }
}
export async function uploadCustomAvatar(file, userId) {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`; 
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw uploadError;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error("Failed to upload custom avatar:", error);
    throw error;
  }
}


const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
  gap: 2rem;
`;

const AvatarOption = styled.img`
  width: 8rem;
  height: 8rem;
  object-fit: cover;
  border-radius: 0.5rem;
  cursor: pointer;
  border: 1px solid ${Theme("text")};

  &:hover {
    border:2px solid #007bff;
  }
`;

const AddButton = styled.div`
  width: 8rem;
  height: 8rem;
  border: 2px dashed #ccc;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #ccc;
  cursor: pointer;
  &:hover {
    border-color: #007bff;
    color: #007bff;
  }
`;
