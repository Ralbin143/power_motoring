import React, { useEffect, useState } from "react";
import { Breadcrumbs, Button, FormControl, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { LoadingButton } from "@mui/lab";
import { imageInstance } from "../../Const/ApiHeader";
import {
  ADD_MANUFACTURER,
  ALL_MANUFACTURER,
  IMAGE_BASE_URL,
  UPDATE_MANUFACTURER,
} from "../../Const/ApiConst";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

function Maufacturers() {
  const [manufacturerData, setManufacturerData] = useState([]);
  const [updateId, setUpdateId] = useState("");

  const [openAddManufacturer, setopenAddManufacturer] = React.useState(false);
  const handleopenAddManufacturer = () => setopenAddManufacturer(true);
  const handleCloseAddManufacturer = () => setopenAddManufacturer(false);

  const [openUpdateManufacturer, setopenUpdateManufacturer] =
    React.useState(false);
  const handleCloseUpdateManufacturer = () => setopenUpdateManufacturer(false);

  const [manufactLogo, setManufactLogo] = useState("");

  const handleopenUpdateManufacturer = (id, data, logo) => {
    setManufactname(data);
    setUpdateId(id);
    setManufactLogo(logo);
    setopenUpdateManufacturer(true);
  };

  const [manufactname, setManufactname] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Save Action
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const saveManufact = async () => {
    if (!selectedFile) {
      return;
    }
    try {
      setSaveLoading(true);
      const formData = new FormData();
      formData.append("manufactname", manufactname);
      formData.append("logo", selectedFile);

      await imageInstance
        .post(ADD_MANUFACTURER, formData)
        .then((response) => {
          setSaveLoading(false);
          loadManufacturer();
          handleCloseAddManufacturer();
          setSelectedFile(null);
        })
        .catch((err) => {
          setSaveLoading(false);
          console.log(err);
        });
    } catch (error) {
      setSaveLoading(false);
      console.log(error);
    }
  };

  const updateManufacturer = () => {
    setSaveLoading(true);

    const formData = new FormData();
    formData.append("id", updateId);
    formData.append("manufactname", manufactname);
    formData.append("logo", selectedFile);
    try {
      imageInstance.post(UPDATE_MANUFACTURER, formData).then((response) => {
        setSaveLoading(false);
        loadManufacturer();
        handleCloseUpdateManufacturer();
        setSelectedFile(null);
      });
    } catch (error) {
      setSaveLoading(false);
    }
  };

  const loadManufacturer = async () => {
    try {
      await imageInstance
        .post(ALL_MANUFACTURER)
        .then((response) => {
          setManufacturerData(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadManufacturer();
  }, []);

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" className="mb-3">
        <Link to="/" underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography>Manufacturers</Typography>
      </Breadcrumbs>
      <div className="section">
        <Button variant="contained" onClick={handleopenAddManufacturer}>
          Add Manufacturer
        </Button>
      </div>
      <div className="section">
        <Table>
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Manufacturer Logo</th>
              <th>Manufacturer name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {manufacturerData.map((res, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <img
                    src={`${IMAGE_BASE_URL}manufacturers/${res.manufacturerLogo}`}
                    height={60}
                    alt=""
                  />
                </td>
                <td>{res.manufacturerName}</td>
                <td>
                  <Button
                    size="small"
                    variant="contained"
                    color="warning"
                    onClick={() =>
                      handleopenUpdateManufacturer(
                        res._id,
                        res.manufacturerName,
                        res.manufacturerLogo
                      )
                    }
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Add Modal */}
      <Modal
        open={openAddManufacturer}
        onClose={handleCloseAddManufacturer}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormControl className="mt-2">Manufacturer Logo</FormControl>
          {selectedFile ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              width={200}
              height={200}
              alt=""
            />
          ) : (
            <div>
              <img
                src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
                width={200}
                height={200}
                alt=""
              />
            </div>
          )}
          <input type="file" onChange={handleFileChange} />
          <FormControl className="mt-2">Manufacturer Name</FormControl>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setManufactname(e.target.value)}
          />
          <div className="text-center">
            <LoadingButton
              loading={saveLoading}
              variant="contained"
              color="success"
              className="mt-4"
              onClick={() => saveManufact()}
            >
              Save
            </LoadingButton>
          </div>
        </Box>
      </Modal>

      {/* Update Modal */}
      <Modal
        open={openUpdateManufacturer}
        onClose={handleCloseUpdateManufacturer}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormControl className="mt-2">Manufacturer Logo</FormControl>
          {manufactLogo ? (
            <div className="d-flex">
              <img
                src={`${IMAGE_BASE_URL}manufacturers/${manufactLogo}`}
                width={200}
                height={200}
                alt=""
              />
            </div>
          ) : (
            <div>
              <img
                src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
                width={200}
                height={200}
                alt=""
              />
            </div>
          )}
          {selectedFile ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              width={200}
              height={200}
              alt=""
            />
          ) : null}
          <input type="file" onChange={handleFileChange} />
          <FormControl className="mt-2">Manufacturer Name</FormControl>
          <input
            type="text"
            defaultValue={manufactname}
            onChange={(e) => setManufactname(e.target.value)}
            className="form-control"
          />
          <div className="text-center">
            <LoadingButton
              variant="contained"
              color="success"
              className="mt-4"
              onClick={() => updateManufacturer()}
            >
              Update
            </LoadingButton>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Maufacturers;
