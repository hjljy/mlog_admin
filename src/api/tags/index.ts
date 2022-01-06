import request from '/@/utils/request';

/**
 * 返回所有标签
 * 
 * @returns 返回接口数据
 */
export function listTags() {
  return request({
    url: '/api/tags',
    method: 'get',
  });
}

/**
 * 新增标签
 * 
 * @returns 返回接口数据
 */
export function addTags(data: Object) {
  return request({
    url: '/api/tags',
    method: 'post',
    data
  });
}


/**
 * 修改标签
 * 
 * @returns 返回接口数据
 */
export function updateTags(data: Object) {
  return request({
    url: '/api/tags',
    method: 'put',
    data
  });
}


/**
 * 删除标签
 * 
 * @returns 返回接口数据
 */
export function delTags(id: Object) {
  return request({
    url: '/api/tags/' + id,
    method: 'delete',
  });
}

/**
 * 清除未使用的标签
 * 
 * @returns 返回接口数据
 */
export function clean() {
  return request({
    url: '/api/tags/clean',
    method: 'delete',
  });
}

