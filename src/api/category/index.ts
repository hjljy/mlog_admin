import request from '/@/utils/request';

/**
 * 返回所有分类
 * 
 * @returns 返回接口数据
 */
export function listCategory() {
  return request({
    url: '/api/admin/category',
    method: 'get',
  });
}

/**
 * 新增分类
 * 
 * @returns 返回接口数据
 */
export function addCategory(data: Object) {
  return request({
    url: '/api/admin/category',
    method: 'post',
    data
  });
}


/**
 * 修改分类
 * 
 * @returns 返回接口数据
 */
export function updateCategory(data: Object) {
  return request({
    url: '/api/admin/category',
    method: 'put',
    data
  });
}


/**
 * 删除分类
 * 
 * @returns 返回接口数据
 */
export function delCategory(id: Object) {
  return request({
    url: '/api/admin/category/' + id,
    method: 'delete',
  });
}



