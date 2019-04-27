<template>
	<div class="body-wrapper">
		<!-- top item -->
		<item-top :initData="{vistorTotal,lastLoginData,artTotal}"></item-top>
		<!-- chart item-->
		<el-row :gutter="20">
			<el-col :span="16" :xs="24">
				<hardware-chart></hardware-chart>
				<vistor-chart></vistor-chart>
			</el-col>
			<el-col :span="8" :xs="24">
				<item-process></item-process>
				<el-carousel trigger="click" height="300px" :autoplay="false">
					<el-carousel-item class="arclist-item" v-for="(item,aidx) in top3Article" :key="aidx">
						<el-card>
							<div class="item-title">RECENT ARTICLE</div>
							<div class="item-content">{{item.title}}</div>
							<div class="item-tools">
								<span @click="$router.push({path:'/art/update/'+item._id})">修改</span>&nbsp;
								<span @click="goArticle(item._id)">预览</span>
							</div>
						</el-card>
					</el-carousel-item>
				</el-carousel>
			</el-col>
		</el-row>
	</div>
</template>
<style lang="scss">
	.body-wrapper {
		background-color: #e9ecef;
		padding: 20px;
	}
	.el-card {
		margin-bottom: 20px;
	}
	.item-content {
		font-weight: 500;
		line-height: 1.5;
		font-size: 1.5em;
	}
	.arclist-item {
		.el-card {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			color: #fff;
			background: transparent;
			.item-title {
				font-size: 0.8em;
				color: rgba(255, 255, 255, 0.377);
			}
			.item-content {
				margin: 10px 0;
			}
			.item-tools {
				margin-top: 20px;
				font-size: 0.9em;
				color: rgba(255, 255, 255, 0.603);
				span {
					cursor: pointer;
				}
			}
		}
	}
	.arclist-item:nth-child(0n + 3) {
		background-color: #1d2939;
	}
	.arclist-item:nth-child(0n + 4) {
		background-color: #6f42c1;
	}
	.arclist-item:nth-child(0n + 5) {
		background-color: #f27510;
	}
</style>

<script>
	import ItemTop from "./TopItem.vue";
	import VistorChart from "./VistorChart.vue";
	import HardwareChart from "./HardwareChart.vue";
	import ItemProcess from "./ProcessItem.vue";
	export default {
		data() {
			return {
				data: 11,
				//前三篇最新文章
				top3Article: [],
				//上次登录信息
				lastLoginData: {},
				//今日访问人数
				vistorTotal: 0,
				//文章总数
				artTotal: 0
			};
		},
		components: { ItemTop, HardwareChart, VistorChart, ItemProcess },
		methods: {
			/**
			 * 获取首页数据
			 */
			getHomePageData() {
				let url = "/backend";
				let that = this;
				this.$axios.get(url).then(({ data }) => {
					if (data.status !== 1) {
						this.$message({
							type: "error",
							message: data.msg
						});
						return;
					}
					that.top3Article = data.data.arclist;
					that.lastLoginData = data.data.lastLoginInfo;
					that.vistorTotal = data.data.vistorNum;
					that.artTotal = data.data.arcTotal;
				});
			},
			/**跳转博客文章页
			 * @param {String} artid 文章id
			 */
			goArticle(artid) {
				window.open("https://www.yansk.cn/blog/article/" + artid);
			}
		},
		created() {
			this.getHomePageData();
		}
	};
</script>

