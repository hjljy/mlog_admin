<template>
  <div class="publish-setting-container">
    <el-drawer title="文章标签"
               @closed="initForm"
               v-model="isShowDialog">
      <div class="mt20 mr20">
        <el-form :model="ruleForm"
                 label-width="90px">
          <el-form-item label="标签名称">
            <el-input v-model="ruleForm.tag"
                      placeholder="请输入标签名称"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="标签颜色">
            <el-color-picker v-model="ruleForm.color" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="onSubmit">保存</el-button>
            <el-button @click="onCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue';
import { addTags, updateTags } from '/@/api/tags';
import { ElMessage } from 'element-plus';
export default {
	name: 'articleTagsEdit',
	setup(props, context) {
		const state = reactive({
			isShowDialog: false,
			ruleForm: {},
			deptData: [], // 部门数据
		});

		//初始化表单参数
		const initForm = () => {
			state.ruleForm = {
				tag: '',
				color: '#ffffff',
			};
		};
		// 打开弹窗
		const openDialog = (type: number, row: any) => {
			state.isShowDialog = true;
			if (type === 1) {
				state.ruleForm = row;
			}
		};
		// 关闭弹窗
		const closeDialog = () => {
			state.isShowDialog = false;
		};

		// 取消
		const onCancel = () => {
			closeDialog();
		};
		// 保存
		const onSubmit = async () => {
			if (state.ruleForm.id) {
				await updateTags(state.ruleForm);
				ElMessage.success('更新成功');
			} else {
				await addTags(state.ruleForm);
				ElMessage.success('新增成功');
			}
			context.emit('initTableData');
			closeDialog();
		};

		// 页面加载时
		onMounted(() => {});
		return {
			initForm,
			openDialog,
			closeDialog,
			onCancel,
			onSubmit,
			...toRefs(state),
		};
	},
};
</script>
