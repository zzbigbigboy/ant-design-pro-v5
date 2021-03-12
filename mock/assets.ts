// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
// import moment from 'moment';
import { parse } from 'url';

// mock tableListDataSource
const genList = (current: number, pageSize: number) => {
    const tableListDataSource: API.AssetInfo[] = [];

    for (let i = 0; i < pageSize; i += 1) {
        const index = (current - 1) * 10 + i;
        tableListDataSource.push({
            uid: index.toString(),
            name: `名称-${i}`,
            email: '6666669@qq.com',
            psw: '123456',
            place: '成都',
            phone: '1234567489',
            website: 'https://github.com/zzbigbigboy',
            remark: '',
            callNo: i,
        });
    }
    tableListDataSource.reverse();
    return tableListDataSource;
};

let tableListDataSource = genList(1, 100);

function getAssets(req: Request, res: Response, u: string) {
    let realUrl = u;
    if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
        realUrl = req.url;
    }
    const { current = 1, pageSize = 10 } = req.query;
    const params = (parse(realUrl, true).query as unknown) as API.PageParams &
        API.RuleListItem & {
            sorter: any;
            filter: any;
        };

    let dataSource = [...tableListDataSource].slice(
        ((current as number) - 1) * (pageSize as number),
        (current as number) * (pageSize as number),
    );
    const sorter = JSON.parse(params.sorter || ('{}' as any));
    if (sorter) {
        dataSource = dataSource.sort((prev, next) => {
            let sortNumber = 0;
            Object.keys(sorter).forEach((key) => {
                if (sorter[key] === 'descend') {
                    if (prev[key] - next[key] > 0) {
                        sortNumber += -1;
                    } else {
                        sortNumber += 1;
                    }
                    return;
                }
                if (prev[key] - next[key] > 0) {
                    sortNumber += 1;
                } else {
                    sortNumber += -1;
                }
            });
            return sortNumber;
        });
    }
    if (params.filter) {
        const filter = JSON.parse(params.filter as any) as {
            [key: string]: string[];
        };
        if (Object.keys(filter).length > 0) {
            dataSource = dataSource.filter((item) => {
                return Object.keys(filter).some((key) => {
                    if (!filter[key]) {
                        return true;
                    }
                    if (filter[key].includes(`${item[key]}`)) {
                        return true;
                    }
                    return false;
                });
            });
        }
    }

    if (params.name) {
        dataSource = dataSource.filter((data) => data?.name?.includes(params.name || ''));
    }
    const result = {
        data: dataSource,
        total: tableListDataSource.length,
        success: true,
        pageSize,
        current: parseInt(`${params.current}`, 10) || 1,
    };

    return res.json(result);
}

function postAssets(req: Request, res: Response, u: string, b: Request) {
    let realUrl = u;
    if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
        realUrl = req.url;
    }

    const body = (b && b.body) || req.body;
    const { method, name, desc, uids, uid } = body;
    console.log(method)
    switch (method) {
        /* eslint no-case-declarations:0 */
        case 'delete':
            tableListDataSource = tableListDataSource.filter((item) => uids.indexOf(item.uid) === -1);
            break;
        case 'post':
            (() => {
                const i = Math.ceil(Math.random() * 10000);
                const newRule: API.AssetInfo = {
                    uid: i.toString(),
                    name: `名称-${i}`,
                    email: '6666669@qq.com',
                    psw: '123456',
                    place: '成都',
                    phone: '1234567489',
                    website: 'https://github.com/zzbigbigboy',
                    remark: '',
                    callNo: i,
                };
                tableListDataSource.unshift(newRule);
                return res.json(newRule);
            })();
            return;

        case 'update':
            (() => {
                let newRule = {};
                tableListDataSource = tableListDataSource.map((item) => {
                    if (item.uid === uid) {
                        newRule = item;
                        return item;
                    }
                    return item;
                });
                return res.json(newRule);
            })();
            return;
        default:
            break;
    }

    const result = {
        list: tableListDataSource,
        pagination: {
            total: tableListDataSource.length,
        },
    };

    res.json(result);
}

export default {
    'GET /api/assets': getAssets,
    'POST /api/assets': postAssets,
    'DELETE /api/assets': postAssets,
};
