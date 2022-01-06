<template>
  <div class="system-user-container">
    <el-card shadow="hover">
      <div class="system-user-search mb15">
        <el-input v-model="tableData.param.title"
                  size="small"
                  placeholder="请输入文章名称"
                  style="max-width: 180px"> </el-input>
        <el-button size="small"
                   type="primary"
                   class="ml10">
          <el-icon>
            <elementSearch />
          </el-icon>
          查询
        </el-button>
        <el-button size="small"
                   type="success"
                   class="ml10"
                   @click="onOpenAddUser">
          <el-icon>
            <elementFolderAdd />
          </el-icon>
          新增用户
        </el-button>
      </div>
      <el-table :data="tableData.data"
                style="width: 100%">
        <el-table-column type="index"
                         label="序号"
                         width="50" />

        <el-table-column prop="title"
                         label="文章标题"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="workCount"
                         label="文章字数"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="commentCount"
                         label="评论数"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="viewCount"
                         label="浏览数"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="title"
                         label="文章分类"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="title"
                         label="文章标签"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="status"
                         label="是否置顶"
                         show-overflow-tooltip>
          <template #default="scope">
            <el-tag type="success"
                    v-if="scope.row.status">启用</el-tag>
            <el-tag type="info"
                    v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="describe"
                         label="是否允许评论"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="updateTime"
                         label="最后操作时间"
                         show-overflow-tooltip></el-table-column>
        <el-table-column label="操作"
                         width="100">
          <template #default="scope">
            <el-button :disabled="scope.row.userName === 'admin'"
                       size="mini"
                       type="text"
                       @click="onOpenEditUser(scope.row)">修改</el-button>
            <el-button :disabled="scope.row.userName === 'admin'"
                       size="mini"
                       type="text"
                       @click="onRowDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="onHandleSizeChange"
                     @current-change="onHandleCurrentChange"
                     class="mt15"
                     :pager-count="5"
                     :page-sizes="[10, 20, 30]"
                     v-model:current-page="tableData.param.pageNumber"
                     background
                     v-model:page-size="tableData.param.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="tableData.total">
      </el-pagination>
    </el-card>
    <AddUer ref="addUserRef" />
    <EditUser ref="editUserRef" />
  </div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import AddUer from '/@/views/system/user/component/addUser.vue';
import EditUser from '/@/views/system/user/component/editUser.vue';
import { pageQuery } from '/@/api/article';
export default {
	name: 'articleList',
	components: { AddUer, EditUser },
	setup() {
		const addUserRef = ref();
		const editUserRef = ref();
		const state: any = reactive({
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					title: '',
					pageNumber: 1,
					pageSize: 10,
				},
			},
		});
		// 初始化表格数据
		const initTableData = async () => {
			const { data } = await pageQuery(state.tableData.param);
			state.tableData.data = data.records;
			state.tableData.total = state.tableData.data.total;
		};
		// 打开新增用户弹窗
		const onOpenAddUser = () => {
			addUserRef.value.openDialog();
		};
		// 打开修改用户弹窗
		const onOpenEditUser = (row: Object) => {
			editUserRef.value.openDialog(row);
		};
		// 删除用户
		const onRowDel = (row: { userName: any }) => {
			ElMessageBox.confirm(`此操作将永久删除账户名称：“${row.userName}”，是否继续?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					ElMessage.success('删除成功');
				})
				.catch(() => {});
		};
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.tableData.param.pageSize = val;
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.pageNumber = val;
		};
		// 页面加载时
		onMounted(() => {
			initTableData();
		});
		return {
			addUserRef,
			editUserRef,
			onOpenAddUser,
			onOpenEditUser,
			onRowDel,
			onHandleSizeChange,
			onHandleCurrentChange,
			...toRefs(state),
		};
	},
};
</script>


