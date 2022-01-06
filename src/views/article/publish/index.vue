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
              <md-editor v-model="text"
                         class="markdown-container"
                         @onUploadImg="onUploadImg" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <PublishSetting ref="publishSetting" />
    <EditUser ref="editUserRef" />
  </div>

</template>

<script lang="ts">
import { ref, toRefs, reactive, defineComponent } from 'vue';
import MdEditor from 'md-editor-v3';
import PublishSetting from '/@/views/article/publish/component/publishSetting.vue';
import EditUser from '/@/views/system/user/component/editUser.vue';
import 'md-editor-v3/lib/style.css';
import { publishArticle } from '/@/api/article';
import { upload } from '/@/api/files';
export default defineComponent({
	name: 'md',
	components: { MdEditor, PublishSetting, EditUser },
	setup() {
		const publishSetting = ref();
		const editUserRef = ref();
		const state = reactive({
			value: 'afsafa',
			text: '',
			form: {
				title: '',
				contentMd: '',
			},
		});
		const publish = async (v: number) => {
			if (v === 1) {
				publishSetting.value.openDialog();
			} else {
				state.form.contentMd = state.text;
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

		return {
			publishSetting,
			editUserRef,
			publish,
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
