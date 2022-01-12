<template>
  <div class="list-adapt-container">
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <el-button size="small"
                     type="success"
                     class="ml10"
                     @click="onOpenEdit(0)">
            <el-icon>
              <elementFolderAdd />
            </el-icon>
            新增分类
          </el-button>
        </div>
      </template>
      <div class="flex-warp"
           v-if="tableData.data.length > 0">
        <el-row :gutter="15">
          <el-col :xs="24"
                  :sm="12"
                  :md="8"
                  :lg="6"
                  :xl="4"
                  class="mb15"
                  v-for="(v, k) in tableData.data"
                  :key="k">
            <div class="flex-warp-item">
              <div class="flex-warp-item-box">
                <div class="item-txt">
                  <div class="item-txt-title">{{ v.category }}</div>
                </div>
                <div class="item-img">
                  <img :src="v.categoryImage" />
                </div>
                <div class="item-txt">
                  <div class="item-txt-remark">{{ v.remark }}</div>
                </div>
                <div class="item-options">
                  <el-button @click="onOpenEdit(1,v)"
                             circle>
                    <el-icon>
                      <elementEdit />
                    </el-icon>
                  </el-button>
                  <el-button @click="onRowDel(v)"
                             circle>
                    <el-icon>
                      <elementDelete />
                    </el-icon>
                  </el-button>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-empty v-else
                description="
                             暂无数据">
      </el-empty>
    </el-card>
    <EditCategory ref="editCategoryRef"
                  @initTableData="initTableData" />
  </div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import EditCategory from '/@/views/article/category/component/editCategory.vue';
import { delCategory, listCategory } from '/@/api/category';
export default {
	name: 'pagesListAdapt',
	components: { EditCategory },
	setup() {
		const editCategoryRef = ref();
		const state = reactive({
			tableData: {
				data: [],
				total: 99,
				loading: false,
				param: {
					pageNum: 1,
					pageSize: 10,
				},
			},
		});
		//打开编辑弹窗
		const onOpenEdit = (type: number, row: Object) => {
			editCategoryRef.value.openDialog(type, row);
		};
		// 删除分类
		const onRowDel = (row: { id: any }) => {
			ElMessageBox.confirm(`此操作将永久删除分类：“${row.category}”，是否继续?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(async () => {
					await delCategory(row.id);
					await initTableData();
					ElMessage.success('删除成功');
				})
				.catch(() => {});
		};

		const initTableData = async () => {
			const { data } = await listCategory();
			state.tableData.data = data;
		};
		onMounted(() => {
			initTableData();
		});
		return {
			editCategoryRef,
			onOpenEdit,
			onRowDel,
			initTableData,
			...toRefs(state),
		};
	},
};
</script>

<style scoped lang="scss">
.card-header {
	text-align: right;
}
.flex-warp {
	display: flex;
	flex-wrap: wrap;
	align-content: flex-start;
	margin: 0 -5px;
	.flex-warp-item {
		padding: 5px;
		width: 100%;
		height: 350px;
		.flex-warp-item-box {
			position: relative;
			border: 1px solid #ebeef5;
			width: 100%;
			height: 100%;
			border-radius: 2px;
			display: flex;
			flex-direction: column;
			transition: all 0.3s ease;
			.item-img {
				width: 100%;
				height: 215px;
				overflow: hidden;
				img {
					transition: all 0.3s ease;
					width: 100%;
					height: 100%;
				}
				&:hover {
					cursor: pointer;
					border: 1px solid var(--color-primary);
					transition: all 0.3s ease;
					box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.03);
					.item-txt-title {
						color: var(--color-primary) !important;
						transition: all 0.3s ease;
					}
					.item-img {
						img {
							transition: all 0.3s ease;
							transform: translateZ(0) scale(1.05);
						}
					}
				}
			}
			.item-txt {
				padding: 10px;
				display: inline;
				flex-direction: column;
				overflow: hidden;
				.item-txt-title {
					text-overflow: ellipsis;
					overflow: hidden;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					display: -webkit-box;
					color: #666666;
					transition: all 0.3s ease;
					&:hover {
						color: var(--color-primary);
						text-decoration: underline;
						transition: all 0.3s ease;
					}
				}
				.item-txt-remark {
					display: inline-block;
				}
			}
			.item-options {
				position: absolute;
				bottom: 3px;
				right: 3px;
			}
		}
	}
}
</style>
