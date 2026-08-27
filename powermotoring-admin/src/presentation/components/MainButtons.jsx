function MainButtons({ label, onClick }) {
  return (
    <div className="w-100  mt-2">
      <button
        className="w-100 p-2"
        style={{
          background: "#26272e",
          color: "white",
          border: "none",
          borderRadius: "10px",
        }}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
}

export default MainButtons;
