import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.swip.ng/",
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
  },
});

const instances = (props) =>
  axios.create({
    baseURL: "https://api.swip.ng/",
    mode: "cors",
    headers: {
      accept: "application/json",
      "Accept-Language": "en-US,en;q=0.8",
      "Content-Type": `multipart/form-data; boundary=${props.boundary}`,
    },
  });
export default instance;
module.export = {
  instance: instance,
  instances: instances,
};
