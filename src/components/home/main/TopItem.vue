<template>
	<el-row :gutter="10" class="section-top">
		<el-col :xs="24" :sm="12" :md="6">
			<div class="section-top-item bg-teal">
				<el-row type="flex" justify="space-around" align="middle">
					<el-col :span="6">
						<i class="iconfont icon-geren"></i>
					</el-col>
					<el-col :span="18">
						<!-- <h4 class="tit white-8">上次登录时间:</h4> -->
						<div class="content">
							<span>欢迎登录,{{userInfo.username}}</span>
						</div>
						<div class="tips">上次登录时间:{{lastLoginData.login_time}}</div>
					</el-col>
				</el-row>
			</div>
		</el-col>
		<el-col :xs="24" :sm="12" :md="6">
			<div class="section-top-item warning" @click="$router.push({path:'/users/vistor'})">
				<el-row type="flex" justify="space-around" align="middle">
					<el-col :span="6">
						<i class="iconfont icon-zuijinlaifang"></i>
					</el-col>
					<el-col :span="18">
						<h4 class="tit white-8">今日访问人数</h4>
						<div class="content">
							<span>{{vistorTotal}}</span>
						</div>
					</el-col>
				</el-row>
			</div>
		</el-col>
		<el-col :xs="24" :sm="12" :md="6">
			<div class="section-top-item info" @click="$router.push({path:'/art/list'})">
				<el-row type="flex" justify="space-around" align="middle">
					<el-col :span="6">
						<i class="iconfont icon-wenzhangguanliicon- white-8"></i>
					</el-col>
					<el-col :span="18">
						<h4 class="tit white-8">文章总数</h4>
						<div class="content">
							<span>{{artTotal}}</span>
						</div>
					</el-col>
				</el-row>
			</div>
		</el-col>
		<el-col :xs="24" :sm="12" :md="6">
			<div class="section-top-item danger pointer" @click="openBlog()">
				<el-row type="flex" justify="space-around" align="middle">
					<el-col :span="6">
						<i class="iconfont icon-blog"></i>
					</el-col>
					<el-col :span="18">
						<div class="content">
							<span>我的博客</span>
						</div>
						<div class="tips white-8">立即前往</div>
					</el-col>
				</el-row>
			</div>
		</el-col>
	</el-row>
</template>


<script>
	// 在单独构建的版本中辅助函数为 Vuex.mapState
	import { mapState } from "vuex";
	export default {
		props: ["initData"],
		data() {
			return {};
		},
		methods: {
			openBlog() {
				window.open("https://www.yansk.cn");
			}
		},
		computed: {
			...mapState(["cpuUsage", "memUsage", "userInfo"]),
			lastLoginData() {
				return this.initData.lastLoginData;
			},
			vistorTotal() {
				return this.initData.vistorTotal;
			},
			artTotal() {
				return this.initData.artTotal;
			}
		}
	};
</script>

<style lang="scss">
	.pointer {
		cursor: pointer;
	}
	.section-top {
		font-size: inherit;
		margin-bottom: 20px;
		.section-top-item {
			display: flex;
			justify-content: space-around;
			align-content: center;
			min-height: 100px;
			margin-bottom: 10px;
			border-radius: 2px;
			padding: 20px;
			font-size: 0.25rem;
			transition: box-shadow 0.3s ease, color 0.3s ease;
			cursor: pointer;
			&:hover {
				color: #e9e9e9;
				box-shadow: 0 2px 5px rgba(0, 0, 0, 0.425);
			}
			.el-row {
				flex-grow: 1;
			}
			.tit {
				font-size: 0.9em;
			}
			.content {
				margin: 10px 0;
				color: #fff;
				font-size: 5em;
				font-weight: bold;
			}
			.iconfont {
				font-size: 40px;
			}
		}
	}
	.success {
		background-color: #67c23a;
		color: #303030;
	}
	.bg-teal {
		background-color: #00b297;
	}
	.white-8 {
		color: rgba(255, 255, 255, 0.8);
	}
	.warning {
		background-color: #e6a23c;
	}
	.danger {
		background-color: #f56c6c;
	}
	.info {
		background-color: #909399;
	}
	.brand {
		background-color: #409eff;
	}
</style>
