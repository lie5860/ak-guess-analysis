import {echarts, React} from "../global";

export const Bar = ({data}: any) => {
  const {nameList, dateList, winTimesList, failTimesList, otherTimesList} = data
  const ref = React.useRef()
  const barRef = React.useRef(null);
  React.useEffect(() => {
    barRef.current = echarts.init(ref.current);
  }, [])
  React.useEffect(() => {
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
        }
      },
      legend: {},
      grid: {
        left: '10%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: nameList
      },
      series: [
        {
          name: 'winTimes',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: winTimesList
        },
        {
          name: 'failTimes',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: failTimesList
        },
        {
          name: 'otherTimesList',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: otherTimesList
        }
      ]
    };

    option && barRef.current && barRef.current.setOption(option);
    barRef.current?.resize()
  }, [data])
  return <div ref={ref} style={{height: `${100 + dateList.length * 80}px`, width: '600px'}}/>
}
