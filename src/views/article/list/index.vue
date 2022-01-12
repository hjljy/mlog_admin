<template>
  <div class="article-list-container">
    <el-card shadow="hover">
      <div class="article-list-search mb15">
        <el-input v-model="tableData.param.title"
                  size="small"
                  placeholder="请输入文章名称"
                  style="max-width: 180px"> </el-input>
        <el-button @click="initTableData"
                   size="small"
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
                   @click="onOpenPublished">
          <el-icon>
            <elementFolderAdd />
          </el-icon>
          发布文章
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
        <el-table-column prop="wordCount"
                         label="文章字数"
                         width="120"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="commentCount"
                         label="评论数"
                         width="120"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="viewCount"
                         label="浏览数"
                         width="120"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="categoryList"
                         label="文章分类"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="tagList"
                         label="文章标签"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="status"
                         label="是否置顶"
                         width="120"
                         show-overflow-tooltip>
          <template #default="scope">
            <el-switch v-model="scope.row.top"
                       inline-prompt
                       active-text="是"
                       inactive-text="否">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="describe"
                         label="允许评论"
                         width="120"
                         show-overflow-tooltip>
          <template #default="scope">
            <el-switch v-model="scope.row.disallowComment"
                       inline-prompt
                       active-text="是"
                       inactive-text="否">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime"
                         label="最后操作时间"
                         width="180"
                         :formatter="dateFormatYMDHMS"
                         show-overflow-tooltip></el-table-column>
        <el-table-column label="操作"
                         width="100">
          <template #default="scope">
            <el-button size="mini"
                       type="text"
                       @click="onOpenPublished(scope.row.id)">编辑</el-button>
            <el-button size="mini"
                       type="text"
                       @click="onRowDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="mt15"
                     background
                     :hide-on-single-page="false"
                     :pager-count="5"
                     :page-sizes="[10, 20, 30]"
                     v-model:current-page="tableData.param.pageNumber"
                     v-model:page-size="tableData.param.pageSize"
                     layout='prev, pager, next, jumper, ->, total'
                     :total="tableData.total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessageBox, ElMessage } from 'element-plus';

import commonFunction from '/@/utils/commonFunction';
import { pageQuery } from '/@/api/article';
export default {
	name: 'articleList',
	setup() {
		const { dateFormatYMDHMS } = commonFunction();
		const editUserRef = ref();
		const router = useRouter();
		const state: any = reactive({
			tableData: {
				data: [],
				total: 1,
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
			state.tableData.total = Number(data.total);
		};
		// 打开新增用户弹窗
		const onOpenPublished = (articleId: any) => {
			if (articleId) {
				router.push({ path: '/article/publish', query: { articleId: articleId } });
			} else {
				router.push('/article/publish');
			}
		};
		// 打开修改用户弹窗
		const onOpenEditUser = (row: Object) => {
			editUserRef.value.openDialog(row);
		};
		// 删除用户
		const onRowDel = (row: { title: any }) => {
			ElMessageBox.confirm(`此操作将永久删除文章：“${row.title}”，是否继续?`, '提示', {
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
			dateFormatYMDHMS,
			initTableData,
			onOpenPublished,
			onOpenEditUser,
			onRowDel,
			onHandleSizeChange,
			onHandleCurrentChange,
			...toRefs(state),
		};
	},
};
</script>


