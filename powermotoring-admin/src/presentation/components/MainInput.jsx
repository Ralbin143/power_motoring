import { CloseRounded, CloudUploadSharp } from "@mui/icons-material";
import { Input, Select } from "antd";

MainInput.DropDown = function DropDown({ label, list, value, onChange }) {
  return (
    <div className="w-100 d-flex flex-column">
      <small style={{ color: "#b9b9b9" }}>{label}</small>
      <Select
        options={list}
        value={value}
        onChange={onChange}
        className="w-100 p-2"
      />
    </div>
  );
};

MainInput.Image = function Image({ image, clearImage }) {
  return (
    <div
      style={{
        position: "relative",
        border: "1px dashed #dadada",

        borderRadius: "10px",
      }}
    >
      {image ? (
        <div>
          <img
            src={image}
            style={{ width: "100%", height: "100%", borderRadius: "10px" }}
          />
        </div>
      ) : (
        <div
          style={{
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <CloudUploadSharp style={{ fontSize: "60px" }} />
          <div
            className="text-secondary text-center"
            style={{ fontSize: "12px" }}
          >
            Browse images from your computer
          </div>
        </div>
      )}
      <Input
        type="file"
        accept="image/*"
        style={{
          cursor: "pointer",
          background: "red",
          opacity: 0,
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
        }}
      />
      {image && (
        <CloseRounded
          style={{
            cursor: "pointer",
            background: "red",
            position: "absolute",
            top: "0",
            right: "0",
            borderRadius: "10px",
          }}
          onClick={() => {
            clearImage();
          }}
        />
      )}
    </div>
  );
};

MainInput.Password = function Password({ label, value, onChange }) {
  return (
    <div className="w-100">
      <small style={{ color: "#b9b9b9" }}>{label}</small>
      <Input.Password className="w-100 p-2" value={value} onChange={onChange} />
    </div>
  );
};

MainInput.Date = function Date() {
  return <Input type="date" className="w-100" />;
};

MainInput.Search = function Search({ placeholder }) {
  return <Input.Search className="w-100 p-2" placeholder={placeholder} />;
};

function MainInput({ label, value, onChange }) {
  return (
    <div className="w-100">
      <small style={{ color: "#b9b9b9" }}>{label}</small>
      <Input className="w-100 p-2" value={value} onChange={onChange} />
    </div>
  );
}

export default MainInput;
