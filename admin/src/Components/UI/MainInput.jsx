import { Input } from "antd";

function MainInput({ label, placeholder, onChange, value }) {
  return (
    <div>
      <small>{label}</small>
      <Input placeholder={placeholder} onChange={onChange} value={value} />
    </div>
  );
}

export default MainInput;
