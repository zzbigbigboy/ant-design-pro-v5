import React from 'react';
import { Modal } from 'antd';
// import { useIntl, FormattedMessage } from 'umi'; // 本地化

export type FormValueType = {
  name?: string;
  remark?: string;
  uid?: string;
} & Partial<API.AssetInfo>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateVisible: boolean;
  values: Partial<API.AssetInfo>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
//   const intl = useIntl();  // 本地化
  return (
      <Modal
        title = {"创建"}
        visible = {props.updateVisible}
        onCancel = {() => props.onCancel()}
        onOk = {() => props.onSubmit(props.values)}
      >
          111111
      </Modal>
  );
};

export default UpdateForm;
