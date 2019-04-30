<template>
	<el-card class="article-add-box">
		<el-form ref="form" :model="form" label-width="80px" label-position="top" @submit.native.prevent>
			<el-container direction="vertical">
				<el-row>
					<div class="item-title">
						<h5>
							信息
							<small>*为必填项</small>
						</h5>
					</div>
					<div class="item-content">
						<el-form-item label="文章分类">
							<el-radio-group v-model="form.artType">
								<el-radio-button
									:label="item.typeID"
									v-for="item in artTypes"
									:key="item.typeID"
								>{{item.typeName}}</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-row class="from-group">
							<el-col :md="18">
								<el-form-item label="文章名">
									<el-input v-model="form.name" placeholder="请输入文章名"></el-input>
								</el-form-item>
							</el-col>
							<el-col :md="6">
								<el-form-item label="发布人">
									<el-input v-model="form.author" :disabled="true">12</el-input>
								</el-form-item>
							</el-col>
							<el-col :xs="24" :sm="24" :md="24">
								<el-form-item label="转载地址">
									<el-row>
										<el-col :md="6">
											<el-input v-model="form.source.name" placeholder="名称"></el-input>
										</el-col>
										<el-col :md="18">
											<el-input v-model="form.source.link" placeholder="链接"></el-input>
										</el-col>
									</el-row>
								</el-form-item>
							</el-col>
						</el-row>

						<el-form-item label="Carousel">
							<el-switch v-model="form.carousel"></el-switch>
						</el-form-item>
						<el-form-item label="标签">
							<el-checkbox
								v-model="form.artTags"
								v-for="item in artTags"
								:key="item._id"
								:label="item._id"
								border
							>{{item.tag_name}}</el-checkbox>
						</el-form-item>
					</div>
				</el-row>
				<el-row>
					<el-col>
						<editor ref="quill_editor" :isSubmit="isSubmit" @editorContent="getArtContent"></editor>
					</el-col>
				</el-row>
				<el-row>
					<el-form-item>
						<el-button type="primary" @click="isSubmit=true">提交文章</el-button>
						<el-button>取消</el-button>
					</el-form-item>
				</el-row>
			</el-container>
		</el-form>
	</el-card>
</template>

<script>
	import editor from "@/components/QuillEditor";
	export default {
		components: { editor },
		data() {
			return {
				pageTitle: "添加文章",
				pagePath: "",
				artTypes: [],
				artTags: [],
				isRequest: false,
				isSubmit: false,
				form: {
					name: "",
					author: "",
					source: {
						name: "",
						link: ""
					},
					artType: "",
					artTags: [],
					artContent: "",
					artSource: "",
					carousel: false
				}
			};
		},
		methods: {
			/**获取文章标签 */
			getArtTags() {
				let that = this;
				that.$axios.get("/api/v1/getArctags").then(({ data }) => {
					if (!data.status) return;
					that.artTags = data.data;
				});
			},
			onSubmit() {},
			/**获取文章分类 */
			getArtTypes() {
				let that = this;
				that.$axios.get("/api/v1/getArctypes").then(({ data }) => {
					if (data === undefined) return;
					that.artTypes = data;
				});
			},
			/**获取文章文本并提交到服务器 */
			getArtContent(res) {
				this.form.artContent = res.text;
				this.form.artSource = res.html;
				this.submitThisArticle();
			},
			/**提交文章 */
			submitThisArticle() {
				let url = "/backend/art/addarticle";
				let that = this;
				this.isRequest = true;
				this.$axios
					.post(url, {
						arc_title: this.form.name,
						arc_carousel: this.form.carousel,
						arc_reproduction: this.form.source,
						arc_type: this.form.artType,
						arc_tags: this.form.artTags,
						arc_content: this.form.artContent,
						arc_source: this.form.artSource
					})
					.then(({ data }) => {
						this.isRequest = false;
						if (data.status !== 1) {
							this.$message({
								type: "error",
								message: data.msg
							});
							return;
						}
						this.$message({
							type: "success",
							message: "文章添加成功"
						});
						that.$router.push({
							path: "/art/list"
						});
					});
			}
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo;
			}
		},
		created() {
			this.getArtTags();
			this.getArtTypes();
			this.pagePath = this.$route.path;
			this.form.author = this.userInfo.username;
		}
	};
</script>

<style lang="scss">
	.el-form-item__label {
		font-weight: bold;
	}
	.article-add-box {
		.item-title {
			margin: 20px 0;
			color: rgb(66, 66, 66);
			small {
				display: block;
				margin-top: 5px;
				font-size: 0.7em;
				color: rgb(88, 88, 88);
			}
		}
		.item-content {
			margin: 20px 0;
			padding: 50px 20px;
			border: 1px solid rgb(190, 190, 190);
		}
	}

	.ql-editor {
		max-height: 500px;
	}
	.el-form {
		input {
			border: none;
			border-bottom: 1px solid #bbbbbb;
			border-radius: 0;
		}
		.el-row {
			margin-bottom: 20px;
		}
		.el-form-item {
			margin-bottom: 30px;
		}
		.from-group {
			border: 1px solid #c0c0c0;
			margin-bottom: 30px;
			.el-form-item {
				padding: 20px;
			}
			& > .el-col {
				&:nth-child(1) {
					border-right: 1px solid #c0c0c0;
				}
				@media (max-width: 992px) {
					&:nth-child(1) {
						border-right: none;
					}
				}
				&:nth-child(1),
				&:nth-child(2) {
					border-bottom: 1px solid #c0c0c0;
				}
			}
		}
	}
</style>
