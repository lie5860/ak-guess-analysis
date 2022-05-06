import {React} from "./global";

export const MODE_DAILY = 'daily'
export const PARADOX_MODE = 'paradox'
export const RANDOM_MODE = 'random'
export const ZH_CN = 'zh_CN'
export const EN_US = 'en_US'
export const JA_JP = 'ja_JP'
import ZH_DATA from './data/dealData/dealData_zh_CN.json'
import EN_DATA from './data/dealData/dealData_en_US.json'
import JA_DATA from './data/dealData/dealData_ja_JP.json'

const {createContext} = React;
export const CHART_DATA_DICT: { [K: string]: any[] } = {
  [ZH_CN]: ZH_DATA,
  [EN_US]: EN_DATA,
  [JA_JP]: JA_DATA,
}
export const MainContext = createContext({});
const dataToDict = (lang: string) => CHART_DATA_DICT[lang].reduce((prev, current, currentIndex) => {
  prev[current?.['name']] = currentIndex;
  return prev;
}, {})
export const CHART_NAME_TO_INDEX_DICT: { [K: string]: any } = {
  [ZH_CN]: dataToDict(ZH_CN),
  [EN_US]: dataToDict(EN_US),
  [JA_JP]: dataToDict(JA_JP),
}
