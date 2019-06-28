
<template>
	<el-card>
		<el-row>
			<el-button icon="el-icon-arrow-left" circle @click="updateTypeList"></el-button>
			<el-button type="primary" icon="el-icon-edit" circle @click="$router.push({path:'/art/add'})"></el-button>
		</el-row>

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
					<el-table-column prop="typeName" label="分类名"></el-table-column>
					<el-table-column prop="typeIconName" label="图标类名" width="120"></el-table-column>

					<el-table-column fixed="right" label="操作" width="120">
						<template slot-scope="scope">
							<el-button @click.native.prevent="showDialog(scope.row)" type="text" size="small">修改</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>

		<el-dialog title="修改分类名" :visible.sync="dialogIsShow">
			<el-form>
				<el-form-item label="分类名">
					<el-input v-model="dialogTypeData.type_name" autocomplete="on"></el-input>
				</el-form-item>
				<el-form-item label="分类图标类名">
					<el-input v-model="dialogTypeData.icon_name" autocomplete="on"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogIsShow = false">取 消</el-button>
				<el-button type="primary" @click="submitUpdateType">确 定</el-button>
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
		methods: {},
		data() {
			return {
				loading: false,
				dialogIsShow: false,
				dialogLoading: false,
				dialogTypeData: {
					type_name: "",
					type_id: "",
					icon_name: "",
					old_type_name: ""
				},
				tableData: []
			};
		},
		methods: {
			updateTypeList(option) {
				let that = this;
				that.loading = !that.loading;
				that.$axios
					.get("/api/v1/getarctypes")
					.then(({ data }) => {
						that.loading = !that.loading;
						that.tableData = data;
					})
					.catch(err => {
						console.log(err);
					});
			},
			showDialog(row) {
				this.dialogTypeData.type_name = row.typeName;
				this.dialogTypeData.type_id = row.typeID;
				this.dialogTypeData.icon_name = row.typeIconName;
				this.dialogTypeData.old_type_name = row.typeName;
				this.dialogIsShow = true;
			},
			submitUpdateType() {
				let that = this;
				let url = "/backend/art/type/update";
				let typeid = this.dialogTypeData.type_id;
				let typeName = this.dialogTypeData.type_name;
				let iconName = this.dialogTypeData.icon_name;
				let oldTypeName = this.dialogTypeData.old_type_name;
				that.dialogLoading = true;

				this.$axios
					.post(url, {
						type_id: typeid,
						new_type_name: typeName,
						icon_name: iconName
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
							message: `文章分类修改成功: ${oldTypeName}=>${typeName}`
						});
						that.dialogIsShow = false;
						that.dialogLoading = false;
						that.updateTypeList();
					});
			}
		},
		mounted() {
			this.updateTypeList({ page: this.page });
		}
	};
</script>
