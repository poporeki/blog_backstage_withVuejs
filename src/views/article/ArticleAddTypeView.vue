<template>
	<el-card class="box-card-type-add">
		<div slot="header" class="clearfix">
			<span>··</span>
			<el-button style="float: right; padding: 3px 0" type="text">-</el-button>
		</div>
		<el-form label-position="right" label-width="100px">
			<el-form-item label="分类名">
				<el-input placeholder="请输入内容" v-model="typeName" clearable></el-input>
			</el-form-item>
			<el-form-item label="分类图标类名">
				<el-input placeholder="请输入类名" v-model="typeIconName" clearable></el-input>
			</el-form-item>
		</el-form>
		<div class="form-footer">
			<el-button type="primary" @click="submitType">提交</el-button>
		</div>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				typeName: "",
				typeIconName: ""
			};
		},
		methods: {
			submitType() {
				let url = "/backend/art/type/add";
				let that = this;
				this.$axios
					.post(url, {
						t_name: this.typeName,
						t_iconname: this.typeIconName
					})
					.then(({ data }) => {
						if (data.status !== 1) {
							that.$message({
								type: "error",
								msg: data.msg
							});
							return;
						}
						that.$message({
							type: "success",
							msg: `添加成功 "${that.typeName}"`
						});
						that.$router.push({
							path: "/art/type/list"
						});
					});
			}
		}
	};
</script>

<style lang="scss">
	.box-card-type-add {
		max-width: 480px;
	}
	.form-footer {
		text-align: right;
	}
</style>

