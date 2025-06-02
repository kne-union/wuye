import { createWithRemoteLoader } from '@kne/remote-loader';
import { FileImageOutlined } from '@ant-design/icons';

const FormInner = createWithRemoteLoader({
  modules: ['components-core:FormInfo']
})(({ remoteModules }) => {
  const [FormInfo] = remoteModules;
  const { Input, TextArea, AddressSelect, PhoneNumber, Avatar } = FormInfo.fields;
  return (
    <>
      <FormInfo
        list={[
          <Input name="name" label="小区名称" rule="REQ LEN-2-100" />,
          <AddressSelect name="city" label="小区所在地" rule="REQ" single />,
          <PhoneNumber name="phone" label="客服电话" rule="REQ" />,
          <Avatar name="banner" label="小区照片" rule="REQ" tips="用于业主端APP展示" border={50} width={900} height={500} defaultAvatar={<FileImageOutlined />} />,
          <Input name="bankAccount" label="银行账号" rule="REQ" />,
          <Input name="openingBank" label="开户行" rule="REQ" />
        ]}
      />
    </>
  );
});

export default FormInner;
