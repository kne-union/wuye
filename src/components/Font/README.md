
# Font


### 概述

提供系统字体


### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _Font(@components/Font),remoteLoader(@kne/remote-loader),reactFetch(@kne/react-fetch),antd(antd)

```jsx
const { default: Font } = _Font;
const { createWithRemoteLoader } = remoteLoader;
const { default: Fetch } = reactFetch;
const { Space, Typography, Slider } = antd;
const { useState } = React;

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Icon']
})(({ remoteModules }) => {
  const [Icon] = remoteModules;
  const [value, setValue] = useState(30);
  return (
    <Space direction="vertical">
      <Space>
        <div>调整大小:</div>
        <Slider style={{ width: 100 }} max={60} min={12} value={value} onChange={setValue} />
        <div>{value}px</div>
      </Space>
      <Font>
        {({ path }) => {
          return (
            <Fetch
              url={path + '/iconfont.json'}
              ignoreSuccessState
              render={({ data }) => {
                const list = data.glyphs;
                return (
                  <Space wrap align="top" size="large">
                    {list.map(({ name, font_class }) => {
                      return (
                        <Space className="item" direction="vertical" align="center" key={name}>
                          <Icon type={font_class} size={value} fontClassName="iconfont-wuye" />
                          <Typography.Text
                            copyable={{
                              text: '<Icon type="' + font_class + '" size={' + value + '} fontClassName="iconfont-wuye"/>'
                            }}
                          >
                            {font_class}
                          </Typography.Text>
                          <div>{name}</div>
                        </Space>
                      );
                    })}
                  </Space>
                );
              }}
            />
          );
        }}
      </Font>
    </Space>
  );
});

render(<BaseExample />);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

