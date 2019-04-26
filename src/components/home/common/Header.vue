<template>
	<el-header>
		<el-row type="flex" :gutter="24" justify="space-between">
			<el-col :span="1">
				<el-button
					@click="toggleCollapse"
					:icon="isCollapse ? 'el-icon-arrow-left' : 'el-icon-arrow-right'"
					circle
				></el-button>
			</el-col>
			<el-col :span="2">
				<el-button icon="el-icon-search" circle>
					<img :src="avatarUrl" alt>
				</el-button>
			</el-col>
		</el-row>
	</el-header>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: "1",
				isCollapse: true
			};
		},
		methods: {
			toggleCollapse() {
				this.isCollapse = !this.isCollapse;
				this.$emit("toggleCollapse", this.isCollapse);
			},
			toggleButton() {
				return isCollapse ? "el-icon-arrow-left" : "el-icon-arrow-right";
			}
		},
		computed: {
			// 当前用户信息
			userInfo() {
				return this.$store.state.userInfo;
			},
			//头像URL
			avatarUrl() {
				return `http://www.yansk.top${this.userInfo.avatarPath}`;
			}
		}
	};
</script>


