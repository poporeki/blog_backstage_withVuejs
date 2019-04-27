<template>
	<el-row type="flex" justify="center" align="middle" style="height:100%" class="login-wrapper">
		<div class="progressive bg-img-box">
			<img
				class="preview"
				v-progressive="background.preview"
				:data-srcset="background.src"
				:src="background.src"
			>
		</div>
		<transition enter-active-class="fadeIn">
			<div class="el-col" v-if="isShow">
				<el-card class="card-box">
					<div slot="header" class="card-header">
						<img src="https://www.yansk.cn/images/logo.png" alt="login" class="logo-img">
						<h2>后台登陆</h2>
					</div>
					<el-form
						:label-position="labelPosition"
						label-width="80px"
						:model="formLabel"
						:rules="rules"
						ref="ruleForm"
						class="login-form-box"
					>
						<el-form-item label="用户名" prop="name">
							<el-input v-model="formLabel.name"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input v-model="formLabel.password" show-password></el-input>
						</el-form-item>
					</el-form>
					<div class="btn-login-wrapper">
						<el-button type="primary" @click="submitForm('ruleForm')" class="btn-login">登陆</el-button>
					</div>
				</el-card>
			</div>
		</transition>
	</el-row>
</template>

<script>
	import "progressive-image/dist/index.css";
	export default {
		data() {
			return {
				background: {
					preview:
						"https://msagfx.live.com/16.000.28156.5/images/Backgrounds/0-small.jpg?x=138bcee624fa04ef9b75e86211a9fe0d",
					src:
						"https://msagfx.live.com/16.000.28156.5/images/Backgrounds/0.jpg?x=a5dbd4393ff6a725c7e62b61df7e72f0"
				},
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
	.card-header {
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
		.logo-img {
			max-height: 40px;
		}
	}
	.card-box {
		border-radius: 0 !important;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
		.el-card__header {
			font-weight: bold;
		}
	}
	.bg-img-box {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		z-index: -1;
		text-align: center;
		> img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	.login-form-box {
		margin: 0 30px 0 0;
	}
	.btn-login-wrapper {
		position: relative;
		margin: 10px 20px;
		.btn-login {
			width: 100%;
		}
	}
</style>
