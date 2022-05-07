import {echarts, React} from "../global";
import useSize from "../hooks/useSize";

export const Pie = (props: { data: any[] }) => {
  const ref = React.useRef()
  const pieRef = React.useRef(null);
  const {width, height} = useSize(ref)
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
          radius: '70%',
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

  React.useEffect(() => {
    if (width && height) {
      pieRef?.current?.resize();
    }
  }, [width, height])
  return <div ref={ref} style={{height: '30vh', width: '100%'}}/>
}
