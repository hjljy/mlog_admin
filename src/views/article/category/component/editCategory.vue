<template>
  <div class="publish-setting-container">
    <el-drawer title="文章分类"
               @closed="initForm"
               v-model="isShowDialog">
      <div class="mt20 mr20">
        <el-form :model="ruleForm"
                 label-width="90px">
          <el-form-item label="分类名称">
            <el-input v-model="ruleForm.category"
                      placeholder="请输入分类名称"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="分类图片">
            <el-upload class="avatar-uploader"
                       :action="uploadUrl"
                       :on-success="uploadSuccess"
                       :show-file-list="false"
                       :limit="1">
              <img v-if="ruleForm.categoryImage"
                   :src="ruleForm.categoryImage"
                   class="avatar" />
              <el-icon v-else
                       class="avatar-uploader-icon">
                <elementPlus />
              </el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="分类描述">
            <el-input v-model="ruleForm.remark"
                      placeholder="请输入分类描述"
                      type="textarea"
                      clearable></el-input>
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
import { addCategory, updateCategory } from '/@/api/category';
import { ElMessage } from 'element-plus';

export default {
	name: 'articleCategoryEdit',
	setup(props, context) {
		const state = reactive({
			isShowDialog: false,
			ruleForm: {},
			deptData: [], // 部门数据
		});
		const uploadUrl = import.meta.env.VITE_UPLOAD_URL;

		const uploadSuccess = (res) => {
			const { data } = res;
			state.ruleForm.categoryImage = data.filePath;
		};
		//初始化表单参数
		const initForm = () => {
			state.ruleForm = {
				category: '',
				categoryImage: '',
				remark: '',
			};
		};
		// 打开弹窗
		const openDialog = (type: number, row: any) => {
			state.isShowDialog = true;
			if (type === 1) {
				state.ruleForm = { ...row };
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
				await updateCategory(state.ruleForm);
				ElMessage.success('更新成功');
			} else {
				await addCategory(state.ruleForm);
				ElMessage.success('新增成功');
			}
			context.emit('initTableData');
			closeDialog();
		};

		// 页面加载时
		onMounted(() => {
			initForm();
		});
		return {
			uploadUrl,
			uploadSuccess,
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
