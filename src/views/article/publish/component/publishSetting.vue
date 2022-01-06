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
                <el-select v-model="ruleForm.roleSign"
                           placeholder="请选择"
                           clearable
                           class="w100">
                  <el-option label="超级管理员"
                             value="admin"></el-option>
                  <el-option label="普通用户"
                             value="common"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col class="mb20">
              <el-form-item label="文章标签">
                <el-select v-model="value"
                           multiple
                           filterable
                           allow-create
                           default-first-option
                           placeholder="Choose tags for your article">
                  <el-option v-for="item in options"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col class="mb20">
              <el-form-item label="文章路径">
                <el-input v-model="ruleForm.phone"
                          placeholder="请输入手机号"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24"
                    :sm="12"
                    :md="12"
                    :lg="12"
                    :xl="12"
                    class="mb20">
              <el-form-item label="封面图片">
                <el-input v-model="ruleForm.email"
                          placeholder="请输入"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24"
                    :sm="12"
                    :md="12"
                    :lg="12"
                    :xl="12"
                    class="mb20">
              <el-form-item label="允许评论">
                <el-select v-model="ruleForm.sex"
                           placeholder="请选择"
                           clearable
                           class="w100">
                  <el-option label="男"
                             value="男"></el-option>
                  <el-option label="女"
                             value="女"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24"
                    :sm="12"
                    :md="12"
                    :lg="12"
                    :xl="12"
                    class="mb20">
              <el-form-item label="文章摘要">
                <el-input v-model="ruleForm.password"
                          placeholder="请输入"
                          type="password"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24"
                    :sm="12"
                    :md="12"
                    :lg="12"
                    :xl="12"
                    class="mb20">
              <el-form-item label="是否置顶">
                <el-date-picker v-model="ruleForm.overdueTime"
                                type="date"
                                placeholder="请选择"
                                class="w100"> </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24"
                    :sm="12"
                    :md="12"
                    :lg="12"
                    :xl="12"
                    class="mb20">
              <el-form-item label="用户状态">
                <el-switch v-model="ruleForm.status"
                           inline-prompt
                           active-text="启"
                           inactive-text="禁"></el-switch>
              </el-form-item>
            </el-col>
            <el-col class="mb20">
              <el-form-item label="文章摘要">
                <el-input v-model="ruleForm.describe"
                          type="textarea"
                          placeholder="请输入用户描述"
                          maxlength="150"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue';

import { listTags } from '/@/api/tags';
export default {
	name: 'articlePublishSetting',
	setup() {
		const state = reactive({
			isShowDialog: false,
			ruleForm: {
				dynamicTags: [],
				userName: '', // 账户名称
				userNickname: '', // 用户昵称
				roleSign: '', // 关联角色
				department: [], // 部门
				phone: '', // 手机号
				email: '', // 邮箱
				sex: '', // 性别
				password: '', // 账户密码
				overdueTime: '', // 账户过期
				status: true, // 用户状态
				describe: '', // 用户描述
			},
			deptData: [], // 部门数据
		});
		const list = [];
		const options = [
			{
				value: 'HTML',
				label: 'HTML',
			},
			{
				value: 'CSS',
				label: 'CSS',
			},
			{
				value: 'JavaScript',
				label: 'JavaScript',
			},
		];
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
		// 新增
		const onSubmit = () => {
			closeDialog();
		};

		// 初始化标签
		const initTableData = () => {
			state.deptData.push({
				deptName: 'vueNextAdmin',
				createTime: new Date().toLocaleString(),
				status: true,
				sort: Number.parseInt(Math.random()),
				describe: '顶级部门',
				id: Math.random(),
				children: [
					{
						deptName: 'IT外包服务',
						createTime: new Date().toLocaleString(),
						status: true,
						sort: Number.parseInt(Math.random()),
						describe: '总部',
						id: Math.random(),
					},
					{
						deptName: '资本控股',
						createTime: new Date().toLocaleString(),
						status: true,
						sort: Number.parseInt(Math.random()),
						describe: '分部',
						id: Math.random(),
					},
				],
			});
		};
		const initTags = async () => {
			const { data } = await listTags();
		};

		// 页面加载时
		onMounted(() => {
			initTableData();
			initTags();
		});
		return {
			openDialog,
			closeDialog,
			onCancel,
			onSubmit,
			...toRefs(state),
		};
	},
};
</script>
