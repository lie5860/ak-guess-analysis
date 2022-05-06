import {echarts, React} from "../global";
import {getData} from "../server";
import {CHART_DATA_DICT, MainContext} from "../const";
import useSize from "../hooks/useSize";

const {useContext} = React
export const NormalBar = ({selectId, selectDate, clearSelect}: any) => {
  const {server, mode, date} = useContext(MainContext);
  const ref = React.useRef()
  const barRef = React.useRef(null);
  const [data, setData] = React.useState(null)
  const {width, height} = useSize(ref)
  React.useEffect(() => {
    barRef.current = echarts.init(ref.current);
  }, [])
  React.useEffect(() => {
    if (data) {
      const option = {
        xAxis: {
          type: 'category',
          data: Object.keys(data.detail)
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            label: {
              show: true,
              position: 'top'
            },
            // 有兼容性问题 但是那又怎么样呢~
            data: Object.values(data.detail),
            type: 'bar'
          }
        ]
      };

      option && barRef.current.setOption(option);
    }
  }, [data])
  React.useEffect(() => {
    getData({
      mode,
      server, ...(selectDate ? {begin: selectDate, end: selectDate} : date),
      action: 'stat_try_times',
      role: selectId
    }).then((data: any) => {
      const result = data.data.result;
      setData(result)
    })
  }, [selectId, selectDate])
  React.useEffect(() => {
    if (width && height) {
      barRef?.current?.resize();
    }
  }, [width, height])
  return <div style={{position: 'relative', height: '100%', width: '100%'}}>
    <div ref={ref} style={{height: '100%', width: '100%'}}/>
    <div style={{position: "absolute", right: 0, top: 0, zIndex: 1}} onClick={() => {
      clearSelect()
    }}>
      {selectDate && `${selectDate}\n`}
      {CHART_DATA_DICT[server][selectId]['name']}
      关闭
    </div>
  </div>
}
