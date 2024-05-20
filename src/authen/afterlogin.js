import axios from "axios";
const userisIn = "prod";
const API_BASE_URL =
  userisIn == "local"
    ? "http://ec2-15-207-239-145.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/"
    : "https://fintech.oxyloans.com/oxyloans/v1/user/";

const getToken = () => {
  return sessionStorage.getItem("accessToken");
};
export const getUserId = () => {
  return sessionStorage.getItem("userId");
};

export const getUserSessionTime = () => {
  return sessionStorage.getItem("tokenTime");
};

export const loadVirtualAccount = () => {
  const userId = getUserId();
  return {
    userId,
  };
};
const lenderId = localStorage.getItem("lenderId");
const password = localStorage.getItem("password");


const handleApiRequestAfterLoginService = async (
  baseurl,
  endpoint,
  method,
  accessToken = null,
  data = null,
  headers = {}
) => {
  try {
    const response = await axios({
      method,
      url: `${baseurl}${endpoint}`,
      data,
      headers: {
        "Content-Type": "application/json",
        accessToken,
        ...headers,
      },
    });
    // Add your common logic here
    if (response.status == 200) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

export const getUserDetailsfromSpreadSheetapi = async () => {
  const token = getToken();
  const userId = getUserId();

  const data = {
    spreadSheetId: "1NEp7phX60w0jByET9qbfZKCwIJJTOuD_lytI_jrnhvw", range: "DATA",
    password: localStorage.getItem("password"),
    lenderId1: localStorage.getItem("lenderId"),
  }
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `getUserDetailsfromSpreadSheet`,
    "POST",
    token,
    data
  );
  return response;
};

export const closedAndTotaldealsCountapi = async () => {
  const token = getToken();
  const userId = getUserId();

  const data = {
    spreadSheetId: "1NEp7phX60w0jByET9qbfZKCwIJJTOuD_lytI_jrnhvw",
    range: "DATA",
    password: localStorage.getItem("password"),
    lenderId1: localStorage.getItem("lenderId"),
  }
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `closedAndTotaldealsCount`,
    "POST",
    token,
    data
  );
  return response;
};


export const getUserAmountFromInSpreadSheetapi = async () => {
  const token = getToken();
  const userId = getUserId();

  const data = {
    spreadSheetId: "1NEp7phX60w0jByET9qbfZKCwIJJTOuD_lytI_jrnhvw", range: "DATA",
    password: localStorage.getItem("password"),
    lenderId1: localStorage.getItem("lenderId"),
  }
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `getUserAmountFromSpreadSheet`,
    "POST",
    token,
    data
  );
  return response;
};



export const loginapicall = async (login) => {
  const cleanedString = login.lenderId.replace(/^[^\d]*/, '');

  const token = getToken();
  const userId = getUserId();

  const data = {
    spreadSheetId: "1NEp7phX60w0jByET9qbfZKCwIJJTOuD_lytI_jrnhvw",
    range: "DATA",
    password: login.password,
    lenderId1: cleanedString
  };

  // Make API call to handle login after retrieving token and user ID
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `googleSpreadSheetRead`,
    "POST",
    token,
    data
  );

  return response;
};

export const googleSpreadSheetReadapi = async () => {
  const token = getToken();
  const userId = getUserId();

  const data = {
    spreadSheetId: "1NEp7phX60w0jByET9qbfZKCwIJJTOuD_lytI_jrnhvw", range: "DATA",
    password: localStorage.getItem("password"),
    lenderId1: localStorage.getItem("lenderId"),
  }
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `googleSpreadSheetRead`,
    "POST",
    token,
    data
  );
  return response;
};