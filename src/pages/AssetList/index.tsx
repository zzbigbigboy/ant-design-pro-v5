// import { FormattedMessage } from '@/.umi/plugin-locale/localeExports';
import { FormattedMessage } from '@/.umi/plugin-locale/localeExports';
import { assets, removeAsset, updateAsset } from '@/services/asset.service';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Table, Space, Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import UpdateForm from './components/UpdateFrom'
const expandable = { expandedRowRender: (record: APP.AssetInfo) => <p>{record.name}</p> };
const title = () => 'Here is title';
const showHeader = true;


/**
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: APP.AssetInfo[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
        await removeAsset({
            uids: selectedRows.map((row) => row.uid),
        });
        hide();
        message.success('删除成功，即将刷新');
        return true;
    } catch (error) {
        hide();
        message.error('删除失败，请重试');
        return false;
    }
};

/**
 * 修改节点
 *
 * @param info
 */
const handleUpdate = async (info: APP.AssetInfo) => {
    const hide = message.loading('正在修改');
    if (!info) return true;
    try {
        await updateAsset(info);
        hide();
        message.success('修改成功，即将刷新');
        return true;
    } catch (error) {
        hide();
        message.error('修改失败，请重试');
        return false;
    }
};


const AssetList: React.FC = () => {
    const [updateVisible, hanldeUpdateVisible] = useState<boolean>(false)
    const [currentRow, setCurrenRow] = useState<APP.AssetInfo>({} as APP.AssetInfo)
    const [selectedRowsState, setSelectedRows] = useState<APP.AssetInfo[]>([]);
    const [tableState, setTableState] = useState({
        bordered: false,
        loading: false,
        expandable,
        title,
        showHeader,
        rowSelection: {},
        scroll: undefined,
        hasData: true,
        tableLayout: undefined,
        top: 'none',
        bottom: 'bottomRight',
    })
    const actionRef = useRef<ActionType>();
    const columns: ProColumns<APP.AssetInfo>[] = [
        {
            title: '昵称',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '联系方式',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '个人网站',
            dataIndex: 'website',
            key: 'website',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '所在地',
            dataIndex: 'place',
            key: 'place',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record: APP.AssetInfo) => (
                <Space size="middle">
                    <a onClick={() => {
                        setCurrenRow(record)
                        hanldeUpdateVisible(true)
                    }}>修改</a>
                </Space>
            ),
        },
    ];

    const data: APP.AssetInfo[] = [];

    for (let i = 0; i < 30; i++) {
        data.push({
            uid: i.toString(),
            name: 'John Brown1',
            phone: '13340360960',
            place: 'New York No. 1 Lake Park',
            callNo: i,
        } as APP.AssetInfo)
    }

    return (
        <PageContainer>
            {/* <Button type="primary" onClick={() => hanldeUpdateVisible(true)}>aaaaaaaaa</Button> */}
            <ProTable<APP.AssetInfo, API.PageParams>
                headerTitle={'查询表格'}
                actionRef={actionRef}
                rowKey="uid"
                search={{
                    labelWidth: 120,
                }}
                pagination={{pageSize: 15}}
                toolBarRender={() => [
                    <Button
                        type="primary"
                        key="primary"
                        onClick={() => {
                            hanldeUpdateVisible(true);
                        }}
                    >
                        <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="新建" />
                    </Button>,
                ]}
                request={assets}
                columns={columns}
                rowSelection={{
                    onChange: (_, selectedRows) => {
                        console.log(selectedRows)
                        setSelectedRows(selectedRows);
                    },
                }}
            />
            {selectedRowsState?.length > 0 && (
                <FooterToolbar
                    extra={
                        <div>
                            <FormattedMessage id="pages.searchTable.chosen" defaultMessage="已选择" />{' '}
                            <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
                            <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                                <FormattedMessage
                                    id="pages.searchTable.totalServiceCalls"
                                    defaultMessage="服务调用次数总计"
                                />{' '}
                                {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
                                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
                            </span>
                        </div>
                    }
                >
                    <Button
                        onClick={async () => {
                            await handleRemove(selectedRowsState);
                            setSelectedRows([]);
                            actionRef.current?.reloadAndRest?.();
                        }}
                    >
                        <FormattedMessage id="pages.searchTable.batchDeletion" defaultMessage="批量删除" />
                    </Button>
                    <Button type="primary">
                        <FormattedMessage id="pages.searchTable.batchApproval" defaultMessage="批量审批" />
                    </Button>
                </FooterToolbar>
            )}
            {/* table */}
            {/* <Table<APP.AssetInfo> {...tableState} columns={columns} dataSource={data} rowKey="uid" /> */}
            {!updateVisible || <UpdateForm
                onSubmit={async (value) => {
                    hanldeUpdateVisible(false)
                    await setCurrenRow({} as APP.AssetInfo)
                    await handleUpdate(value || {} as APP.AssetInfo)
                }}
                onCancel={() => {
                    hanldeUpdateVisible(false);
                    setCurrenRow({} as APP.AssetInfo)
                }}
                updateVisible={updateVisible}
                values={currentRow}
            />}
        </PageContainer>
    );
};

export default AssetList;
