import React, { useEffect } from "react";
import MainInput from "../../components/MainInput";
import ManufacturerCard from "./ManufacturerCard";
import { Drawer, Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_MANUFACTURE_SLICE_ITEM,
  setManuFacturerDrawerState,
  setManuFacturerId,
  setManuFacturerImage,
  setManuFacturerTitle,
} from "../../../data/store/Manufacturer/ManufacturerSlice";
import ManageManufacturer from "./ManageManufacturer";
import MainButtons from "../../components/MainButtons";

function ManufacturerPage() {
  const dispatch = useDispatch();
  const { drawerState, manufacturerList } = useSelector(
    (state) => state?.manufacturer,
  );

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    dispatch(GET_MANUFACTURE_SLICE_ITEM());
  };

  const editAction = (data) => {
    console.log(data);
    dispatch(setManuFacturerId(data?._id));
    dispatch(setManuFacturerTitle(data?.manufacturerName));
    dispatch(setManuFacturerImage(data?.manufacturerLogo));
    dispatch(setManuFacturerDrawerState(true));
  };

  const addAction = () => {
    dispatch(setManuFacturerDrawerState(true));
    dispatch(setManuFacturerId(""));
    dispatch(setManuFacturerTitle(""));
    dispatch(setManuFacturerImage(""));
  };

  return (
    <div className="main-card">
      <div className="d-flex justify-content-between align-items-center ">
        <div>
          <MainInput.Search placeholder="Eg: Maruti" />
        </div>
        <div style={{ width: "200px" }}>
          <MainButtons label={"Add"} onClick={addAction} />
        </div>
      </div>
      <hr />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto",
          gap: "15px",
        }}
      >
        {manufacturerList && manufacturerList.length > 0 ? (
          manufacturerList.map((item) => (
            <ManufacturerCard
              key={item._id}
              title={item.manufacturerName}
              image={item.manufacturerLogo}
              editAction={() => editAction(item)}
            />
          ))
        ) : (
          <Empty />
        )}
      </div>

      <Drawer
        open={drawerState}
        onClose={() => {
          dispatch(setManuFacturerDrawerState(false));
        }}
      >
        <ManageManufacturer />
      </Drawer>
    </div>
  );
}

export default ManufacturerPage;
