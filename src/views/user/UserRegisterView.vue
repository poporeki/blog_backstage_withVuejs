<template>
	<el-card>
		<el-form
			status-icon
			:model="ruleForm"
			:rules="rules"
			ref="ruleForm"
			label-width="100px"
			class="demo-ruleForm"
		>
			<el-form-item label="用户名" prop="name">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item label="权限" required>
				<el-select v-model="ruleForm.permission" placeholder="请选择权限">
					<el-option label="普通(NORMAL)" value="normal" v-if="userPermi==='admin'|| userPermi==='root'"></el-option>
					<el-option label="管理员(ADMINISTRATOR)" value="admin" v-if="userPermi==='root'"></el-option>
					<el-option label="超级管理员(ROOT)" value="root" v-if="userPermi==='root'"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="密码" prop="pass" required>
				<el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="checkPass" required>
				<el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item
				prop="email"
				label="邮箱"
				:rules="[
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
			>
				<el-input v-model="ruleForm.email"></el-input>
			</el-form-item>
			<el-form-item label="出生日期">
				<el-col :span="11">
					<el-form-item prop="birth">
						<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birth" style="width: 100%;"></el-date-picker>
					</el-form-item>
				</el-col>
			</el-form-item>
			<el-form-item label="个人简介" prop="desc">
				<el-input type="textarea" v-model="ruleForm.desc"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	export default {
		data() {
			var checkName = (rule, value, callback) => {
				if (!value) {
					return callback(new Error("用户名不能为空"));
				}
				let url = "/verify/checkUserName";
				this.$axios
					.post(url, {
						username: this.ruleForm.name
					})
					.then(({ data }) => {
						if (!data) {
							return callback(new Error("此名字已被占用"));
						}
						callback();
					});
			};
			var validatePass = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入密码"));
				} else {
					if (this.ruleForm.checkPass !== "") {
						this.$refs.ruleForm.validateField("checkPass");
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请再次输入密码"));
				} else if (value !== this.ruleForm.pass) {
					callback(new Error("两次输入密码不一致!"));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					email: "",
					permission: "",
					birth: "",
					name: "",
					pass: "",
					checkPass: "",
					desc: ""
				},
				rules: {
					name: [
						{ required: true, message: "请输入用户名", trigger: "change" },
						{
							min: 6,
							max: 13,
							message: "长度在 6 到 13 个字符",
							trigger: "change"
						},
						{ validator: checkName, trigger: "change" }
					],
					pass: [
						{ validator: validatePass, trigger: "blur" },
						{ min: 6, max: 13, message: "长度在 6 到 13 个字符", trigger: "blur" }
					],
					checkPass: [{ validator: validatePass2, trigger: "blur" }]
				}
			};
		},
		computed: {
			userPermi() {
				return this.$store.state.userInfo.permissions;
			}
		},
		methods: {
			submitForm(formName) {
				let that = this;
				this.$refs[formName].validate(valid => {
					if (valid) {
						that.requestTo();
					} else {
						console.log("error submit!!");
						return false;
					}
				});
			},
			requestTo() {
				let that = this;
				let url = "/backend/regg";
				this.$axios
					.post(url, {
						reg_name: this.ruleForm.name,
						reg_pwd: this.ruleForm.pass,
						reg_birth: this.ruleForm.birth,
						reg_email: this.ruleForm.email,
						reg_desc: this.ruleForm.desc,
						reg_permissions: this.ruleForm.permission
					})
					.then(({ data }) => {
						if (data.status !== 1) {
							this.$message({
								type: "error",
								message: "注册失败,请重试"
							});
							return;
						}
						this.$message({
							type: "success",
							message: "注册成功"
						});
						// window.reload();
						this.$router.push({
							path: "/blank"
						});
						// that.resetFormData();
						console.log(data);
					});
			},
			resetFormData() {
				let obj = this.ruleForm;
				for (let val in obj) {
					obj[val] = "";
				}
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	};
</script>

<style lang="scss">
	.hr-line {
		margin-top: 50px 0;
	}
</style>
