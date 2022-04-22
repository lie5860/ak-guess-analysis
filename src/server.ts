import {axios} from "./global";

const getData = (mode, server, begin, end, action) => {
  return axios.get('https://akapi.saki.cc/data.php?mode='+mode+'&server='+server+'&begin='+begin+'&end='+end+'&action='+action)
}

export {
  getData
}
