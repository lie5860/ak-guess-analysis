import {echarts, React, antd} from "./global";
import {Pie} from "./component/Pie";
import {Bar} from "./component/Bar";
import {NormalBar} from "./component/NormalBar";
import {getXXX} from "./server";

const {Tabs, DatePicker, Select} = antd;

const {TabPane} = Tabs;
export const Main = () => {
  React.useEffect(() => {
    getXXX().then((data) => {
      console.log(data.data, 'data')
    })
  }, [])
  console.log(233)
  return <div className={'container'}>
    <Tabs defaultActiveKey="1" type="card" tabBarExtraContent={<Select/>}>
      <TabPane tab="Card Tab 1" key="1">

        <DatePicker/>
        <NormalBar/>
      </TabPane>
      <TabPane tab="Card Tab 2" key="2">
        Content of card tab 2
        <Pie/>
      </TabPane>
      <TabPane tab="Card Tab 3" key="3">
        <Bar/>
      </TabPane>
    </Tabs>
  </div>
}
