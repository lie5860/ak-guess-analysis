import {React, antd, moment} from "./global";
import {Pie} from "./component/Pie";
import {Bar} from "./component/Bar";
import {NormalBar} from "./component/NormalBar";
import {getData} from "./server";
import {
  CHART_DATA_DICT,
  CHART_NAME_TO_INDEX_DICT,
  EN_US,
  JA_JP,
  MainContext,
  MODE_DAILY,
  PARADOX_MODE,
  RANDOM_MODE,
  ZH_CN
} from "./const";

const {useContext} = React
const {Tabs, DatePicker, Select} = antd;
const {RangePicker} = DatePicker;

const {TabPane} = Tabs;
const DataView = () => {
  const {server, date, mode} = useContext(MainContext);
  const [pieData, setPieData] = React.useState([]);
  const ref = React.useRef(null)
  const [barData, setBarData] = React.useState({
    nameList: [],
    dateList: [],
    winTimesList: [],
    failTimesList: [],
    otherTimesList: [],
  });
  const [selectId, setId] = React.useState('')
  const [selectDate, setSelectDate] = React.useState('')
  const isDaily = mode === MODE_DAILY;
  const selectItem = (label) => {
    ref?.current?.scrollTo(0, 0);
    if (isDaily) {
      const [date, name] = label.split('\n')
      setSelectDate(date);
      setId(CHART_NAME_TO_INDEX_DICT[server][name]);
    } else {
      setSelectDate('');
      setId(CHART_NAME_TO_INDEX_DICT[server][label]);
    }
  }
  const clearSelect = () => {
    setSelectDate('');
    setId('');
  }
  React.useEffect(() => {
    getData({mode, server, ...date}).then((data: any) => {
      const result = data.data.result;
      setPieData([
        {value: result?.init?.play_count ?? 0, name: '初始化'},
        {value: result?.win?.play_count ?? 0, name: '胜利'},
        {value: result?.lose?.play_count ?? 0, name: '失败'},
        {value: result?.giveUp?.play_count ?? 0, name: '放弃'}
      ]);
    })

    getData({
      mode,
      server,
      action: isDaily ? 'stat_daily' : 'stat_role_total', ...date
    }).then((data: any) => {
      const result = isDaily ? data.data.result : data.data.result.detail;
      setBarData({
        nameList: result.map(({answer}: any) => CHART_DATA_DICT[server]?.[answer]?.name),
        dateList: result.map(({date}: any) => date),
        winTimesList: result.map(({win_count}: any) => win_count),
        failTimesList: result.map(({lose_count}: any) => lose_count),
        otherTimesList: result.map(({play_count}: any) => play_count),
      });
    })
  }, [date, server, mode])
  return <div>
    <Pie data={pieData}/>
    <div className={`half-chunk ${selectId ? 'not-scroll' : ''}`} ref={ref}>
      <div className={'low-chunk'}>
        {!!barData?.dateList?.length && <Bar selectItem={selectItem} data={barData}/>}
      </div>
      {selectId && <div className={'height-chunk'}>
          <NormalBar selectId={selectId} selectDate={selectDate} clearSelect={clearSelect}/>
      </div>}
    </div>
  </div>
}
const dates: object = {
  最近一周: [moment().startOf('day').subtract(1, 'week').add(1, 'day'), moment().endOf('day')],
  最近一个月: [moment().startOf('day').subtract(1, 'month').add(1, 'day'), moment().endOf('day')],
  最近三个月: [moment().startOf('day').subtract(3, 'month').add(1, 'day'), moment().startOf('day')]
};
const DateSelect = () => {
  const {setDate, date} = useContext(MainContext);
  const selectDate = function (date: any[]) {
    if (date?.length) {
      setDate({begin: date[0].format('YYYY-MM-DD'), end: date[1].format('YYYY-MM-DD')})
    } else {
      setDate({begin: '', end: ''})
    }
  }
  return <RangePicker
    ranges={{...dates}}
    value={date['begin'] ? [moment(date['begin']), moment(date['end'])] : undefined}
    onChange={selectDate}
  />
}
export const Main = () => {
  const [server, setServer] = React.useState(ZH_CN);
  const [mode, setMode] = React.useState(MODE_DAILY);
  const [date, setDate] = React.useState({
    begin: moment().subtract(6, 'days').format("YYYY-MM-DD"),
    end: moment().format("YYYY-MM-DD")
  });

  const serverSelect = <Select value={server} onChange={(v: any) => {
    setServer(v);
    setDate({begin: moment().format("YYYY-MM-DD"), end: moment().format("YYYY-MM-DD")})
  }}>
    <Select.Option value={ZH_CN}>CN</Select.Option>
    <Select.Option value={EN_US}>EN</Select.Option>
    <Select.Option value={JA_JP}>JP</Select.Option>
  </Select>;
  return <MainContext.Provider value={{server, setServer, mode, date, setDate}}>
    <div className={'container'}>
      <Tabs activeKey={mode} onChange={(v: any) => {
        setMode(v);
        setDate({begin: '', end: ''})
      }} tabBarExtraContent={serverSelect}>
        <TabPane tab="每日挑战" key={[MODE_DAILY]}>
          {MODE_DAILY === mode && <>
              <DateSelect/>
              <DataView/>
          </>
          }
        </TabPane>
        <TabPane tab="随心所欲" key={[RANDOM_MODE]}>
          {RANDOM_MODE === mode && <>
              <DateSelect/>
              <DataView/>
          </>
          }
        </TabPane>
        <TabPane tab="悖论模拟" key={[PARADOX_MODE]}>
          {PARADOX_MODE === mode && <>
              <DateSelect/>
              <DataView/>
          </>
          }
        </TabPane>
      </Tabs>
    </div>
  </MainContext.Provider>
}
