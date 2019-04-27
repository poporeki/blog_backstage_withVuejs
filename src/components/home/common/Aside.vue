<template>
	<el-aside :class="{collapse:!isCollapse}">
		<div :class="{'logo-box':true,collapse:!isCollapse} ">
			<img class="logo-img" src="https://www.yansk.cn/images/logo.png" alt>
			<p v-show="isCollapse">后台管理</p>
		</div>
		<el-menu
			default-active="this.$route.path"
			unique-opened:true
			class="el-menu-vertical-demo"
			:collapse="!isCollapse"
			background-color="#1D2939"
			text-color="#bfbfbf"
			router
		>
			<el-menu-item index="/index">
				<i class="iconfont icon-home"></i>
				<span slot="title">首页</span>
			</el-menu-item>
			<el-submenu index="2">
				<template slot="title">
					<i class="iconfont icon-guanliyuan_jiaoseguanli"></i>
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
					<i class="iconfont icon-wenzhangguanliicon-"></i>
					<span slot="title">文章管理</span>
				</template>
				<el-menu-item index="/art/add">
					<p>添加文章</p>
				</el-menu-item>
				<el-menu-item index="/art/list">
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
					<i class="iconfont icon-gongneng_fabuxuqiu"></i>
					<span>更新日志</span>
				</template>
				<el-menu-item index="/log/list">
					<p>查看日志</p>
				</el-menu-item>
				<el-menu-item index="/log/add">
					<p>添加日志</p>
				</el-menu-item>
			</el-submenu>
			<el-menu-item index="/art/recycle/list">
				<i class="iconfont icon-shanchu"></i>
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
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: flex-start;
		height: 60px;
		line-height: 60px;
		border-bottom: 1px solid rgb(63, 78, 92);
		box-sizing: border-box;
		.logo-img {
			width: 50px;
		}
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
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 300px;
		min-height: 400px;
	}
	.el-menu {
		border: 0 !important;
		text-align: center;
		.el-submenu {
			&.is-opened {
				border-top: 1px solid rgb(94, 94, 94);
				box-sizing: border-box;
				.el-submenu__title {
					background-color: rgb(22, 31, 43) !important;
				}
			}

			.el-menu-item {
				&.is-active {
					color: rgb(180, 180, 180);
					background-color: rgb(10, 15, 20) !important;
					border-left: 2px solid rgb(15, 112, 91);
					p {
						color: inherit;
					}
				}
				p {
					color: rgb(177, 177, 177);
				}
				text-align: center;
				background-color: rgb(22, 31, 43) !important;
				&:hover {
					background-color: rgb(17, 25, 34) !important;
				}
			}
		}
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
		computed: {
			//导航栏状态
			isCollapse() {
				return this.$store.state.isCollapseSidebar;
			}
		}
	};
</script>

