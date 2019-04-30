
<template>
	<el-card v-loading.fullscreen.lock="isInit">
		<loading-request v-show="isRequest"></loading-request>
		<el-form
			ref="updateForm"
			:rules="rules"
			:model="form"
			label-width="80px"
			label-position="top"
			@submit.native.prevent
		>
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
									:label="item._id"
									v-for="item in artTypes.isntselect"
									:key="item._id"
								>{{item.type_name}}</el-radio-button>
								<el-radio-button
									:label="item._id"
									v-for="item in artTypes.selected"
									:key="item._id"
								>{{item.type_name}}</el-radio-button>
							</el-radio-group>
						</el-form-item>
						<el-row class="from-group">
							<el-col :md="18">
								<el-form-item label="文章名" prop="title">
									<el-input v-model="form.title" placeholder="请输入文章名"></el-input>
								</el-form-item>
							</el-col>
							<el-col :md="6">
								<el-form-item label="发布人">
									<el-input v-model="form.author" :disabled="true" prop="author"></el-input>
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
						<el-form-item label="标签" prop="artTags">
							<el-checkbox
								v-model="form.artTags"
								v-for="item in artTags.isntselect"
								:key="item._id"
								:label="item._id"
								border
							>{{item.tag_name}}</el-checkbox>
							<el-checkbox
								v-model="form.artTags"
								v-for="item in artTags.selected"
								:key="item._id"
								:label="item._id"
								border
								:checked="true"
							>{{item.tag_name}}</el-checkbox>
						</el-form-item>
					</div>
				</el-row>
				<el-row>
					<el-col>
						<editor
							ref="quill_editor"
							:isSubmit="isSubmit"
							:art-source="form.artSource"
							@editorContent="getArtContentAndSubmit"
						></editor>
					</el-col>
				</el-row>
				<el-row>
					<el-form-item>
						<el-button type="primary" @click="isSubmit=true">提交更新</el-button>
						<el-button>取消</el-button>
					</el-form-item>
				</el-row>
			</el-container>
		</el-form>
	</el-card>
</template>

<script>
	import editor from "@/components/QuillEditor";
	import LoadingRequest from "@/components/loading/LoadingXHR";
	import hljs from "highlight.js";
	import "highlight.js/styles/agate.css";
	export default {
		components: { LoadingRequest, editor },
		data() {
			return {
				isRequest: false,
				isInit: true,
				isSubmit: false,
				artInfo: [],
				artTypes: [],
				artTags: [],
				form: {
					id: "",
					title: "",
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
				},
				requestUrl: "/backend/art/updatearticle/",
				rules: {
					title: [
						{ required: true, message: "请输入文章名", trigger: "blur" },
						{ min: 3, max: 60, message: "长度在 3 到 60 个字符", trigger: "blur" }
					],
					author: [{ required: true, message: "不能为空", trigger: "blur" }],
					artContent: [
						{ required: true, message: "文章内容不能为空", trigger: "blur" }
					],
					artTags: [
						{
							type: "array",
							required: true,
							message: "请至少选择一个标签",
							trigger: "change"
						}
					],
					artType: [
						{ required: true, message: "请选择文章分类", trigger: "change" }
					]
				}
			};
		},
		methods: {
			/**
			 * 获取文章相关信息
			 */
			getArticleInfo(arcid) {
				let that = this;
				let url = this.requestUrl + arcid;
				that.$axios.get(url).then(({ data }) => {
					that.isInit = false;
					that.artInfo = data.data.artInfo;
					that.form.id = arcid;
					that.form.title = that.artInfo.name;
					if (typeof that.artInfo.from === "string") {
						that.form.source.link = that.artInfo.from;
					} else if (that.artInfo.from instanceof Object) {
						that.form.source.link = that.artInfo.from.link;
						that.form.source.name = that.artInfo.from.name;
					}

					that.form.author = that.userInfo.username;
					that.form.artContent = that.artInfo.content;
					that.form.artSource = that.artInfo.source;
					that.form.carousel = that.artInfo.attribute.carousel;
					that.form.artType = that.artInfo.types.selected[0]._id;
					that.artTags = that.artInfo.tags;
					that.artTypes = that.artInfo.types;
					console.log(that.form);
					console.log(url);
				});
			},
			/**
			 * 效验表单内容
			 */
			validate(formName) {
				return new Promise((resolve, rejcet) => {
					this.$refs[formName].validate(valid => {
						if (valid) {
							resolve();
						} else {
							return reject();
						}
					});
				});
			},
			submitUpdataShowTips() {
				this.$confirm("此操作将更新文章相关信息,且无法恢复, 是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				})
					.then(() => {
						this.submitArticleUpdate();
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消修改"
						});
					});
			},
			getArtContentAndSubmit(res) {
				this.form.artContent = res.text;
				this.form.artSource = res.html;
				this.submitArticleUpdate();
			},
			/**
			 * 提交文章更新
			 */
			async submitArticleUpdate() {
				let that = this;
				let url = "/backend/art/updatearticle/" + that.form.id;

				try {
					await that.validate("updateForm");
					that.isRequest = true;
					let form = that.form;
					let reqData = {
						arc_title: form.title,
						arc_carousel: form.carousel ? "on" : "off",
						arc_reproduction: form.source,
						arc_type: form.artType,
						arc_tags: form.artTags,
						arc_content: form.artContent,
						arc_conSource: form.artSource
					};
					that.$axios.post(url, reqData).then(({ data }) => {
						that.isRequest = false;
						if (data.status !== 1) {
							this.$message({
								type: "error",
								message: data.msg
							});
							return;
						}
						that.updateSuccess = true;

						this.$message({
							type: "success",
							message: "修改成功!"
						});
						that.$router.push({
							path: "/art/list"
						});
					});
					console.log(artText);
				} catch {}
			}
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo;
			}
		},
		created() {
			let arcid = this.$route.params.arcid;
			this.getArticleInfo(arcid);
		}
	};
</script>

<style lang="scss">
	.el-form-item__label {
		font-weight: bold;
	}
</style>
