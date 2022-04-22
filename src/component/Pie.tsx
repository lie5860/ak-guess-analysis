import {echarts, React} from "../global";

export const Pie = (props: { data: any[] }) => {
  const ref = React.useRef()
  const pieRef = React.useRef(null);
  React.useEffect(() => {
    pieRef.current = echarts.init(ref.current);
  }, [])
  React.useEffect(() => {
    const option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'right',
        top: 'middle'
      },
      series: [
        {
          type: 'pie',
          radius: '180px',
          data: props.data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    option && pieRef?.current && pieRef?.current.setOption(option);
    pieRef.current?.resize()
  }, [props.data])
  return <div ref={ref} style={{height: '400px', width: '600px'}}/>
}
