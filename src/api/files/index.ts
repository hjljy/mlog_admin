import request from '/@/utils/request';

/**
 * 总数统计
 * 
 * @returns 返回接口数据
 */
export function upload(params: Object) {
  return request({
    url: import.meta.env.VITE_UPLOAD_URL as any,
    method: 'post',
    data: params,
    headers: { 'Content-Type': 'multipart/form-data' }
  });
}


