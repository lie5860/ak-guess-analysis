import {axios} from "./global";

const getXXX = () => {
  return axios.get('https://akapi.saki.cc/data.php?mode=daily&server=zh_CN&begin=2022-04-18&end=2022-04-19&action=stat_try_times')
}

export {
  getXXX
}
