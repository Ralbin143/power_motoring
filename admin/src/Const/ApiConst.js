const BACKEND_BASE_URL = process.env.REACT_APP_BASE_URL;

// Image
export const IMAGE_BASE_URL = `${BACKEND_BASE_URL}/`;
// User Routes
export const LOGIN = `${BACKEND_BASE_URL}/api/admin/login`;

// Vehicle Routes
export const ADD_VEHICLE = `${BACKEND_BASE_URL}/api/vehicles/add_vehicle`;
export const ALL_VEHICLE = `${BACKEND_BASE_URL}/api/vehicles/all_vehicle`;
export const GET_SINGLE_VEHICLE = `${BACKEND_BASE_URL}/api/vehicles/get_single_vehicle`;
export const UPDATE_VEHICLE = `${BACKEND_BASE_URL}/api/vehicles/update_vehicle`;

// Manufacturer Routes
export const ADD_MANUFACTURER = `${BACKEND_BASE_URL}/api/manufacturer/add_manufacturer`;
export const ALL_MANUFACTURER = `${BACKEND_BASE_URL}/api/manufacturer/all_manufacturers`;
export const UPDATE_MANUFACTURER = `${BACKEND_BASE_URL}/api/manufacturer/update_manufacturer`;

// Subscriptions
export const ADD_SUBSCRIPTION = `${BACKEND_BASE_URL}/api/subscription/add_subscription`;
export const ALL_SUBSCRIPTION = `${BACKEND_BASE_URL}/api/subscription/subscription-list`;
