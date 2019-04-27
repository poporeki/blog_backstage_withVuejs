<template>
	<el-container style="height:100%;" direction="horizontal">
		<item-aside></item-aside>
		<el-container direction="vertical">
			<item-header></item-header>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>


<style lang="scss">
	html,
	body {
		position: relative;
		height: 100%;
		width: 100%;
		font-size: 0.25rem;
		color: #fff;
	}

	.el-header,
	.el-footer {
		text-align: center;
		line-height: 60px;
		box-shadow: 0 2px 5px solid #818181;
	}

	.el-main {
		background-color: #e9eef3;
		padding: 0 !important;
	}

	body > .el-container {
		margin-bottom: 40px;
	}

	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}

	.el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}
</style>
<script>
	// @ is an alias to /src
	import ItemHeader from "@/components/home/common/Header";
	import ItemAside from "@/components/home/common/Aside";
	import { mapMutations } from "vuex";
	export default {
		name: "home",
		data() {
			return {};
		},
		components: {
			ItemHeader,
			ItemAside
		},
		methods: {
			...mapMutations(["isCollapse"])
		},
		created() {
			let clientWid = document.body.clientWidth;
			if (clientWid < 992) {
				this.isCollapse();
			}
		}
	};
</script>
