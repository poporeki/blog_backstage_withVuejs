<template>
	<el-card>
		<el-table :data="logData">
			<el-table-column prop="log_content" label="日志内容"></el-table-column>
			<el-table-column prop="create_time" label="添加时间"></el-table-column>
			<el-table-column fixed="right" label="操作" width="120">
				<template slot-scope="scope">
					<el-button @click.native.prevent="showDialog(scope.row)" type="text" size="small">修改</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			background
			layout="prev, pager, next"
			:total="logTotal"
			@current-change="changePage"
		></el-pagination>
		<dialog-log
			:isShow="isShowDialog"
			:log-data="dialogLogData"
			@dialogStatus="dialogStatus"
			@onSuccess="updateOnSuccess"
		></dialog-log>
	</el-card>
</template>


<script>
	import dialogLog from "@/components/home/UpdateLogListDialog";
	export default {
		components: { dialogLog },
		data() {
			return {
				isShowDialog: false,
				dialogLogData: {},
				logTotal: 0,
				page: 1,
				logData: []
			};
		},
		methods: {
			getUpdateLogList(page) {
				let url = "/backend/updatelog";
				let that = this;
				this.$axios.get(url, { params: { page } }).then(({ data }) => {
					console.log(data);
					that.logTotal = data.data.logTotal;
					that.logData = data.data.logList;
				});
			},
			/**修改日志内容 */
			updateLog() {
				let that = this;
				let text = this.logText.trim();
				let url = "/backend/updatelog/modify";
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
			},
			changePage(page) {
				page = page || this.page;
				this.getUpdateLogList(page);
			},
			dialogStatus(val) {
				this.isShowDialog = val;
			},
			showDialog(row) {
				this.isShowDialog = true;
				this.dialogLogData = row;
			},
			updateOnSuccess() {
				this.getUpdateLogList();
			}
		},
		created() {
			this.getUpdateLogList();
		}
	};
</script>
