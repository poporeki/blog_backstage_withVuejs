<template>
	<el-card>
		<div slot="header">
			<el-row type="flex" justify="space-around" align="middle">
				<el-col>
					<p>访问数</p>
				</el-col>
				<el-col>
					<el-button-group>
						<el-button icon="el-icon-arrow-left" @click="getFewDaysVistor('week')">七天内</el-button>
						<el-button @click="getFewDaysVistor('month')">
							30天内
							<i class="el-icon-arrow-right el-icon--right"></i>
						</el-button>
					</el-button-group>
				</el-col>
			</el-row>
		</div>
		<div class="echart-box" style="min-height:300px;" ref="vistorChart"></div>
	</el-card>
</template>
<script>
	export default {
		data() {
			return {
				chart: "",
				weekData: {
					name: "一周访问数",
					xAxis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
					data: []
				},
				monthData: {
					name: "30日访问数",
					xAxis: [],
					data: []
				},
				seriesData: [],
				xAxisData: [],
				option: {
					xAxis: {
						type: "category",
						data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
					},
					yAxis: {
						type: "value"
					},
					series: [
						{
							data: [],
							type: "line"
						}
					]
				}
			};
		},
		methods: {
			getFewDaysVistor(str) {
				let that = this;
				let text = str;
				if (str === "" || str === undefined || str === null) {
					text = "week";
				}
				this.option.xAxis.data = this[text + "Data"].xAxis;
				if (this[text + "Data"].data.length !== 0) {
					that.option.series[0].data = this[text + "Data"].data;
					this.chart.setOption(this.option);
					return;
				}
				that.$axios
					.get("/backend/getVistorTotal", {
						params: {
							kind: text
						}
					})
					.then(({ data }) => {
						if (!data.status) return;
						that[text + "Data"].data = data.data.vistorTotalArr;
						that.option.series[0].data = data.data.vistorTotalArr;
						that.chart.setOption(that.option);
					});
			},
			initMonthxAxis() {
				for (let i = 1; i <= 30; i++) {
					this.monthData.xAxis.push(i);
				}
			},
			drawChart() {
				let that = this;
				this.chart = this.$echarts.init(this.$refs.vistorChart);
				this.chart.setOption(this.option);
				window.addEventListener("resize", function() {
					that.chart.resize();
				});
			}
		},
		created() {
			this.initMonthxAxis();
		},
		mounted() {
			this.drawChart();
			this.getFewDaysVistor();
		}
	};
</script>

