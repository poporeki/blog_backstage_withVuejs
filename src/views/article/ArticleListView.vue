
<template>
	<el-card>
		<el-row>
			<el-button icon="el-icon-arrow-left" circle @click="updateArtList"></el-button>
			<el-button type="primary" icon="el-icon-edit" circle @click="$router.push({path:'/art/add'})"></el-button>
			<el-button type="success" icon="el-icon-check" circle></el-button>
			<el-button type="info" icon="el-icon-message" circle></el-button>
			<el-button type="warning" icon="el-icon-star-off" circle></el-button>
			<el-button type="danger" icon="el-icon-delete" circle></el-button>
		</el-row>
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
									<el-button
										size="mini"
										:tagId="item._id"
										@click="updateArtList({'by[tags_id]':item._id})"
									>{{item.tag_name}}</el-button>
								</span>
							</template>
						</el-table-column>
						<el-table-column prop="type.name" label="分类" width="120"></el-table-column>
						<el-table-column prop="time_create" label="发布时间" width="120"></el-table-column>
						<el-table-column prop="time_update" label="最后一次修改时间" width="120"></el-table-column>
						<el-table-column fixed="right" label="操作" width="120">
							<template slot-scope="scope">
								<el-button @click.native.prevent="goPageUpdate(scope.row.id)" type="text" size="small">修改</el-button>
								<el-button @click.native.prevent="deleteArticle(scope.row.id)" type="text" size="small">移除</el-button>
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
<style lang="scss">
	.el-breadcrumb {
		background-color: #dee2e6;
		padding: 20px;
	}
	.el-pagination {
		margin-top: 50px;
	}
	.el-table {
		tr {
			.el-button {
				margin: 2px;
			}
		}
	}
	.el-card {
		overflow: auto !important;
	}
	.el-button {
	}
	.page-header {
		.header-title {
			margin-top: 20px;
			padding: 20px;

			color: #343a40;
			h4 {
				font-size: 1.5rem;
			}
		}
	}
	.page-body {
		padding: 20px;
	}
	.page-footer {
		display: flex;
		justify-content: space-between;
		color: #868ba1;
		font-size: 0.25rem;
		line-height: 1.5;
		padding: 20px;
		a {
			color: #868ba1;
			text-decoration: none;
			&:hover {
				color: #4c4e58;
			}
		}
	}
</style>

<script>
	export default {
		methods: {
			deleteRow(index, rows) {
				rows.splice(index, 1);
			}
		},
		data() {
			return {
				page: 2,
				total: 15,
				limit: 10,
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
			goPageUpdate(arcid) {
				return this.$router.push({
					path: "/art/update/" + arcid
				});
			},
			handleCurrentChange(val) {
				if (this.page === val) return;
				this.updateArtList({ page: val });
			},
			deleteArticle(artid) {
				let that = this;
				this.$confirm(
					"此操作将删除文章,可以到回收站找回被删除的文章。是否继续?",
					"提示",
					{
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					}
				)
					.then(() => {
						that.submitDeleteArticle(artid);
						retrun;
					})
					.catch(() => {
						that.$message({
							type: "info",
							message: "已取消修改"
						});
					});
			},
			submitDeleteArticle(artid) {
				let that = this;
				let url = "/backend/art/remove/toTrash";
				this.$axios
					.post(url, {
						artid: artid
					})
					.then(({ data }) => {
						if (data.status === 1) {
							this.$message({
								type: "success",
								message: data.msg
							});
							this.updateArtList({ page: this.page });
						}
					});
			}
		},
		mounted() {
			this.updateArtList({ page: this.page });
		}
	};
</script>
