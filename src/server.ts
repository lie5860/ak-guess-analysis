import {axios} from "./global";

interface Params {
  mode: string;
  server: string;
  begin: string;
  end: string;
  action?: string;
}

const getData = (params: Params) => {
  return axios.get(`https://akapi.saki.cc/data.php`, {params})
}

export {
  getData
}
