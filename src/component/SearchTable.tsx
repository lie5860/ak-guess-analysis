import {React, antd} from "../global";

const {Input, Space, Button, Table} = antd

class SearchTable extends React.Component<any, any> {
  state = {
    searchText: '',
    searchedColumn: '',
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
      <div style={{padding: 8}}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{marginBottom: 8, display: 'block'}}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={'搜索'}
            size="small"
            style={{width: 90}}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({closeDropdown: false});
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => '查询',
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text => text
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({searchText: ''});
  };

  render() {
    console.log(this.props.data, 'this.props.data')
    const columns = [
      {
        title: 'answer',
        dataIndex: 'answer',
        key: 'answer',
        width: '30%',
        ...this.getColumnSearchProps('name'),
        sorter: (a, b) => a.answer - b.answer,
        render: (a, record) => {
          return `#${record.answer} ${record.name}`
        }
      },
      {
        title: 'giveup_count',
        dataIndex: 'giveup_count',
        key: 'giveup_count',
        sortDirections: ['descend', 'ascend'],
        sorter: (a, b) => a.giveup_count - b.giveup_count,
      },
      {
        title: 'lose_count',
        dataIndex: 'lose_count',
        key: 'lose_count',
        sortDirections: ['descend', 'ascend'],
        sorter: (a, b) => a.lose_count - b.lose_count,
      },
      {
        title: 'other_count',
        dataIndex: 'other_count',
        key: 'other_count',
        sortDirections: ['descend', 'ascend'],
        sorter: (a, b) => a.other_count - b.other_count,
      },
      {
        title: 'play_count',
        dataIndex: 'play_count',
        key: 'play_count',
        sortDirections: ['descend', 'ascend'],
        sorter: (a, b) => a.play_count - b.play_count,
      },
      {
        title: 'win_count',
        dataIndex: 'win_count',
        key: 'win_count',
        sortDirections: ['descend', 'ascend'],
        sorter: (a, b) => a.win_count - b.win_count,
      },
    ];
    return <Table
      // pagination={{pageSize: 20}}
      columns={columns}
      dataSource={this.props.data}
      scroll={{
        y: '35vh',
        scrollToFirstRowOnChange: true
      }}
    />;
  }
}

export default SearchTable;
