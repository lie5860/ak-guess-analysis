import {echarts, React} from "../global";
import useSize from "../hooks/useSize";

export const Bar = ({data, selectItem}: any) => {
  const {nameList, dateList, winTimesList, failTimesList, otherTimesList} = data
  const ref = React.useRef()
  const {width, height} = useSize(ref)
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
        data: nameList.map((v: any, index: any) => `${dateList[index] ? `${dateList[index]}\n` : ''}${v}`)
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
    barRef.current.on('click', (params: any) => {
      selectItem(params.name)
    })
  }, [data])
  React.useEffect(() => {
    if (width && height) {
      barRef?.current?.resize();
    }
  }, [width, height])
  return <div ref={ref} style={{height: `${100 + dateList.length * 80}px`, width: '100%'}}/>
}
