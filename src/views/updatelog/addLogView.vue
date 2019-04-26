<template>
	<el-card class="box-card">
		<el-row>
			<el-col>
				<el-input
					type="textarea"
					:autosize="{ minRows: 3, maxRows: 10}"
					placeholder="请输入内容"
					v-model="logText"
				></el-input>
			</el-col>
			<el-col>
				<el-button type="primary" plain class="btn-submit-log" @click="submitUpdateLog">提交</el-button>
			</el-col>
		</el-row>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				logText: ""
			};
		},
		methods: {
			submitUpdateLog() {
				let that = this;
				let text = this.logText.trim();
				let url = "/backend/updatelog/insert";
				this.$axios
					.post(url, {
						log_content: text
					})
					.then(({ data }) => {
						if (!data.status) {
							that.$message({
								message: "提交失败",
								type: "error"
							});
							return;
						}
						that.$message({
							message: "提交成功",
							type: "success"
						});
						console.log(data);
					});
			}
		}
	};
</script>


<style lang="scss">
	.box-card {
		max-width: 480px;
	}
	.btn-submit-log {
		margin-top: 20px !important;
	}
</style>
