<template>
	<el-aside :class="{collapse:!isCollapse}">
		<div :class="{'logo-box':true,collapse:!isCollapse} ">后台管理</div>
		<el-menu
			default-active="this.$route.path"
			class="el-menu-vertical-demo"
			@open="handleOpen"
			@close="handleClose"
			:collapse="!isCollapse"
			background-color="#1D2939"
			text-color="#bfbfbf"
			active-text-color="#c1a8a9"
			router
		>
			<el-menu-item index="/index">
				<i class="iconfont icon-home"></i>
				<span slot="title">首页</span>
			</el-menu-item>
			<el-submenu index="2">
				<template slot="title">
					<i class="iconfont icon-user"></i>
					<span slot="title">账号管理</span>
				</template>
				<el-menu-item index="/users/reg">
					<p>注册账号</p>
				</el-menu-item>
				<el-menu-item index="/users/u">
					<p>账户列表</p>
				</el-menu-item>
				<el-menu-item index="/users/vistor">
					<p>当日访问记录</p>
				</el-menu-item>
			</el-submenu>
			<el-submenu index="3">
				<template slot="title">
					<i class="iconfont icon-article"></i>
					<span slot="title">文章管理</span>
				</template>
				<el-menu-item index="/art/add">
					<p>添加文章</p>
				</el-menu-item>
				<el-menu-item index="/art/showlist">
					<p>文章列表</p>
				</el-menu-item>
				<el-menu-item index="/art/type/list">
					<p>查看文章分类</p>
				</el-menu-item>
				<el-menu-item index="/art/type/add">
					<p>添加文章分类</p>
				</el-menu-item>
				<el-menu-item index="/art/tag/list">
					<p>查看文章标签</p>
				</el-menu-item>
				<el-menu-item index="/art/tag/add">
					<p>添加文章标签</p>
				</el-menu-item>
			</el-submenu>
			<el-submenu index="4">
				<template slot="title">
					<i class="iconfont icon-record_update"></i>
					<span>更新日志</span>
				</template>
				<el-menu-item index="/log/list">
					<p>查看日志</p>
				</el-menu-item>
				<el-menu-item index="/log/add">
					<p>添加日志</p>
				</el-menu-item>
			</el-submenu>
			<el-menu-item index="5">
				<i class="iconfont icon-0901shanchu"></i>
				<span slot="title">回收站</span>
			</el-menu-item>
		</el-menu>
	</el-aside>
</template>
<style lang="scss">
	.el-aside {
		background-color: rgb(29, 41, 57);
		color: rgb(255, 255, 255);
		text-align: center;
		line-height: 200px;
	}
	.logo-box {
		height: 60px;
		line-height: 60px;
		&.collapse {
			width: 64px;
		}
	}
	.iconfont {
		vertical-align: middle;
		margin-right: 5px;
		width: 24px;
		text-align: center;
		font-size: 18px;
	}
	.el-aside {
		transition: width 0.3s ease;
		&.collapse {
			width: 64px !important;
		}
	}
	.el-menu {
		border: 0 !important;
		transition: width 0.3s ease;
		.el-menu-item {
			& > p {
				&::before {
					content: "";
					width: 10px;
					height: 2px;
					margin: 0 5px;
					display: inline-block;
					background-color: rgb(209, 209, 209);
					vertical-align: middle;
					transition: width 0.3s ease;
				}
			}
			&:hover {
				& > p {
					&::before {
						width: 20px;
					}
				}
			}
		}
	}
</style>

<script>
	export default {
		data() {
			return {
				isShow: true,
				asideList: [
					{ title: "首页", icon: "", path: "/" },
					{
						title: "账号管理",
						icon: "",
						child: [
							{ title: "新增账号", path: "/reg" },
							{ title: "账号列表", path: "/list" }
						]
					}
				]
			};
		},
		props: ["isCollapse"],
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		},
		created() {
			console.log(this.isCollapse);
		}
	};
</script>

