<template>
	<el-card>
		<el-table :data="logData">
			<el-table-column prop="log_content" label="日志内容"></el-table-column>
			<el-table-column prop="create_time" label="添加时间"></el-table-column>
		</el-table>
		<el-pagination
			background
			layout="prev, pager, next"
			:total="logTotal"
			@current-change="changePage"
		></el-pagination>
	</el-card>
</template>


<script>
	export default {
		data() {
			return {
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
			changePage(page) {
				page = page || this.page;
				this.getUpdateLogList(page);
			}
		},
		created() {
			this.getUpdateLogList();
		}
	};
</script>
