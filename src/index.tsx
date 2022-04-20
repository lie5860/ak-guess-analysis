import App from './App'
import {ReactDom, React} from './global'
const Main = App

// 初始化
export function bootstrap() {
}

// 挂载
export function mount(container: any, props: any) {
  console.log(props, 'props')
  ReactDom.render(React.createElement(Main, props, null), container);
}

// 更新
export function updated(attrName: string, value: any, container: any, props: any) {
  ReactDom.render(React.createElement(Main, props, null), container);
}

const AkGuessAnalysis = {
  bootstrap, mount, updated
}
// 暂时不知道怎么处理 todo
// 债务 这边应该把AkGuess导出 由外部引入模块后调用window.magic
window.magic('ak-guess-analysis', AkGuessAnalysis);
