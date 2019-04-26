<template>
	<el-card>
		<el-row>
			<el-button icon="el-icon-arrow-left" circle @click="updateTagsList"></el-button>
			<el-button
				type="primary"
				icon="el-icon-edit"
				circle
				@click="$router.push({path:'/art/tag/add'})"
			></el-button>
		</el-row>
		<el-container>
			<el-row>
				<el-col>
					<el-table
						v-loading="loading"
						@row-click="showDialog"
						:data="tableData"
						style="width: 100%"
						min-height="400"
						max-height="600"
					>
						<el-table-column type="index" width="50"></el-table-column>
						<el-table-column prop="tag_name" label="标签名" width="300"></el-table-column>
						<el-table-column prop="count" label="相关文章数量"></el-table-column>
					</el-table>
				</el-col>
			</el-row>
			<el-row></el-row>
		</el-container>
		<el-dialog title="修改文章标签" :visible.sync="dialogIsShow">
			<el-form v-loading="dialogLoading">
				<el-form-item label="标签名">
					<el-input v-model="targetTag.tag_name" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogIsShow = false">取 消</el-button>
				<el-button type="primary" @click="updateTag">确 定</el-button>
			</div>
		</el-dialog>
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
		data() {
			return {
				loading: false,
				dialogLoading: false,
				dialogIsShow: false,
				tableData: [],
				targetTag: {
					tag_id: "",
					tag_name: ""
				}
			};
		},
		methods: {
			/**
			 * 获取数据列表
			 */
			updateTagsList() {
				let that = this;
				that.loading = !that.loading;
				that.$axios
					.get("/api/v1/getarctags")
					.then(({ data }) => {
						that.loading = !that.loading;
						that.tableData = data.data;
						console.log(data);
					})
					.catch(err => {
						console.log(err);
					});
			},
			/**
			 * 显示对话框
			 */
			showDialog(row) {
				this.targetTag.tag_id = row._id;
				this.targetTag.tag_name = row.tag_name;
				this.targetTag.old_tag_name = row.tag_name;
				this.dialogIsShow = true;
			},
			/**
			 * 提交标签更新
			 */
			updateTag() {
				let that = this;
				let url = "/backend/art/tag/update";
				let tagId = this.targetTag.tag_id;
				let tagName = this.targetTag.tag_name;
				let oldTagName = this.targetTag.old_tag_name;
				this.dialogLoading = true;
				this.$axios
					.post(url, {
						tag_id: tagId,
						new_tag_name: tagName
					})
					.then(({ data }) => {
						if (data.status !== 1) {
							that.$message({
								type: "error",
								message: data.msg
							});
							return;
						}
						that.$message({
							type: "success",
							message: `标签修改成功 ${oldTagName}=>${tagName}`
						});
						that.dialogIsShow = false;
						that.dialogLoading = false;
						that.updateTagsList();
					});
			}
		},
		mounted() {
			this.updateTagsList();
		}
	};
</script>
