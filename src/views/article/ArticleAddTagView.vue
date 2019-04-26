<template>
	<el-card class="box-card-tag-add">
		<div slot="header" class="clearfix">
			<span>··</span>
			<el-button style="float: right; padding: 3px 0" type="text">-</el-button>
		</div>
		<el-form label-position="right" label-width="100px">
			<el-form-item label="文章标签名">
				<el-input placeholder="请输入内容" v-model="tagName" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				tagName: ""
			};
		}
	};
</script>

<style lang="scss">
	.box-card-tag-add {
		max-width: 480px;
	}
</style>

