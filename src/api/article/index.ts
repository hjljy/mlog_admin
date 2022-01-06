import request from '/@/utils/request';

/**
 * 总数统计
 * 
 * @returns 返回接口数据
 */
export function pageQuery(params: Object) {
  return request({
    url: '/api/article/page',
    method: 'post',
    data: params,
  });
}

/**
 * 总数统计
 * 
 * @returns 返回接口数据
 */
export function publishArticle(params: Object) {
  return request({
    url: '/api/article/',
    method: 'post',
    data: params,
  });
}
