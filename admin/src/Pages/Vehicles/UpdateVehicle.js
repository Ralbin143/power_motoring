import {
  Box,
  Breadcrumbs,
  Button,
  FormControl,
  FormLabel,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { instance } from "../../Const/ApiHeader";
import {
  ALL_MANUFACTURER,
  GET_SINGLE_VEHICLE,
  UPDATE_VEHICLE,
} from "../../Const/ApiConst";
import { AiFillCloseCircle } from "react-icons/ai";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import { IoIosSave } from "react-icons/io";
import UpdatePageLoader from "../../Components/Loaders/UpdatePageLoader";

const noImage =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAIjAiMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD2zzP9lP8AvmjzP9lP++aZRQA/zP8AZT/vmjzP9lP++aZRQA/zP9lP++aPM/2U/wC+aZRQA/zP9lP++aPM/wBlP++aZRQA/wAz/ZT/AL5o8z/ZT/vmmUUAP8z/AGU/75o8z/ZT/vmmUUAP8z/ZT/vmjzP9lP8AvmmUUAP8z/ZT/vmjzP8AZT/vmmUUAP8AM/2U/wC+aPM/2U/75plFAD/M/wBlP++aPM/2U/75plFAD/M/2U/75o8z/ZT/AL5plFAD/M/2U/75o8z/AGU/75plFAD/ADP9lP8AvmjzP9lP++aZRQA/zP8AZT/vmjzP9lP++aZRQA/zP9lP++aPM/2U/wC+aZRQA/zP9lP++aPM/wBlP++aZRQA/wAz/ZT/AL5o8z/ZT/vmmUUAP8z/AGU/75o8z/ZT/vmmUUAP8z/ZT/vmjzP9lP8AvmmUUAP8z/ZT/vmjzP8AZT/vmmUUAP8AM/2U/wC+aPM/2U/75plFAD/M/wBlP++aPM/2U/75plFAD/M/2U/75o8z/ZT/AL5plFAD/M/2U/75o8z/AGU/75plFAD/ADP9lP8AvmjzP9lP++aZRQA/zP8AZT/vmjzP9lP++aZRQA/zP9lP++aPM/2U/wC+aZRQA/zP9lP++aPM/wBlP++aZRQA/wAz/ZT/AL5o8z/ZT/vmmUUAP8z/AGU/75o8z/ZT/vmmUUAP8z/ZT/vmjzP9lP8AvmmUUAP8z/ZT/vmjzP8AZT/vmmUUAP8AM/2U/wC+aPM/2U/75plFAD/M/wBlP++aPM/2U/75plFAD/M/2U/75oplFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUU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RQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAP81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKPNf1H5CiigA81/UfkKKKKAP//Z";

function UpdateVehicle() {
  const Navigate = useNavigate();

  const params = useParams();
  const imageSourceRef = useRef(null);
  const [saveVehicleLoading, setSaveVehicleLoading] = useState(false);
  const [vehicleColors, setVehicleColors] = useState([]);
  const [colors, setColors] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleCategory, setVehicleCategory] = useState("Hatchback");
  const [engine, setEngine] = useState("");
  const [maxPower, setMaxPower] = useState("");
  const [maxTorque, setMaxTorque] = useState("");
  const [groundClearence, setGroundClearence] = useState("");
  const [turningRadius, setTurningRadius] = useState("");
  const [fuelTank, setFuelTank] = useState("");
  const [wheelbase, setWheelbase] = useState("");
  const [bootspace, setBootspace] = useState("");
  const [diemention, setDiemention] = useState("");
  const [manufacturerData, setManufacturerData] = useState([]);
  const [value, setValue] = React.useState("0");
  const [tablist, setTablist] = useState([]);
  const [tabItemName, setTabItemName] = useState("");
  const [currentVariantList, setCurrentVariantList] = useState([]);
  const [currentFeatureAction, setcurrentFeatureAction] = useState("");
  const [vehicleImage, setVehicleImage] = useState(noImage);
  const [imageType, setImageType] = useState("Colors");
  const [manufacturerType, setManufacturerType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [Milage, setMilage] = useState("");
  const [typreSize, setTypreSize] = useState("");
  const [vehicleTitle, setVehicleTitle] = useState("");
  const [engineType, setEngineType] = useState("ICE");

  //   EV States
  const [chargingOptions, setChargingOptions] = useState("");
  const [regenMods, setRegenMods] = useState("");
  const [batteryCooling, setBatteryCooling] = useState("");
  const [batteryType, setBatteryType] = useState("");
  const [batteryVoltage, setBatteryVoltage] = useState("");
  const [motorType, setMotorType] = useState("");
  const [totalSystemMaxPower, setTotalSystemMaxPower] = useState("");
  const [frontSuspension, setFrontSuspension] = useState("");
  const [rearSuspension, setRearSuspension] = useState("");
  const [driveTrain, setDriveTrain] = useState("");
  const [accelaration, setAccelaration] = useState("");
  const [hybridType, setHybridType] = useState("");
  const [batterySafetyRating, setBatterySafetyRating] = useState("");
  const [totalSystemMaxTorque, setTotalSystemMaxTorque] = useState("");
  const [motorPower, setMotorPower] = useState("");
  const [motorTorque, setMotorTorque] = useState("");
  const [chargingTime, setChargingTime] = useState("");

  const loadVehicle = async () => {
    setIsLoading(true);
    const data = {
      id: params.id,
    };
    instance
      .post(GET_SINGLE_VEHICLE, data)
      .then((response) => {
        setVehicleImage(response.data[0].vehicleImage);
        setManufacturerType(response.data[0].manufacturerType);
        setVehicleName(response.data[0].vehicle_name);
        setEngine(response.data[0].engineCC);
        setMaxPower(response.data[0].maxPower);
        setMaxTorque(response.data[0].maxTorque);
        setGroundClearence(response.data[0].groundClearence);
        setTurningRadius(response.data[0].turningRadius);
        setFuelTank(response.data[0].FuelTank);
        setWheelbase(response.data[0].wheelBase);
        setBootspace(response.data[0].bootspace);
        setDiemention(response.data[0].dimention);
        setVehicleColors(response.data[0].images);
        setMilage(response.data[0].milage);
        setTypreSize(response.data[0].tyreSize);
        setVehicleCategory(response.data[0].vehicleCategory);
        setVehicleTitle(response.data[0].vehicleTitleText);
        setEngineType(response.data[0].engineType);

        setChargingOptions(response.data[0].chargingOptions);
        setRegenMods(response.data[0].regenMods);
        setBatteryCooling(response.data[0].batteryCooling);
        setBatteryType(response.data[0].batteryType);
        setBatteryVoltage(response.data[0].batteryVoltage);
        setMotorType(response.data[0].motorType);
        setTotalSystemMaxPower(response.data[0].totalSystemMaxPower);
        setFrontSuspension(response.data[0].frontSuspension);
        setRearSuspension(response.data[0].rearSuspension);
        setDriveTrain(response.data[0].driveTrain);
        setAccelaration(response.data[0].accelaration);
        setHybridType(response.data[0].hybridType);
        setBatterySafetyRating(response.data[0].batterySafetyRating);
        setTotalSystemMaxTorque(response.data[0].totalSystemMaxTorque);
        setMotorPower(response.data[0].motorPower);
        setMotorTorque(response.data[0].motorTorque);
        setChargingTime(response.data[0].chargingTime);
        // Create a set of unique variants
        const uniqueVariants = Array.from(
          new Set(response.data[0].variantList.map((item) => item.variant))
        );

        setTablist(uniqueVariants);
        setCurrentVariantList(response.data[0].variantList);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const loadManufactureres = () => {
    try {
      instance
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

  const setVehilceImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setVehicleImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImageItem = (i) => {
    const updatedItems = [...vehicleColors];
    updatedItems.splice(i, 1);
    setVehicleColors(updatedItems);
  };

  const addColorAction = () => {
    // const selectedFiles = e.target.files;
    const file = imageSourceRef.current.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setVehicleColors([
          ...vehicleColors,
          {
            imageType: imageType,
            name: colors,
            imagePreview: reader.result,
          },
        ]);
        setColors("");
        imageSourceRef.current.value = null;
      };
      reader.readAsDataURL(file);
    } else {
      alert("Pick image");
    }
  };

  const addTabItem = () => {
    if (tabItemName !== "") {
      const newTablist = tablist || [];
      setTablist([...newTablist, tabItemName]);
      setTabItemName("");
    } else {
      alert("Enter varient name");
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const deleteVarient = (i, res) => {
    const updatedItems = [...tablist];
    updatedItems.splice(i, 1);
    setTablist(updatedItems);
    const filteredItems = currentVariantList.filter(
      (item) => item.variant !== res
    );
    setCurrentVariantList(filteredItems);
    setValue("0");
  };

  const deleteFeatureAction = (i) => {
    const newArray = [...currentVariantList];
    newArray.splice(i, 1);
    setCurrentVariantList(newArray);
  };

  const addTempVariantAction = (e) => {
    const newList = currentVariantList || [];
    const data = {
      feature: currentFeatureAction,
      variant: e.target.value,
    };
    setCurrentVariantList([...newList, data]);
    setcurrentFeatureAction("");
  };

  const saveAction = async () => {
    const data = {
      id: params.id,
      manufacturerType: manufacturerType,
      vehicleImage: vehicleImage,
      vehicleName: vehicleName,
      vehicleTitle: vehicleTitle,
      engine: engine,
      maxPower: maxPower,
      maxTorque: maxTorque,
      groundClearence: groundClearence,
      turningRadius: turningRadius,
      fuelTank: fuelTank,
      wheelbase: wheelbase,
      bootspace: bootspace,
      diemention: diemention,
      images: vehicleColors,
      variantList: currentVariantList,
      milage: Milage,
      tyreSize: typreSize,
      vehicleCategory: vehicleCategory,
      engineType: engineType,
      chargingOptions: chargingOptions,
      regenMods: regenMods,
      batteryCooling: batteryCooling,
      batteryType: batteryType,
      batteryVoltage: batteryVoltage,
      motorType: motorType,
      totalSystemMaxPower: totalSystemMaxPower,
      totalSystemMaxTorque: totalSystemMaxTorque,
      frontSuspension: frontSuspension,
      rearSuspension: rearSuspension,
      driveTrain: driveTrain,
      accelaration: accelaration,
      hybridType: hybridType,
      batterySafetyRating: batterySafetyRating,
      motorPower: motorPower,
      motorTorque: motorTorque,
      chargingTime: chargingTime,
    };
    try {
      setSaveVehicleLoading(true);
      await instance
        .post(UPDATE_VEHICLE, data)
        .then((reponse) => {
          console.log(reponse);
          setSaveVehicleLoading(false);
          Navigate("/vehicles");
        })
        .catch((err) => {
          setSaveVehicleLoading(false);
          console.log(err);
        });
    } catch (error) {
      setSaveVehicleLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    loadVehicle();
    loadManufactureres();
    // eslint-disable-next-line
  }, []);

  return isLoading ? (
    <UpdatePageLoader />
  ) : (
    <div>
      <Breadcrumbs aria-label="breadcrumb" className="mb-3">
        <Link to="/" underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link to="/vehicles" underline="hover" color="inherit" href="/">
          Vehicles
        </Link>
        <Typography>Update Vehicle</Typography>
      </Breadcrumbs>
      <div className="d-flex gap-4">
        <div className="section" style={{ width: "250px" }}>
          <img
            src={vehicleImage}
            style={{
              border: "1px solid #e0e0e0",
              height: "230px",
              width: "230px",
              objectFit: "cover",
            }}
            alt=""
          />
          <input
            type="file"
            onChange={(e) => setVehilceImage(e)}
            className="mt-4 form-file"
          />
        </div>
        <div className="section">
          <div className="mb-2">
            <strong>Vehicle Details</strong>
          </div>
          <div className="w-100">
            <FormControl className="w-100">
              <FormControl className="text-secondary">
                Select Manufacturer
              </FormControl>
              <select
                className="form-select"
                value={manufacturerType}
                onChange={(e) => setManufacturerType(e.target.value)}
              >
                {manufacturerData.map((res, i) => (
                  <option key={i}>{res.manufacturerName}</option>
                ))}
              </select>
            </FormControl>
            <FormControl className="mt-2 w-100">
              <FormControl className="text-secondary">Vehicle Name</FormControl>
              <input
                type="text"
                value={vehicleName}
                className="w-100 form-control"
                onChange={(e) => setVehicleName(e.target.value)}
              />
            </FormControl>
            <FormControl className="mt-2 w-100">
              <FormControl className="text-secondary">
                Vehicle Title Text
              </FormControl>
              <input
                type="text"
                value={vehicleTitle}
                className="w-100 form-control"
                onChange={(e) => setVehicleTitle(e.target.value)}
              />
            </FormControl>
            <FormControl className="mt-2 w-100">
              <FormControl className="text-secondary">
                Vehicle Category
              </FormControl>
              <select
                className="form-select"
                onChange={(e) => setVehicleCategory(e.target.value)}
              >
                <option hidden>{vehicleCategory}</option>
                <option>Hatchback</option>
                <option>SUV</option>
                <option>Sedan</option>
                <option>MPV</option>
                <option>MUV</option>
                <option>Commercial</option>
              </select>
            </FormControl>
            <FormControl className="mt-2 w-100">
              <FormControl className="text-secondary">Power Train</FormControl>
              <select
                className="form-select"
                onChange={(e) => setEngineType(e.target.value)}
              >
                <option hidden>{engineType}</option>
                <option>ICE</option>
                <option>Electric</option>
                <option>Hybrid</option>
              </select>
            </FormControl>
          </div>
        </div>
        <div className="section">
          <div className=" mt-4 mb-2">
            <strong>Engine Specification</strong>
            <hr style={{ margin: "0" }} />
          </div>
          <div className="add_vehicle_container">
            <FormControl>
              <FormControl className="text-secondary">
                {" "}
                {engineType === "Electric" ? "Battery Capacity" : "Engine CC"}
                {/* Engine Size (CC){" "} */}
              </FormControl>
              <input
                value={engine}
                type="text"
                className="form-control"
                onChange={(e) => setEngine(e.target.value)}
              />
            </FormControl>
            {engineType === "Electric" ? (
              <FormControl>
                <FormControl className="text-secondary">
                  Motor Type
                  {/* Engine Size (CC){" "} */}
                </FormControl>
                <input
                  value={motorType}
                  type="text"
                  className="form-control"
                  onChange={(e) => setMotorType(e.target.value)}
                />
              </FormControl>
            ) : null}
            <FormControl>
              <FormControl className="text-secondary">
                {" "}
                Maximum Power{" "}
              </FormControl>
              <input
                value={maxPower}
                type="text"
                className="form-control"
                onChange={(e) => setMaxPower(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormControl className="text-secondary">
                {" "}
                Maximum Torque{" "}
              </FormControl>
              <input
                value={maxTorque}
                type="text"
                className="form-control"
                onChange={(e) => setMaxTorque(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormControl className="text-secondary"> Tyre Size</FormControl>
              <input
                value={typreSize}
                type="text"
                className="form-control"
                onChange={(e) => setTypreSize(e.target.value)}
              />
            </FormControl>
          </div>
          <div className=" mt-4 mb-2">
            <strong>Dimensions</strong>
            <hr style={{ margin: "0" }} />
          </div>
          <div className="add_vehicle_container">
            <FormControl>
              <div className="d-flex align-items-center gap-2">
                <FormControl className="text-secondary"> Dimension</FormControl>
                <div style={{ fontSize: "10px" }}> (L x W x H) </div>
              </div>
              <input
                value={diemention}
                type="text"
                className="form-control"
                onChange={(e) => setDiemention(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormControl className="text-secondary"> Wheel base </FormControl>
              <input
                value={wheelbase}
                type="text"
                className="form-control"
                onChange={(e) => setWheelbase(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormControl className="text-secondary"> Boot space </FormControl>
              <input
                value={bootspace}
                type="text"
                className="form-control"
                onChange={(e) => setBootspace(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormControl className="text-secondary">
                {" "}
                Turning Radius{" "}
              </FormControl>
              <input
                value={turningRadius}
                type="text"
                className="form-control"
                onChange={(e) => setTurningRadius(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormControl className="text-secondary">
                {" "}
                Ground Clearence{" "}
              </FormControl>
              <input
                value={groundClearence}
                type="text"
                className="form-control"
                onChange={(e) => setGroundClearence(e.target.value)}
              />
            </FormControl>
          </div>

          <div className=" mt-4 mb-2">
            {engineType === "Electric" ? (
              <strong>Charging Options</strong>
            ) : (
              <strong>Fuel</strong>
            )}
            <hr style={{ margin: "0" }} />
            <div className="add_vehicle_container">
              <FormControl>
                <FormControl className="text-secondary">
                  {" "}
                  {engineType === "Electric"
                    ? "Charging Time"
                    : "Fuel Tank Capacity"}
                </FormControl>
                <input
                  value={fuelTank}
                  type="text"
                  className="form-control"
                  onChange={(e) => setFuelTank(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormControl className="text-secondary">
                  {engineType === "Electric" ? "Range" : "Mileage"}
                </FormControl>
                <input
                  value={Milage}
                  type="text"
                  className="form-control"
                  onChange={(e) => setMilage(e.target.value)}
                />
              </FormControl>
              {engineType === "Electric" ? (
                <FormControl>
                  <div className="d-flex align-items-center gap-2">
                    <FormControl className="text-secondary">
                      {" "}
                      Charging Options
                    </FormControl>
                  </div>
                  <input
                    value={chargingOptions}
                    type="text"
                    className="form-control"
                    onChange={(e) => setChargingOptions(e.target.value)}
                  />
                </FormControl>
              ) : null}
            </div>
            <div className=" mt-4 mb-2">
              <strong>Suspension</strong>
              <hr style={{ margin: "0" }} />
            </div>
            <div className="add_vehicle_container">
              <FormControl>
                <FormControl className="text-secondary">
                  Front Suspension
                </FormControl>
                <input
                  value={frontSuspension}
                  type="text"
                  className="form-control"
                  onChange={(e) => setFrontSuspension(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormControl className="text-secondary">
                  Rear Suspension
                </FormControl>
                <input
                  value={rearSuspension}
                  type="text"
                  className="form-control"
                  onChange={(e) => setRearSuspension(e.target.value)}
                />
              </FormControl>
            </div>
            {engineType === "Electric" ? (
              <>
                <div className=" mt-4 mb-2">
                  <strong>Battery</strong>
                  <hr style={{ margin: "0" }} />
                </div>
                <div className="add_vehicle_container">
                  <FormControl>
                    <div className="d-flex align-items-center gap-2">
                      <FormControl className="text-secondary">
                        {" "}
                        Battery Type
                      </FormControl>
                    </div>
                    <input
                      value={batteryType}
                      type="text"
                      className="form-control"
                      onChange={(e) => setBatteryType(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <div className="d-flex align-items-center gap-2">
                      <FormControl className="text-secondary">
                        {" "}
                        Battery Cooling
                      </FormControl>
                    </div>
                    <input
                      value={batteryCooling}
                      type="text"
                      className="form-control"
                      onChange={(e) => setBatteryCooling(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <div className="d-flex align-items-center gap-2">
                      <FormControl className="text-secondary">
                        {" "}
                        Battery Safety Rating
                      </FormControl>
                    </div>
                    <input
                      value={batterySafetyRating}
                      type="text"
                      className="form-control"
                      onChange={(e) => setBatterySafetyRating(e.target.value)}
                    />
                  </FormControl>
                </div>
              </>
            ) : null}
            {engineType === "Hybrid" ? (
              <>
                <div className=" mt-4 mb-2">
                  <strong>Hybrid</strong>
                  <hr style={{ margin: "0" }} />
                </div>
                <div className="add_vehicle_container">
                  <FormControl>
                    <div className="d-flex align-items-center gap-2">
                      <FormControl className="text-secondary">
                        {" "}
                        Hybrid Type
                      </FormControl>
                    </div>
                    <input
                      value={hybridType}
                      type="text"
                      className="form-control"
                      onChange={(e) => setHybridType(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <div className="d-flex align-items-center gap-2">
                      <FormControl className="text-secondary">
                        {" "}
                        Battery Type
                      </FormControl>
                    </div>
                    <input
                      value={batteryType}
                      type="text"
                      className="form-control"
                      onChange={(e) => setBatteryType(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <div className="d-flex align-items-center gap-2">
                      <FormControl className="text-secondary">
                        {" "}
                        Battery Voltage
                      </FormControl>
                    </div>
                    <input
                      value={batteryVoltage}
                      type="text"
                      className="form-control"
                      onChange={(e) => setBatteryVoltage(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <div className="d-flex align-items-center gap-2">
                      <FormControl className="text-secondary">
                        {" "}
                        Motor Power
                      </FormControl>
                    </div>
                    <input
                      value={motorPower}
                      type="text"
                      className="form-control"
                      onChange={(e) => setMotorPower(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <div className="d-flex align-items-center gap-2">
                      <FormControl className="text-secondary">
                        {" "}
                        Motor Torque
                      </FormControl>
                    </div>
                    <input
                      value={motorTorque}
                      type="text"
                      className="form-control"
                      onChange={(e) => setMotorTorque(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <div className="d-flex align-items-center gap-2">
                      <FormControl className="text-secondary">
                        {" "}
                        Total System Max Power
                      </FormControl>
                    </div>
                    <input
                      value={totalSystemMaxPower}
                      type="text"
                      className="form-control"
                      onChange={(e) => setTotalSystemMaxPower(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <div className="d-flex align-items-center gap-2">
                      <FormControl className="text-secondary">
                        {" "}
                        Total System Max Torque
                      </FormControl>
                    </div>
                    <input
                      value={totalSystemMaxTorque}
                      type="text"
                      className="form-control"
                      onChange={(e) => setTotalSystemMaxTorque(e.target.value)}
                    />
                  </FormControl>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div className="section">
        <strong>Available Photos (Colors, Interior Etc...)</strong>
        <div className="d-flex gap-4 p-2" style={{ overflow: "auto" }}>
          {vehicleColors.map((res, i) => (
            <div
              key={i}
              className="d-flex align-items-center flex-column"
              style={{ position: "relative" }}
            >
              <img
                src={res.imagePreview}
                alt=""
                className="add-color-image-preview"
              />
              <div>{res.color}</div>
              <div
                className="position-close-btn"
                onClick={() => removeImageItem(i)}
              >
                <AiFillCloseCircle />
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex gap-4 align-items-center mt-4">
          <FormLabel>Image Type</FormLabel>
          <select
            className="form-select"
            onChange={(e) => setImageType(e.target.value)}
          >
            <option>Colors</option>
            <option>Interior</option>
            <option>Exterior</option>
            <option>Other</option>
          </select>
          <TextField
            value={colors}
            size="small"
            fullWidth
            label="Image Name"
            onChange={(e) => setColors(e.target.value)}
          />
          <input
            size="small"
            type="file"
            label="image"
            className="w-100"
            ref={imageSourceRef}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={() => addColorAction()}
          >
            {" "}
            Add new image
          </Button>
        </div>
      </div>
      {/* Dynamic Tabs */}
      <div className="section">
        <div className="m-4">
          <TextField
            size="small"
            label="Variant Name"
            onChange={(e) => setTabItemName(e.target.value)}
          />{" "}
          <Button variant="contained" onClick={() => addTabItem()}>
            Add
          </Button>
        </div>

        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                {tablist.map((res, i) => (
                  <Tab label={res} value={i.toString()} key={i} />
                ))}
              </TabList>
            </Box>
            {tablist.map((res, i) => (
              <TabPanel value={i.toString()} key={i}>
                <Button
                  variant="contained"
                  color="error"
                  style={{ float: "right" }}
                  onClick={() => deleteVarient(i, res)}
                >
                  Delete this variant
                </Button>
                <div>
                  {currentVariantList.map(
                    (resx, ix) =>
                      resx.variant === res ? (
                        <div
                          className="d-flex align-items-center m-4"
                          style={{ cursor: "pointer" }}
                          key={ix}
                        >
                          <div
                            className="text-danger me-4"
                            onClick={() => deleteFeatureAction(ix)}
                          >
                            <HighlightOffIcon />
                          </div>
                          <span>{resx.feature}</span>
                        </div>
                      ) : (
                        ""
                      )

                    // console.log(res.variant)
                  )}
                </div>
                <div>
                  <TextField
                    size="small"
                    label="Feature Name"
                    onChange={(e) => setcurrentFeatureAction(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    value={res}
                    onClick={(e) => addTempVariantAction(e)}
                  >
                    Add
                  </Button>
                </div>
              </TabPanel>
            ))}
          </TabContext>
        </Box>
      </div>

      <div className="text-center mt-4 mb-4">
        <LoadingButton
          loading={saveVehicleLoading}
          variant="contained"
          onClick={(e) => saveAction(e)}
          style={{ width: "250px" }}
          startIcon={<IoIosSave />}
        >
          Update
        </LoadingButton>
      </div>
    </div>
  );
}

export default UpdateVehicle;
