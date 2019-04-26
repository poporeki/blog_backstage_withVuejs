<template>
	<el-card>
		<el-row>
			<el-button icon="el-icon-arrow-left" circle @click="getVistorList"></el-button>
		</el-row>
		<el-container>
			<el-row>
				<el-col>
					<el-table
						v-loading="loading"
						:data="vistorList"
						style="width: 100%"
						min-height="400"
						max-height="600"
					>
						<el-table-column type="index" width="50"></el-table-column>
						<el-table-column prop="reg_ip" label="IP" width="120"></el-table-column>
						<el-table-column prop="host" label="HOST" width="200"></el-table-column>
						<el-table-column label="设备类型" width="120">
							<template slot-scope="scope">
								<el-popover trigger="hover" placement="top">
									<p>平台类型：{{ scope.row.reg_user_agent.platform }}</p>
									<p>版本: {{ scope.row.reg_user_agent.os }}</p>
									<div slot="reference" class="name-wrapper">
										<el-tag size="medium">{{ scope.row.reg_user_agent.os }}</el-tag>
									</div>
								</el-popover>
							</template>
						</el-table-column>
						<el-table-column label="浏览器" width="100">
							<template slot-scope="scope">
								<el-popover trigger="hover" placement="top">
									<p>浏览器：{{scope.row.reg_user_agent.browser}}</p>
									<p>版本: {{ scope.row.reg_user_agent.version }}</p>
									<div slot="reference" class="name-wrapper">
										<el-tag size="medium">{{ scope.row.reg_user_agent.browser }}</el-tag>
									</div>
								</el-popover>
							</template>
						</el-table-column>
						<el-table-column prop="reg_user_agent.source" label="userAgent"></el-table-column>
						<el-table-column prop="coming_time" label="来访时间"></el-table-column>
					</el-table>
				</el-col>
				<el-col>
					<el-pagination
						background
						layout="total"
						:current-page="page"
						:total="total"
						@current-change="handleCurrentChange"
					></el-pagination>
				</el-col>
			</el-row>
			<el-row></el-row>
		</el-container>
	</el-card>
</template>


<style lang="scss">
</style>

<script>
	export default {
		data() {
			return {
				loading: false,
				page: 1,
				count: 20,
				total: 0,
				vistorList: []
			};
		},
		methods: {
			getVistorList() {
				let that = this;
				that.loading = true;
				let url = "/api/v1/user/vistorlist";
				this.$axios.get(url).then(({ data }) => {
					that.loading = false;
					if (!data.status) return;
					that.vistorList = data.data.vistorList;
					that.total = that.vistorList.length;
				});
			},
			handleCurrentChange(val) {
				if (this.page === val) return;
				this.updateArtList({ page: val });
			}
		},
		created() {
			this.getVistorList();
		}
	};
</script>
