// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取规则列表 GET /api/assets */
export async function assets(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<APP.AssetInfo>('/api/assets', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/assets */
export async function updateAsset(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/assets', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/assets */
export async function addAsset(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/assets', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/assets */
export async function removeAsset(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/assets', {
    method: 'DELETE',
    ...(options || {}),
  });
}
