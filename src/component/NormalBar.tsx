import {echarts, React} from "../global";

export const NormalBar = () => {
  const ref = React.useRef()
  React.useEffect(() => {
    // var chartDom = document.getElementById('main')!;
    var myChart = echarts.init(ref.current);
    var option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    };

    option && myChart.setOption(option);
  }, [])
  return <div ref={ref} style={{height: '800px', width: '800px'}}/>
}
