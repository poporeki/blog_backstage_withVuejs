<template>
	<el-card>
		<el-row>
			<el-button icon="el-icon-arrow-left" circle @click="getUserList"></el-button>
		</el-row>

		<el-container>
			<el-row>
				<el-col>
					<el-table
						v-loading="loading"
						:data="userList"
						style="width: 100%"
						min-height="400"
						max-height="600"
						@row-click="getRecords"
					>
						<el-table-column type="index" width="50"></el-table-column>

						<el-table-column prop="user_name" label="头像" width="50">
							<template slot-scope="scope">
								<div class="avatar-box">
									<img
										v-if="scope.row.avatar_path"
										:src="'https://v.yansk.cn'+scope.row.avatar_path.save_path+'thumbnail_'+scope.row.avatar_path.new_name"
										onerror="this.src='https://v.yansk.cn/images/my-head.png'"
										alt="avatar"
									>
									<img v-else src="https://v.yansk.cn/images/my-head.png" alt="kong">
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="user_name" label="用户名" width="120"></el-table-column>
						<el-table-column prop="reg_ip" label="注册ip" width="120"></el-table-column>
						<el-table-column prop="reg_time" label="注册时间"></el-table-column>
					</el-table>
				</el-col>
				<el-col>
					<el-pagination background layout="total" :total="total"></el-pagination>
				</el-col>
			</el-row>
			<el-row></el-row>
		</el-container>
		<el-dialog
			title="历史登陆记录"
			:visible.sync="isShowRecord"
			@close="resetRecord"
			v-loading="isRecordLoading"
		>
			<el-table :data="record.data.list" max-height="500">
				<el-table-column property="username" label="用户名" width="150"></el-table-column>
				<el-table-column property="isp" label="ISP" width="100"></el-table-column>
				<el-table-column property="ip" label="IP" width="150"></el-table-column>
				<el-table-column property="address" label="地理位置"></el-table-column>
				<el-table-column property="os" label="系统"></el-table-column>
				<el-table-column property="browser" label="浏览器"></el-table-column>
				<el-table-column property="logtime" label="登录时间"></el-table-column>
			</el-table>
			<el-pagination
				@current-change="changeRecordsPage"
				hide-on-single-page="true"
				:total="record.data.count"
				layout="prev, pager, next"
			></el-pagination>
		</el-dialog>
	</el-card>
</template>


<style lang="scss">
	.avatar-box {
		> img {
			border-radius: 50%;
			border: 1px solid rgb(201, 201, 201);
			width: 100%;
		}
	}
</style>

<script>
	export default {
		data() {
			return {
				loading: false,
				page: 1,
				count: 20,
				isShowRecord: false,
				isRecordLoading: false,
				record: {
					data: {
						id: "",
						count: 0,
						list: []
					},
					page: 1,
					limit: 10
				},
				total: 0,
				userList: []
			};
		},
		methods: {
			getUserList() {
				let that = this;
				that.loading = true;
				let url = "/api/v1/user/userlist";
				this.$axios.get(url).then(({ data }) => {
					that.loading = false;
					if (!data.status) return;
					that.userList = data.data.userlist;
					that.total = that.userList.length;
				});
			},
			getRecords(page) {
				let that = this;
				let userid;
				let args = arguments;
				if (args.length === 3) {
					userid = args[0]._id;
				} else {
					userid = this.record.data.id;
				}
				this.isRecordLoading = true;
				page = page || this.record.page || 1;
				let limit = this.record.limit || 10;
				let requestUrl = "/backend/loginrecord";
				this.$axios
					.post(requestUrl, {
						userid,
						page,
						limit
					})
					.then(({ data }) => {
						this.isRecordLoading = false;

						if (data.status !== 1) {
							that.$message({
								message: "警告哦，这是一条警告消息",
								type: "warning"
							});
							return;
						}
						that.isShowRecord = true;
						that.record.data.id = userid;
						that.record.data.list = data.data.list;
						that.record.data.count = data.data.count;
						that.record.page += 1;
					});
			},
			resetRecord() {
				this.record.data.id = "";
				this.record.data.list = [];
				this.record.data.count = 0;
				this.record.page = 1;
			},
			changeRecordsPage(page, event) {
				this.getRecords(page);
				console.log(page);
			}
		},
		created() {
			this.getUserList();
		}
	};
</script>
