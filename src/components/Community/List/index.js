import { createWithRemoteLoader } from '@kne/remote-loader';
import getColumns from './getColumns';
import { useRef, useState } from 'react';
import { Space, Button, App } from 'antd';
import FormInner from '../FormInner';

const stateType = [
  { tab: '全部', key: 'all' },
  {
    tab: '状态一',
    key: '1'
  },
  {
    tab: '状态二',
    key: '2'
  }
];

const stateTypeMap = new Map(stateType.map(item => [item.key, item]));

const List = createWithRemoteLoader({
  modules: ['components-core:Layout@TablePage', 'components-core:Filter', 'components-core:Global@usePreset', 'components-core:FormInfo@useFormModal', 'components-core:StateBar']
})(({ remoteModules, menu }) => {
  const [TablePage, Filter, usePreset, useFormModal, StateBar] = remoteModules;
  const { ajax, apis } = usePreset();
  const { SearchInput, getFilterValue, fields: filterFields } = Filter;
  const { InputFilterItem } = filterFields;
  const ref = useRef(null);
  const [filter, setFilter] = useState([]);
  const filterValue = getFilterValue(filter);
  const formModal = useFormModal();
  const { message } = App.useApp();

  return (
    <TablePage
      {...Object.assign({}, apis.community.getList, {
        data: Object.assign({}, filterValue)
      })}
      ewf={ref}
      name="List"
      topArea={
        <StateBar
          type="radio"
          size="small"
          activeKey={filterValue.stateType || 'all'}
          onChange={value => {
            const currentState = stateTypeMap.get(value);
            setFilter(filter => {
              const newFilter = filter.slice(0);
              const currentIndex = filter.findIndex(item => item.name === 'stateType');
              if (currentIndex === -1) {
                newFilter.push({ name: 'stateType', value: { label: currentState.tab, value: currentState.key } });
              } else {
                newFilter.splice(currentIndex, 1, {
                  name: 'stateType',
                  value: { label: currentState.tab, value: currentState.key }
                });
              }
              return newFilter;
            });
          }}
          stateOption={stateType}
        />
      }
      page={{
        menu: menu,
        filter: {
          value: filter,
          onChange: setFilter,
          list: [[<InputFilterItem label="条件一" name="filter1" />, <InputFilterItem label="条件二" name="filter2" />]]
        },
        titleExtra: (
          <Space align="center">
            <SearchInput name="name" label="名称" />
            <Button
              type="primary"
              onClick={() => {
                formModal({
                  title: '添加小区',
                  autoClose: true,
                  formProps: {
                    onSubmit: async data => {
                      const { data: resData } = await ajax(Object.assign({}, apis.community.create, { data }));
                      if (resData.code !== 0) {
                        return false;
                      }
                      message.success('添加成功');
                      ref.current?.reload();
                    }
                  },
                  children: <FormInner />
                });
              }}
            >
              添加
            </Button>
          </Space>
        )
      }}
      columns={[
        ...getColumns(),
        {
          name: 'options',
          title: '操作',
          type: 'options',
          fixed: 'right',
          valueOf: item => {
            return [
              {
                children: '编辑',
                onClick: async () => {
                  formModal({
                    title: '编辑数据',
                    autoClose: true,
                    formProps: {
                      data: Object.assign({}, item),
                      onSubmit: async data => {
                        const { data: resData } = await ajax(Object.assign({}, apis.testApi.save, { data: Object.assign({}, data, { id: item.id }) }));
                        if (resData.code !== 0) {
                          return false;
                        }
                        message.success('保存成功');
                        ref.current?.reload();
                      }
                    },
                    children: <FormInner />
                  });
                }
              },
              {
                children: '删除',
                confirm: true,
                onClick: async () => {
                  const { data: resData } = await ajax(Object.assign({}, apis.testApi.remove, { data: { id: item.id } }));
                  if (resData.code !== 0) {
                    return false;
                  }
                  message.success('删除成功');
                  ref.current?.reload();
                }
              }
            ];
          }
        }
      ]}
    />
  );
});

export default List;
