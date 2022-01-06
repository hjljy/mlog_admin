<template>
  <div class="article-tags-container">
    <el-card shadow="hover">
      <div class="article-tags mb15">
        <el-button size="small"
                   type="success"
                   class="ml10"
                   @click="onOpenEditTags(0)">
          <el-icon>
            <elementFolderAdd />
          </el-icon>
          新增标签
        </el-button>
        <el-button size="small"
                   type="success"
                   class="ml10"
                   @click="cleanTag">
          <el-icon>
            <elementDelete />
          </el-icon>
          清除未使用标签
        </el-button>
      </div>
      <el-table :data="tableData.data"
                style="width: 100%">
        <el-table-column type="index"
                         label="序号"
                         width="50" />
        <el-table-column prop="tag"
                         label="标签名称"
                         show-overflow-tooltip></el-table-column>
        <el-table-column label="标签颜色"
                         show-overflow-tooltip>

          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-color-picker disabled
                               v-model="scope.row.color"
                               show-alpha />
              <span style="margin-left: 10px">{{ scope.row.color }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="useNum"
                         label="标签使用数"
                         show-overflow-tooltip></el-table-column>
        <el-table-column label="操作"
                         width="150">
          <template #default="scope">
            <el-button size="mini"
                       type="text"
                       @click="onOpenEditTags(1,scope.row)">修改</el-button>
            <el-button size="mini"
                       type="text"
                       @click="onRowDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <EditTags ref="editTagsRef"
              @initTableData="initTableData" />
  </div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import EditTags from '/@/views/article/tags/component/editTags.vue';
import { listTags, delTags, clean } from '/@/api/tags';
export default {
	name: 'tags',
	components: { EditTags },
	setup() {
		const editTagsRef = ref();
		const state: any = reactive({
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					pageNumber: 1,
					pageSize: 10,
				},
			},
		});
		// 初始化表格数据
		const initTableData = async () => {
			const { data } = await listTags();
			state.tableData.data = data;
		};
		// 打开修改用户弹窗
		const onOpenEditTags = (type: number, row: Object) => {
			editTagsRef.value.openDialog(type, row);
		};
		// 删除用户
		const onRowDel = (row: { id: any }) => {
			ElMessageBox.confirm(`此操作将永久删除标签：“${row.tag}”，是否继续?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(async () => {
					await delTags(row.id);
					await initTableData();
					ElMessage.success('删除成功');
				})
				.catch(() => {});
		};
		//清除未使用的标签
		const cleanTag = async () => {
			const { data } = await clean();
			await initTableData();
			ElMessage.success('清除未使用标签：' + data + '条');
		};
		// 页面加载时
		onMounted(() => {
			initTableData();
		});
		return {
			editTagsRef,
			cleanTag,
			initTableData,
			onOpenEditTags,
			onRowDel,
			...toRefs(state),
		};
	},
};
</script>


