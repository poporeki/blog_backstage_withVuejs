<template>
	<div>
		<div class="page-header">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>{{pageTitle}}</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="header-title">
				<h4>{{pageTitle}}</h4>
			</div>
		</div>
		<div class="page-body">
			<router-view></router-view>
		</div>
		<footer class="page-footer">
			<div class="footer-left">
				<div class="mg-b-2">Copyright © 2018</div>
				<div>by Yansk.</div>
			</div>
			<div class="footer-right">
				<a target="_blank" class="pd-x-5" href="https://www.github.com/poporeki">
					<i class="iconfont icon-github"></i>
				</a>
				<a target="_blank" class="pd-x-5" href="javascript:void(0);">
					<i class="iconfont icon-wechat"></i>
				</a>
			</div>
		</footer>
	</div>
</template>
<style lang="scss">
	.el-breadcrumb {
		background-color: #dee2e6;
		padding: 20px;
	}
	.el-pagination {
		margin-top: 50px;
	}
	.el-table {
		tr {
			.el-button {
				margin: 2px;
			}
		}
	}
	.el-card {
		overflow: auto !important;
	}
	.el-button {
	}
	.page-header {
		.header-title {
			margin-top: 20px;
			padding: 20px;

			color: #343a40;
			h4 {
				font-size: 1.5rem;
			}
		}
	}
	.page-body {
		padding: 20px;
	}
	.page-footer {
		display: flex;
		justify-content: space-between;
		color: #868ba1;
		font-size: 0.25rem;
		line-height: 1.5;
		padding: 20px;
		a {
			color: #868ba1;
			text-decoration: none;
			&:hover {
				color: #4c4e58;
			}
		}
	}
</style>

<script>
	export default {
		computed: {
			pageTitle() {
				return this.$route.meta.title;
			},
			pagePath() {
				return this.$route.path;
			}
		}
	};
</script>
