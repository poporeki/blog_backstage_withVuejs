<template>
	<div class="body-wrapper">
		<!-- top item -->
		<item-top></item-top>
		<!-- chart item-->
		<el-row :gutter="20">
			<el-col :span="16" :xs="24">
				<hardware-chart></hardware-chart>
				<vistor-chart></vistor-chart>
			</el-col>
			<el-col :span="8" :xs="24">
				<item-process></item-process>
				<el-carousel trigger="click" height="150px">
					<el-carousel-item v-for="item in 4" :key="item">
						<h3>{{ item }}</h3>
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
</style>

<script>
	import ItemTop from "./TopItem.vue";
	import VistorChart from "./VistorChart.vue";
	import HardwareChart from "./HardwareChart.vue";
	import ItemProcess from "./ProcessItem.vue";
	export default {
		data() {
			return {
				data: 11
			};
		},
		components: { ItemTop, HardwareChart, VistorChart, ItemProcess }
	};
</script>

