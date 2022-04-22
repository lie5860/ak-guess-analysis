import {echarts, React, antd} from "./global";
import {Pie} from "./component/Pie";
import {Bar} from "./component/Bar";
import {NormalBar} from "./component/NormalBar";
import {getData} from "./server";
import {CHART_DATA_DICT, EN_US, JA_JP, MODE_DAILY, ZH_CN} from "./const";

const {Tabs, DatePicker, Select} = antd;
const {RangePicker} = DatePicker;

const {TabPane} = Tabs;
const DailyView = ({server}: { server: string }) => {
  const [date, setDate] = React.useState({begin: '', end: ''});
  const [pieData, setPieData] = React.useState([]);
  const [barData, setBarData] = React.useState({
    nameList: [],
    dateList: [],
    winTimesList: [],
    failTimesList: [],
    otherTimesList: [],
  });
  React.useEffect(() => {
    getData({mode: MODE_DAILY, server, ...date}).then((data: any) => {
      const result = data.data.result;
      setPieData([
        {value: result?.init?.play_count ?? 0, name: '初始化'},
        {value: result?.win?.play_count ?? 0, name: '胜利'},
        {value: result?.lose?.play_count ?? 0, name: '失败'},
        {value: result?.giveUp?.play_count ?? 0, name: '放弃'}
      ]);
    })

    getData({mode: MODE_DAILY, server, action: 'stat_daily', ...date}).then((data: any) => {
      const result = data.data.result;
      setBarData({
        nameList: result.map(({answer}) => CHART_DATA_DICT[server]?.[answer]?.name),
        dateList: result.map(({date}) => date),
        winTimesList: result.map(({win_count}) => win_count),
        failTimesList: result.map(({lose_count}) => lose_count),
        otherTimesList: result.map(({play_count}) => play_count),
      });
    })
  }, [date, server])
  const selectDate = function (date: any[]) {
    if (date?.length) {
      setDate({begin: date[0].format('YYYY-MM-DD'), end: date[1].format('YYYY-MM-DD')})
    } else {
      setDate({begin: '', end: ''})
    }
  }
  return <div>
    <RangePicker onChange={selectDate}/>
    <Pie data={pieData}/>
    {!!barData?.dateList?.length && <Bar data={barData}/>}
  </div>
}
export const Main = () => {
  const [server, setServer] = React.useState(ZH_CN);


  const serverSelect = <Select value={server} onChange={(v) => {
    setServer(v);
  }}>
    <Select.Option value={ZH_CN}>CN</Select.Option>
    <Select.Option value={EN_US}>EN</Select.Option>
    <Select.Option value={JA_JP}>JP</Select.Option>
  </Select>;

  return <div className={'container'}>
    <Tabs defaultActiveKey="daily" tabBarExtraContent={serverSelect}>
      <TabPane tab="每日挑战" key={[MODE_DAILY]}>
        <DailyView server={server}/>
        <hr/>
        {/*<NormalBar/>*/}
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
