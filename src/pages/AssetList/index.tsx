import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { Table, Tag, Space, Button } from 'antd';
import { useState } from 'react';
import UpdateForm from './components/UpdateFrom'

const AssetList: React.FC = () => {
    const [updateVisible, hanldeUpdateVisible] = useState<boolean>(false)
    const [currentRow, setCurrenRow] = useState<API.AssetInfo>({} as API.AssetInfo)
    const columns = [
        {
            title: '昵称',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: '联系方式',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '所在地',
            dataIndex: 'place',
            key: 'place',
        },
        {
            title: '操作',
            key: 'action',
            render: (text: string, record: API.AssetInfo) => (
                <Space size="middle">
                    <a onClick={() => {
                        setCurrenRow(record)
                        hanldeUpdateVisible(true)
                    }}>修改</a>
                    <a>删除</a>
                </Space>
            ),
        },
    ];

    const data: API.AssetInfo[] = [
        {
            uid: '1',
            name: 'John Brown1',
            phone: '13340360960',
            place: 'New York No. 1 Lake Park',
        } as API.AssetInfo,
        {
            uid: '2',
            name: 'John Brown2',
            phone: '13340360960',
            place: 'New York No. 1 Lake Park',
        } as API.AssetInfo,
        {
            uid: '3',
            name: 'John Brown3',
            phone: '13340360960',
            place: 'New York No. 1 Lake Park',
        } as API.AssetInfo,
    ];
    return (
        <PageContainer>
            <Button type="primary" onClick={() => hanldeUpdateVisible(true)}>aaaaaaaaa</Button>
            <Table columns={columns} dataSource={data} rowKey="uid" />
            {!updateVisible || <UpdateForm 
                onSubmit = {async (value) => {
                    hanldeUpdateVisible(false);
                    await setCurrenRow({} as API.AssetInfo)
                }}
                onCancel = {() => {
                    hanldeUpdateVisible(false);
                    setCurrenRow({} as API.AssetInfo)
                }}
                updateVisible = {updateVisible}
                values = {currentRow}
            />}
        </PageContainer>
    );
};

export default AssetList;
