<template>
	<el-row :gutter="10" class="section-top">
		<el-col :xs="24" :sm="12" :md="6">
			<div class="section-top-item bg-teal">
				<el-row type="flex" justify="space-around" align="middle">
					<el-col>
						<i class="iconfont icon-memory white-8"></i>
					</el-col>
					<el-col>
						<h4 class="tit white-8">今日访问人数</h4>
						<div class="content">
							<span>{{cpuUsage}}</span>
						</div>
						<div class="tips white-8">today</div>
					</el-col>
				</el-row>
			</div>
		</el-col>
		<el-col :xs="24" :sm="12" :md="6">
			<div class="section-top-item warning">
				<el-row type="flex" justify="space-around" align="middle">
					<el-col>
						<i class="iconfont icon-memory white-8"></i>
					</el-col>
					<el-col>
						<h4 class="tit white-8">今日访问人数</h4>
						<div class="content">
							<span>20</span>
						</div>
						<div class="tips white-8">today</div>
					</el-col>
				</el-row>
			</div>
		</el-col>
		<el-col :xs="24" :sm="12" :md="6">
			<div class="section-top-item danger">
				<el-row type="flex" justify="space-around" align="middle">
					<el-col>
						<i class="iconfont icon-memory white-8"></i>
					</el-col>
					<el-col>
						<h4 class="tit white-8">今日访问人数</h4>
						<div class="content">
							<span>20</span>
						</div>
						<div class="tips white-8">today</div>
					</el-col>
				</el-row>
			</div>
		</el-col>
		<el-col :xs="24" :sm="12" :md="6">
			<div class="section-top-item info">
				<el-row type="flex" justify="space-around" align="middle">
					<el-col>
						<i class="iconfont icon-memory white-8"></i>
					</el-col>
					<el-col>
						<h4 class="tit white-8">今日访问人数</h4>
						<div class="content">
							<span>20</span>
						</div>
						<div class="tips white-8">today</div>
					</el-col>
				</el-row>
			</div>
		</el-col>
	</el-row>
</template>

<style lang="scss">
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
			.el-row {
				flex-grow: 1;
			}
			.tit {
				font-size: 0.9em;
			}
			.content {
				color: #fff;
				font-size: 5em;
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

<script>
	// 在单独构建的版本中辅助函数为 Vuex.mapState
	import { mapState } from "vuex";
	export default {
		data() {
			return {};
		},
		computed: mapState(["cpuUsage", "memUsage"])
	};
</script>
