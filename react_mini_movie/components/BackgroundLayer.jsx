export default function BackgroundLayer({ videoId }) {
  if (!videoId) {
    return <div className="fixed inset-0 -z-10 bg-black" />;
  }
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&playlist=${videoId}`;
  return (
    <iframe
      src={embedUrl}
      frameBorder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        objectFit: "cover",
      }}
      title="Background Video"
    />
  );
}
