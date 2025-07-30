const defaultAvatars = Array.from(
  { length: 17 },
  (_, i) => `/cat-avatars/${String(i + 1).padStart(2, "0")}.jpg`
);

function AvatarSelector({ onSelect }) {
  return (
    <div className="avatar-grid">
      {defaultAvatars.map((url, idx) => (
        <img
          key={idx}
          src={url}
          alt={`Cat ${idx + 1}`}
          onClick={() => onSelect(url)}
          className="avatar-option"
        />
      ))}
    </div>
  );
}

export async function uploadCustomAvatar(file, userId) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}.${fileExt}`;
  const filePath = `avatars/${fileName}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, { upsert: true });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(filePath);

  return publicUrl;
}
