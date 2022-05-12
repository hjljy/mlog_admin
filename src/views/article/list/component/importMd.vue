<template>
  <el-dialog v-model="isShowDialog"
             title="Tips"
             width="30%">
    <el-upload class="upload-demo"
               :http-request="uploadMd"
               :on-error="uploadError"
               :before-upload="beforeUpload"
               name="files"
               multiple>
      <el-button type="primary">Click to upload</el-button>
      <template #tip>
      </template>
    </el-upload>
  </el-dialog>
</template>
<script lang="ts">
import { reactive, toRefs } from 'vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';
import { Session } from '/@/utils/storage';
export default {
	name: 'importMd',
	setup() {
		const state = reactive({
			isShowDialog: false,
			ruleForm: {},
			deptData: [], // 部门数据
		});
		const uploadUrl = import.meta.env.VITE_MD_UPLOAD_URL;

		const beforeUpload = (file) => {
			//获取最后一个.的位置
			var index = file.name.lastIndexOf('.');
			//获取后缀
			var ext = file.name.substr(index + 1);
			if (['md'].indexOf(ext.toLowerCase()) == -1) {
				ElMessage({
					type: 'warning',
					message: '请上传后缀名为md的附件！',
				});
				return false;
			}
		};
		const uploadError = () => {
			ElMessage({
				type: 'warning',
				message: '上传文件失败',
			});
		};
		//上传失败
		const uploadMd = (param) => {
			var fileObj = param.file;
			var form = new FormData();
			// 文件对象
			form.append('files', fileObj);
			axios
				.post(uploadUrl, form, {
					headers: {
						Authorization: Session.get('token'),
					},
				})
				.then((res) => {
					if (res.data.code != 0) {
						param.onError(res.data.msg);
					} else {
						param.onSuccess();
					}
				})
				.catch(({ err }) => {
					param.onError(err);
				});
		};
		// 打开弹窗
		const openDialog = () => {
			state.isShowDialog = true;
		};
		// 关闭弹窗
		const closeDialog = () => {
			state.isShowDialog = false;
		};

		// 取消
		const onCancel = () => {
			closeDialog();
		};

		return {
			uploadUrl,
			uploadError,
			beforeUpload,
			uploadMd,
			openDialog,
			closeDialog,
			onCancel,
			...toRefs(state),
		};
	},
};
</script>
