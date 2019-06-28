<template>
	<div class="editor-wrapper">
		<quill-editor v-model="html" :options="editorOption" ref="quill_editor" prop="artContent"></quill-editor>
		<upload-image
			:upload-box-is-show="isShowUploadImage"
			@resultUpload="resultUpdateInfo"
			@uploadBoxIsShow="changeUploadBoxStatus"
		></upload-image>
		<div class="uploaded-images-list-box" v-show="isShowImageListBox">
			<div class="box-title">
				<h4>上传图片</h4>
			</div>
			<el-button icon="el-icon-plus" circle @click="isShowUploadImage=!isShowUploadImage"></el-button>
			<div class="images-list">
				<div
					class="uploaded-image-box"
					v-for="(img,iidx) in uploadedImages"
					:key="iidx"
					@click="insertImage(img.src)"
				>
					<img :src="img.src" alt>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import hljs from "highlight.js";
	import Quill from "quill";
	import { ImageDrop } from "quill-image-drop-module";
	import ImageResize from "quill-image-resize-module";
	import EditorToolbarOptions from "@/config/editorToolbarOptions";
	import UploadImage from "@/components/UploadImage";

	import "highlight.js/styles/agate.css";
	import "quill/dist/quill.core.css";
	import "quill/dist/quill.snow.css";
	import "quill/dist/quill.bubble.css";
	Quill.register("modules/imageDrop", ImageDrop);
	Quill.register("modules/imageResize", ImageResize);
	export default {
		components: {
			UploadImage
		},
		props: {
			url: {
				type: String
			},
			artSource: {
				type: String,
				default: ""
			},
			isSubmit: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				that: this,
				html: "",
				text: "",
				isShowImageListBox: false,
				isShowUploadImage: false,
				editorOption: {},
				updateUrl: "www.baidu.com",
				//已上传的图片
				uploadedImages: []
			};
		},
		methods: {
			resultUpdateInfo(result) {
				let uploadedImages = this.uploadedImages;
				for (let i = 0; i < uploadedImages.length; i++) {
					let image = uploadedImages[i];
					for (let j = 0; i < result.length; j++) {
						if (image.src === result[j].src) return;
					}
				}
				this.uploadedImages = this.uploadedImages.concat(result);
			},
			changeUploadBoxStatus(bool) {
				this.isShowUploadImage = bool;
			},
			/**获取输入的文本及富文本内容 */
			getEditorContent() {
				let $editor = this.$refs.quill_editor.quill;
				let obj = {
					html: this.html,
					text: $editor.getText(0, 150)
				};
				this.$emit("editorContent", obj);
			},
			/**插入图片 */
			insertImage(url) {
				if (url != null) {
					// API: https://segmentfault.com/q/1010000008951906
					//获取光标所在编辑器的位置
					this.addRange = this.$refs.quill_editor.quill.getSelection();
					this.$refs.quill_editor.quill.insertEmbed(
						this.addRange !== null ? this.addRange.index : 0,
						"image",
						url,
						Quill.sources.USER
					); // 调用编辑器的 insertEmbed 方法，插入URL
					this.isShowImageListBox = false;
				} else {
					this.$message.error(`${this.uploadType}插入失败`);
				}
			}
		},
		watch: {
			isSubmit(val) {
				if (val === true) {
					this.getEditorContent();
				}
			},
			artSource(val, oldVal) {
				if (val !== oldVal) {
					this.html = val;
				}
			}
		},
		created() {
			let that = this;
			//编辑器配置信息
			this.editorOption = {
				that: this,
				modules: {
					syntax: {
						highlight: text => hljs.highlightAuto(text).value
					},
					toolbar: {
						container: EditorToolbarOptions,
						handlers: {
							image: function() {
								that.isShowImageListBox = !that.isShowImageListBox;
							}
						}
					},
					history: {
						delay: 1000,
						maxStack: 50,
						userOnly: false
					},
					imageDrop: true,
					imageResize: {
						displayStyles: {
							backgroundColor: "black",
							border: "none",
							color: "white"
						},
						modules: ["Resize", "DisplaySize", "Toolbar"]
					}
				}
			};
		}
	};
</script>


<style lang="scss">
	.ql-container {
		min-height: 400px;
	}
	.uploaded-images-list-box {
		.box-title {
			padding: 10px 5px;
			border-bottom: 1px solid rgb(182, 182, 182);
		}
		position: absolute;
		top: 0;
		right: 0;
		margin-top: 40px;
		min-width: 200px;
		min-height: 200px;
		max-width: 400px;
		z-index: 100;
		background-color: #fff;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.192);
		border: 1px solid rgb(182, 182, 182);
		.images-list {
			display: flex;
			padding: 5px;
			justify-content: center;
			flex-wrap: wrap;
		}
		.uploaded-image-box {
			display: flex;
			position: relative;
			margin: 5px;
			flex-grow: 1;
			width: 100px;
			justify-content: center;
			align-items: center;
			border: 1px solid rgb(230, 230, 230);
			border-radius: 4px;
			cursor: pointer;
			transition: border 0.3s ease;
			overflow: hidden;
			&:hover {
				border: 1px solid rgb(167, 167, 167);
				> img {
					transform: scale(1.05);
				}
			}
			> img {
				transition: transform 0.3s ease;
				width: 100%;
			}
		}
	}
</style>
