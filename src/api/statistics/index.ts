import request from '/@/utils/request';

/**
 * 总数统计
 * 
 * @returns 返回接口数据
 */
export function statisticsCount() {
  return request({
    url: '/api/statistics/count',
    method: 'get',
  });
}
