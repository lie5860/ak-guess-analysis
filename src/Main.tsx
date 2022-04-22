import {echarts, React, antd} from "./global";
import {Pie} from "./component/Pie";
import {Bar} from "./component/Bar";
import {NormalBar} from "./component/NormalBar";
import {getData} from "./server";

const {Tabs, DatePicker, Select} = antd;
const { RangePicker } = DatePicker;

const {TabPane} = Tabs;

  
export const Main = () => {
  const [request, setRequest] = React.useState({"mode":"daily","server":"zh_CN","begin":"2022-04-19","end":"2022-04-20"});
  const [playData, setPlayData] = React.useState([]);

  const refreshData = function(request) {
    console.log(request);
    getData(request.mode, request.server, request.begin, request.end, '').then((data) => {
      var result = data.data.result;
      console.log(result);
      setPlayData([
            {value: result?.init?.play_count ? result?.init?.play_count : 0, name: '初始化'},
            {value: result?.win?.play_count ? result?.win?.play_count : 0, name: '胜利'},
            {value: result?.lose?.play_count ? result?.lose?.play_count : 0, name: '失败'},
            {value: result?.giveUp?.play_count ? result?.giveUp?.play_count : 0, name: '放弃'}
          ]);
      console.log(playData);
    })
  }
  const selectDate = function(dates, dateStr) {
    request.begin = dateStr[0];
    request.end = dateStr[1];
    setRequest(request);
    refreshData(request);
  }

  const selectServer = function(value) {
    request.server = value;
    setRequest(request);
    refreshData(request);
  }

  const serverSelect = <Select defaultValue="zh_CN" onChange={selectServer}>
    <Option value="zh_CN">CN</Option>
    <Option value="en_US">EN</Option>
    <Option value="ja_JP">JP</Option>
  </Select>;

  React.useEffect(() => {
    refreshData(request);
  }, []);

  return <div className={'container'}>
    <Tabs defaultActiveKey="daily" tabBarExtraContent={serverSelect}>
      <TabPane tab="每日挑战" key="daily">
        <RangePicker onChange={selectDate} />
        <Pie title="测试" data={playData}/>
        <hr/>
        <NormalBar/>
      </TabPane>
      <TabPane tab="随心所欲" key="random">
        Content of card tab 2
      </TabPane>
      <TabPane tab="悖论模拟" key="paradox">
        <Bar/>
      </TabPane>
    </Tabs>
  </div>
}
