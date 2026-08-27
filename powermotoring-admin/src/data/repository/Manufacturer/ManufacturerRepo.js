import { MANUFACTURER_URL } from "../../constants/ApiConst";
import { INSTANCE } from "../../constants/ApiHeader";

const getAllManufacturers = async () => {
  const response = await INSTANCE.post(`${MANUFACTURER_URL}/all_manufacturers`);
  return response.data?.data;
};

export const ManufacturerRepository = { getAllManufacturers };
export default ManufacturerRepository;
