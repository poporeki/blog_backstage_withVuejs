<template>
	<el-header>
		<el-row type="flex" :gutter="24" justify="space-between">
			<el-col :span="1">
				<el-button
					@click="changeCollapseStatus"
					:icon="isCollapse ? 'el-icon-arrow-left' : 'el-icon-arrow-right'"
					circle
				></el-button>
			</el-col>
			<el-col :span="2">
				<el-dropdown @command="handleCommand">
					<span class="el-dropdown-link">
						<div circle class="btn-user-avatar">
							<img :src="avatarUrl" alt>
						</div>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>
							<i class="iconfont icon-geren"></i>个人中心
						</el-dropdown-item>
						<el-dropdown-item>
							<i class="iconfont icon-gongnengguanli"></i>功能二
						</el-dropdown-item>
						<el-dropdown-item>
							<i class="iconfont icon-gongnengguanli"></i>功能三
						</el-dropdown-item>
						<el-dropdown-item divided command="logOut">
							<i class="iconfont icon-exit"></i>退出账号
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-row>
	</el-header>
</template>

<script>
	import { mapActions } from "vuex";
	export default {
		data() {
			return {
				activeIndex: "1",
				URL_REG: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
			};
		},
		methods: {
			handleCommand(command) {
				this[command](this);
				// this.$message("click on item " + command);
			},
			//改变导航栏状态
			changeCollapseStatus() {
				return this.$store.commit("isCollapse");
			},
			//切换按钮图标
			toggleButton() {
				return isCollapse ? "el-icon-arrow-left" : "el-icon-arrow-right";
			},
			...mapActions({
				logOut: "USER_LOGOUT"
			})
		},
		computed: {
			// 当前用户信息
			userInfo() {
				return this.$store.state.userInfo;
			},
			//头像URL
			avatarUrl() {
				return this.URL_REG.test(this.userInfo.avatarPath)
					? this.userInfo.avatarPath
					: `https://v.yansk.cn${this.userInfo.avatarPath}`;
			},
			//导航栏状态
			isCollapse() {
				return this.$store.state.isCollapseSidebar;
			}
		}
	};
</script>


<style lang="scss">
	.btn-user-avatar {
		width: 50px;
		height: 50px;
		margin-top: 5px;
		border-radius: 50%;
		border: 1px solid rgb(201, 201, 201);
		overflow: hidden;
		&:hover {
			box-shadow: 0 0 5px rgba(0, 0, 0, 0.253);
		}
		> img {
			width: 100%;
		}
	}
</style>


