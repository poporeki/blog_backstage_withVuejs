<template>
	<el-card>
		<el-container>
			<el-row>
				<el-col>
					<el-table
						v-loading="loading"
						:data="tableData"
						style="width: 100%"
						min-height="400"
						max-height="600"
					>
						<el-table-column type="index" width="50"></el-table-column>
						<el-table-column prop="title" label="文章名"></el-table-column>
						<el-table-column prop="author.name" label="发布人" width="120"></el-table-column>
						<el-table-column label="标签" width="200">
							<template slot-scope="scope">
								<span v-for="item in scope.row.tags" :key="item._id">
									<el-button size="mini" :tagId="item._id">{{item.tag_name}}</el-button>
								</span>
							</template>
						</el-table-column>
						<el-table-column prop="type.name" label="分类" width="120"></el-table-column>
						<el-table-column prop="time_create" label="发布时间" width="120"></el-table-column>
						<el-table-column prop="time_update" label="最后一次修改时间" width="120"></el-table-column>
						<el-table-column fixed="right" label="操作" width="120">
							<template slot-scope="scope">
								<el-button @click.native.prevent="recoverThisArticle(scope.row)" type="text" size="small">恢复</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-col>
				<el-col>
					<el-pagination
						background
						layout="total,prev, pager, next"
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

<script>
	export default {
		data() {
			return {
				total: 0,
				page: 1,
				loading: false,
				tableData: []
			};
		},
		methods: {
			updateArtList(option) {
				if (option === undefined) {
					option = {
						page: this.page
					};
				}
				let that = this;
				that.loading = !that.loading;
				let str = that.$qs.parse(that.$qs.stringify(option));
				that.$axios
					.post("/backend/art/articlelist", str)
					.then(({ data }) => {
						that.loading = !that.loading;
						that.total = data.data.artCount;
						that.tableData = data.data.artInfo.arclist;
					})
					.catch(err => {
						console.log(err);
					});
			},
			handleCurrentChange(val) {
				if (this.page === val) return;
				this.updateArtList({ page: val });
			},
			recoverThisArticle(row) {
				let artid = row.id;
				let url = "/backend/art/restoreArticle/" + artid;
				let that = this;
				this.$axios.get(url).then(({ data }) => {
					if (data.status !== 1) {
						this.$message({
							type: "error",
							message: data.msg
						});
						return;
					}
					this.$message({
						type: "success",
						message: data.msg
					});
					this.$router.push({
						path: "/art/list"
					});
				});
			}
		},
		mounted() {
			this.updateArtList({ page: this.page });
		}
	};
</script>
