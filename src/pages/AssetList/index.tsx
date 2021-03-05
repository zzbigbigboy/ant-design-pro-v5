import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { Table, Tag, Space, Button } from 'antd';
import { useState } from 'react';
import UpdateForm from './components/UpdateFrom'

const AssetList: React.FC = () => {
    const [updateVisible, hanldeUpdateVisible] = useState<boolean>(false)
    const [currentRow, setCurrenRow] = useState<API.AssetInfo>({} as API.AssetInfo)
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (tags: string[]) => (
                <>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: any) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];
    return (
        <PageContainer>
            <Button type="primary" onClick={() => hanldeUpdateVisible(true)}>aaaaaaaaa</Button>
            <Table columns={columns} dataSource={data} />
            <UpdateForm 
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
            />
        </PageContainer>
    );
};

export default AssetList;
