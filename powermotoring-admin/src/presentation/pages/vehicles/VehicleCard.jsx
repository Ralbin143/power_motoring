function VehicleCard({ image, title, date, onClick }) {
  const Url = import.meta.env.VITE_APP_BASE_URL;
  const imageUrl = `${Url}/mam`;

  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        border: "1px solid #dadada",
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      {imageUrl}
      <img src={imageUrl} alt="" />
      <div>{title}</div>
      <div style={{ fontSize: "12px", color: "#bbbbbb" }}>{date}</div>
    </div>
  );
}

export default VehicleCard;
