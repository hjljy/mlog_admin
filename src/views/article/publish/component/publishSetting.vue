<template>
  <div class="publish-setting-container">
    <el-drawer title="文章设置"
               v-model="isShowDialog">
      <div class="mt20 mr20">
        <el-form :model="ruleForm"
                 label-width="90px">
          <el-row>
            <el-col class="mb20">
              <el-form-item label="文章分类">
                <el-select v-model="ruleForm.categoryList"
                           placeholder="请选择"
                           multiple
                           size="large"
                           clearable
                           class="w100">
                  <el-option v-for="item in categoryOptions"
                             :key="item.id"
                             :label="item.category"
                             :value="item.category">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col class="mb20">
              <el-form-item label="文章标签">
                <el-select v-model="ruleForm.tagList"
                           multiple
                           filterable
                           allow-create
                           size="large"
                           class="w100"
                           default-first-option
                           placeholder="请选择或输入文章标签">
                  <el-option v-for="item in tagsOptions"
                             :key="item.id"
                             :label="item.tag"
                             :value="item.tag">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col class="mb20">
              <el-form-item label="封面图片">
                <el-upload class="avatar-uploader"
                           :action="uploadUrl"
                           :on-success="uploadSuccess"
                           :show-file-list="false"
                           :limit="1">
                  <img v-if="ruleForm.thumbnail"
                       :src="ruleForm.thumbnail"
                       class="avatar" />
                  <el-icon v-else
                           class="avatar-uploader-icon">
                    <elementPlus />
                  </el-icon>
                </el-upload>
              </el-form-item>
            </el-col>

            <el-col class="mb20">
              <el-form-item label="文章摘要">
                <el-input v-model="ruleForm.contentText"
                          :rows="4"
                          type="textarea"
                          show-word-limit
                          placeholder="请输入文章摘要 限制256个字符"
                          maxlength="256"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="mb20">
              <el-form-item label="允许评论">
                <el-switch v-model="ruleForm.disallowComment"
                           inline-prompt
                           active-text="启"
                           inactive-text="禁"></el-switch>
              </el-form-item>
            </el-col>
            <el-col class="mb20">
              <el-form-item label="是否置顶">
                <el-switch v-model="ruleForm.top"
                           inline-prompt
                           active-text="启"
                           inactive-text="禁"></el-switch>
              </el-form-item>
            </el-col>
            <el-col class="mb20">
              <el-form-item label="文章路径">
                <el-input v-model="ruleForm.links"
                          placeholder="默认按时间自动生成，通常不建议修改"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col class="mb20">
              <el-form-item label="创建时间">
                <el-input v-model="ruleForm.createTime"
                          placeholder="默认按时间自动生成，通常不建议修改"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col class="mb20">
              <el-form-item>
                <el-button type="primary"
                           @click="onSubmit">发布</el-button>
                <el-button @click="onCancel">取消</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import { listCategory } from '/@/api/category';
import { listTags } from '/@/api/tags';
import { publishArticle } from '/@/api/article';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
export default {
	name: 'articlePublishSetting',
	props: {
		data: {
			type: Object,
			require: false,
		},
	},
	setup(props) {
		const uploadUrl = import.meta.env.VITE_UPLOAD_URL;
		const router = useRouter();
		const state = reactive({
			isShowDialog: false,
			categoryOptions: [],
			tagsOptions: [],
			ruleForm: {
				categoryList: [], //文章分类
				tagList: [], //文章标签
				thumbnail: '', // 文章封面
				links: '', //文章路径
				contentText: '', // 文章摘要
				createTime: new Date().getTime(), //文章创建时间
				title: '', //文章标题
				contentMd: '', //文章内容
				disallowComment: true, //允许评论
				top: false, //置顶
			},
			deptData: [], // 部门数据
		});

		// 打开弹窗
		const openDialog = () => {
			initForm(props.data);
			initTags();
			initCategory();
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
		// 发布文章
		const onSubmit = async () => {
			await publishArticle(state.ruleForm);
			ElMessage.success('文章发布成功');
			router.push('/article/list');
		};
		const uploadSuccess = (res) => {
			const { data } = res;
			state.ruleForm.thumbnail = data.filePath;
		};

		// 初始化标签
		const initTags = async () => {
			const { data } = await listTags();
			state.tagsOptions = data;
		};

		// 初始化分类
		const initCategory = async () => {
			const { data } = await listCategory();
			state.categoryOptions = { ...data };
		};

		const initForm = (data: Object) => {
			state.ruleForm = data;
		};
		return {
			uploadUrl,
			initForm,
			uploadSuccess,
			openDialog,
			closeDialog,
			onCancel,
			onSubmit,
			...toRefs(state),
		};
	},
};
</script>
