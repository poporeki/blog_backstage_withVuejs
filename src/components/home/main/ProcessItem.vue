<template>
	<el-card class="hardware-process">
		<div slot="header" class="clearfix">
			<span>服务器状态</span>
			<small>服务器状态摘要.</small>
		</div>
		<label for="cpu">CPU使用率</label>
		<el-progress :text-inside="true" :stroke-width="18" :percentage="cpuUsage"></el-progress>
		<label for="cpu">内存使用率</label>

		<el-progress
			:text-inside="true"
			:stroke-width="18"
			:percentage="memUsage"
			color="rgba(142, 113, 199, 0.7)"
		></el-progress>
		<label for="cpu">硬盘使用率</label>
		<el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></el-progress>
		<label for="cpu">数据库</label>
		<el-progress :text-inside="true" :stroke-width="18" :percentage="50" status="exception"></el-progress>
	</el-card>
</template>

<style lang="scss">
	.hardware-process {
		text-align: left;
		.el-progress {
			margin-bottom: 10px;
		}
	}
</style>

<script>
	import { mapState } from "vuex";
	export default {
		data() {
			return {};
		},
		computed: {
			cpuUsage() {
				return this.$store.state.socket.hardware.cpuUsage;
			},
			memUsage() {
				return this.$store.state.socket.hardware.memUsage;
			}
		}
	};
</script>


