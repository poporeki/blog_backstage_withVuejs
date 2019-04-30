<template>
	<div class="upload-box-wrapper" v-show="isShow">
		<el-upload
			class="upload-demo"
			drag
			:action="uploadUrl"
			:with-credentials="true"
			:before-upload="beforeUpload"
			:on-success="uploadSuccess"
			multiple
		>
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">
				将文件拖到此处，或
				<em>点击上传</em>
			</div>
			<div class="el-upload__tip" slot="tip">
				只能上传
				<template v-for="type in uploadType">{{type+' '}}</template>
				文件，且不超过1MB
			</div>
		</el-upload>
	</div>
</template>

<script>
	export default {
		props: {
			uploadUrl: {
				type: String,
				default: "https://v.yansk.cn/backend/art/uploadartimg"
			},
			uploadBoxIsShow: {
				type: Boolean,
				default: false
			},
			uploadType: {
				type: Array,
				default() {
					return ["image/jpeg", "image/gif", "image/png"];
				}
			}
		},
		data() {
			return {};
		},
		methods: {
			beforeUpload(file) {
				const isImage = this.uploadType.indexOf(file.type) !== -1;
				const isLt1M = file.size / 1024 / 1024 < 1;
				!isImage && this.$message.error("上传文件只能是图片格式!");
				!isLt1M && this.$message.error("上传文件大小不能超过 1MB!");
				return isImage && isLt1M;
				console.log(file);
			},
			uploadSuccess(response, file, fileList) {
				console.log(response);
				if (response.status !== 1) {
					this.$message({
						type: "error",
						message: "上传失败"
					});
					return;
				}
				let images = response.data;
				let result = images.map(val => {
					return { src: val };
				});
				this.$emit("resultUpload", result);
				this.$emit("uploadBoxIsShow", false);
			}
		},
		computed: {
			isShow: {
				get() {
					return this.uploadBoxIsShow;
				},
				set(Bool) {
					return Bool;
				}
			}
		}
	};
</script>

<style lang="scss">
	.upload-box-wrapper {
		position: fixed;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.829);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}
</style>
