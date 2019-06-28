<template>
	<el-dialog title="修改日志" :visible.sync="isShow" :before-close="closeBefore">
		<el-form>
			<el-form-item label="日志内容" label-width="300">
				<el-input
					type="textarea"
					v-model="logContentText"
					:autosize="{ minRows: 2, maxRows: 10}"
					maxlength="200"
					show-word-limit
				></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="dialogStatus(false)">取 消</el-button>
			<el-button type="primary" @click="updateLog" :loading="isRequest">{{isRequest?'提交中':'确 定'}}</el-button>
		</div>
	</el-dialog>
</template>


<script>
	export default {
		props: ["logData", "isShow"],
		data() {
			return {
				isRequest: false,
				logContentText: ""
			};
		},
		methods: {
			dialogStatus(val) {
				this.$emit("dialogStatus", val);
			},
			/**修改日志内容 */
			updateLog() {
				let that = this;
				let logId = this.logData._id;
				let text = this.logContentText.trim();
				let url = "/backend/updatelog/modify";
				this.isRequest = true;
				this.$axios
					.post(url, {
						log_id: logId,
						log_content: text
					})
					.then(({ data }) => {
						this.isRequest = false;
						if (data.status !== 1) {
							that.$message({
								message: "提交失败",
								type: data.msg
							});
							return;
						}
						that.$message({
							message: "提交成功",
							type: "success"
						});
						that.dialogStatus(false);
						that.$emit("onSuccess");
					})
					.catch(err => (this.isRequest = false));
			},
			closeBefore() {
				this.dialogStatus(false);
			},
			removeLog() {}
		},
		computed: {
			logContent() {
				return this.logData.log_content;
			},
			dialogIsShow() {
				return this.isSHow;
			}
		},
		watch: {
			logContent(val) {
				this.logContentText = val;
			}
		}
	};
</script>

