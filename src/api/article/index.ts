import request from '/@/utils/request';

/**
 * 总数统计
 * 
 * @returns 返回接口数据
 */
export function pageByQuery(params: Object) {
  return request({
    url: '/api/admin/article/page',
    method: 'post',
    data: params,
  });
}

/**
 * 发布文章
 * 
 * @returns 返回接口数据
 */
export function publishArticle(params: Object) {
  return request({
    url: '/api/admin/article/',
    method: 'post',
    data: params,
  });
}

/**
 * 获取文章
 * 
 * @returns 返回接口数据
 */
export function getArticle(id: Object) {
  return request({
    url: '/api/admin/article/' + id,
    method: 'get'
  });
}

/**
 * 删除文章
 * 
 * @returns 返回接口数据
 */
export function delArticle(id: Object) {
  return request({
    url: '/api/admin/article/' + id,
    method: 'delete'
  });
}

