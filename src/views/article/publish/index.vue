<template>
  <div>
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <el-button class="button"
                     @click="publish(1)">发布文章</el-button>

          <el-button class="button"
                     @click="publish(2)">保存草稿</el-button>
        </div>
      </template>
      <el-form :model="form"
               size="small"
               label-width="80px">
        <el-row>
          <el-col :xs="24"
                  :sm="24"
                  :md="24"
                  :lg="24"
                  :xl="24"
                  class="mb20">
            <el-form-item label="文章标题">
              <el-input v-model="form.title"
                        placeholder="请输入文章标题"
                        clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24"
                  :sm="24"
                  :md="24"
                  :lg="24"
                  :xl="24">
            <el-form-item label="文章内容">
              <md-editor v-model="form.contentMd"
                         class="markdown-container"
                         @onUploadImg="onUploadImg"
                         @onHtmlChanged="onHtmlChange" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <PublishSetting ref="publishSetting"
                    :data="form" />

  </div>

</template>

<script lang="ts">
import { ref, toRefs, reactive, defineComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import MdEditor from 'md-editor-v3';
import PublishSetting from '/@/views/article/publish/component/publishSetting.vue';

import 'md-editor-v3/lib/style.css';
import { getArticle, publishArticle } from '/@/api/article';
import { upload } from '/@/api/files';
export default defineComponent({
	name: 'md',
	components: { MdEditor, PublishSetting },
	setup() {
		const route = useRoute();
		const publishSetting = ref();
		const editUserRef = ref();
		const state = reactive({
			form: {
				category: [], //文章分类
				tagList: [], //文章标签
				thumbnail: '', // 文章封面
				links: '', //文章路径
				contentText: '', // 文章内容
				abstractText: '', //文章摘要
				createTime: new Date().getTime(), //文章创建时间
				title: '', //文章标题
				contentMd: '', //文章内容
				disallowComment: true, //允许评论
				top: false, //置顶
			},
		});
		const publish = async (v: number) => {
			if (v === 1) {
				publishSetting.value.openDialog();
			} else {
				await publishArticle(state.form);
			}
		};
		// eslint-disable-next-line no-unused-vars
		const onUploadImg = async (files: FileList, callback: (urls: string[]) => void) => {
			const res = await Promise.all(
				Array.from(files).map((file) => {
					return new Promise((rev, rej) => {
						const form = new FormData();
						form.append('file', file);
						upload(form)
							.then((res) => rev(res))
							.catch((error) => rej(error));
					});
				})
			);
			callback(res.map((item: any) => item.data.filePath));
		};

		const onHtmlChange = (v: string) => {
			state.form.contentText = v;
		};
		const initForm = async () => {
			if (route.query.articleId) {
				const { data } = await getArticle(route.query.articleId);
				state.form = data;
			}
		};
		onMounted(async () => {
			await initForm();
		});
		return {
			publishSetting,
			editUserRef,
			publish,
			onHtmlChange,
			onUploadImg,
			...toRefs(state),
		};
	},
});
</script>

<style scoped lang="scss">
.markdown-container {
	min-height: 650px;
}
.card-header {
	text-align: right;
}
</style>
