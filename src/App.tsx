import {echarts, React, antd, ReactRouterDOM} from './global';

const {HashRouter, Route} = ReactRouterDOM;
const {DatePicker} = antd;
import './normalize.css';
import './index.less';
import {Main} from "./Main";

const Test = () => {
  React.useEffect(() => {
    var chartDom = document.getElementById('main')!;
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    };

    option && myChart.setOption(option);
  }, [])
  console.log(244)
  return <div className={'container'}>
    <DatePicker/>
    <div id={'main'} style={{height: '200px', width: '200px'}}/>
  </div>
}

export default function Home() {
  console.log(233)
  return (
    <HashRouter>
      <Route path="/">
        <Route path="/main" component={Main}/>
        <Route path="/inbox" component={Test}>
          <Route path="/messages/:id" component={Test}/>
        </Route>
      </Route>
    </HashRouter>
  )
}
