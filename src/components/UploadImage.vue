<template>
	<div class="upload-box-wrapper" v-show="isShow">
		<el-upload
			class="upload-demo"
			drag
			:action="uploadUrl"
			accept="image/jpeg, image/gif, image/png, image/bmp"
			:before-upload="beforeUpload"
			:on-success="uploadSuccess"
			multiple
			:data="requestData"
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
				default: "https://upload-z2.qiniup.com"
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
			return {
				requestData: {
					token: ""
				},
				link: "http://image.yansk.cn"
			};
		},
		created() {
			this.getUploadToken();
		},
		methods: {
			async beforeUpload(file) {
				console.log("before");
				const isImage = this.uploadType.indexOf(file.type) !== -1;
				const isLt1M = file.size / 1024 / 1024 < 1;
				!isImage && this.$message.error("上传文件只能是图片格式!");
				!isLt1M && this.$message.error("上传文件大小不能超过 1MB!");
				await this.getUploadToken();
				return isImage && isLt1M;

				console.log(file);
			},
			/**获取Token */
			getUploadToken() {
				let url = "/api/v1/qiniu/upload/gettoken";
				return new Promise((resolve, reject) => {
					try {
						this.$axios.get(url).then(({ data }) => {
							if (data.status !== 1 || !data.token) return reject(false);
							this.requestData.token = data.token;
							console.log(this.requestData);
							resolve(data.token);
						});
					} catch (err) {
						reject(err);
					}
				});
			},
			uploadSuccess(response, file, fileList) {
				console.log(response);
				if (!response.key) {
					this.$message({
						type: "error",
						message: "上传失败"
					});
					return;
				}
				let images = response.data;
				let kl = this.link;
				let result = fileList.map(val => {
					if (val.status !== "success") return;
					return {
						src: kl + "/" + val.response.key
					};
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
