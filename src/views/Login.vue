<template>
	<el-row type="flex" justify="center" align="middle" style="height:100%">
		<transition enter-active-class="fadeIn">
			<div class="el-col" v-if="isShow">
				<el-card>
					<div slot="header">登陆</div>
					<el-form
						:label-position="labelPosition"
						label-width="80px"
						:model="formLabel"
						:rules="rules"
						ref="ruleForm"
					>
						<el-form-item label="用户名" prop="name">
							<el-input v-model="formLabel.name"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input v-model="formLabel.password" show-password></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
							<el-button @click="resetForm('ruleForm')">注册</el-button>
						</el-form-item>
					</el-form>
				</el-card>
			</div>
		</transition>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false,
				labelPosition: "right",
				formLabel: {
					name: "",
					password: ""
				},
				ruleForm: {
					name: "",
					password: ""
				},
				//表单效验规则
				rules: {
					name: [
						{ required: true, message: "请输入用户名", trigger: "blur" },
						{ min: 3, max: 13, message: "长度在 3 到 13 个字符", trigger: "blur" }
					],
					password: [
						{ required: true, message: "请输入密码", trigger: "blur" },
						{ min: 3, max: 13, message: "长度在 3 到 13 个字符", trigger: "blur" }
					]
				}
			};
		},
		methods: {
			/**
			 * 提交登录
			 */
			submitForm(formName) {
				let that = this;
				this.$refs[formName].validate(valid => {
					if (!valid) return;
				});
				this.$axios
					.post("/login", {
						uname: this.formLabel.name,
						upwd: this.formLabel.password
					})
					.then(({ data }) => {
						if (!data.status) {
							alert("login error");
							return;
						}
						that.$router.push({
							path: "/index"
						});
					});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		},
		mounted() {
			this.isShow = true;
		},
		created() {
			let that = this;
			//监听回车
			document.onkeyup = function(e) {
				var key = window.event.keyCode;
				if (key == 13) {
					that.submitForm("ruleForm");
				}
			};
		}
	};
</script>


<style lang="scss">
	.fadeIn {
		animation: fadeInDown 1s forwards;
	}
	@keyframes fadeInDown {
		0% {
			transform: translateY(-20%);
			opacity: 0;
		}
		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}
</style>
