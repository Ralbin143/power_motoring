import { Spin } from "antd";
import { useRef, useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { imageInstance } from "../../Const/ApiHeader";
import { UPLOAD_URL } from "../../Const/ApiConst";

function ImageUploader({ onChange, image }) {
  const [isLoading, setIsLoading] = useState(false);

  const fileRef = useRef(null);

  const handleFileSelect = () => {
    if (!isLoading) {
      fileRef.current.click();
    }
  };

  const uploadAction = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setIsLoading(true);
      const result = await imageInstance.post(UPLOAD_URL, formData);
      onChange(result.data);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsLoading(false);

      e.target.value = "";
    }
  };

  return (
    <div
      className="w-100 text-center"
      style={{
        border: "1px dashed #dadada",
        padding: "10px",
        borderRadius: "10px",
        cursor: isLoading ? "not-allowed" : "pointer",
      }}
      onClick={handleFileSelect}
    >
      <input
        type="file"
        accept="image/*"
        ref={fileRef}
        hidden
        onChange={uploadAction}
      />

      {isLoading ? (
        <Spin />
      ) : image ? (
        <img src={image} style={{ height: "100px" }} />
      ) : (
        <div className="d-flex align-items-center justify-content-center gap-2">
          <IoMdCloudUpload style={{ color: "blue", fontSize: "30px" }} />
          <span>Upload Image</span>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
