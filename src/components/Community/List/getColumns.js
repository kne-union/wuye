const getColumns = () => {
  return [
    {
      name: 'id',
      title: '编号',
      type: 'serialNumber',
      primary: true,
      hover: true
    },
    {
      name: 'name',
      title: '小区名称',
      type: 'mainInfo'
    },
    {
      name: 'address',
      title: '所在地',
      type: 'other'
    },
    {
      name: 'bankAccount',
      title: '银行账号',
      type: 'serialNumber'
    },
    {
      name: 'openingBank',
      title: '开户行',
      type: 'other'
    },
    {
      name: 'status',
      title: '状态',
      type: 'tag',
      valueOf: () => {
        return { type: 'success', text: '正常' };
      }
    },
    {
      name: 'createdTime',
      title: '添加时间',
      type: 'datetime'
    }
  ];
};

export default getColumns;
