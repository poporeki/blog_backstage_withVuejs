<template>
	<el-card>
		<div id="myChart" ref="Echart" style="min-height:300px;"></div>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				chart: "",
				xTextArr: "",
				cpuData: "",
				memoryData: "",
				option: {
					title: {
						text: "服务器实时资源占用情况"
					},
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "cross",
							label: {
								backgroundColor: "#6a7985"
							}
						}
					},
					legend: {
						data: ["cpu", "内存"]
					},
					toolbox: {
						feature: {
							saveAsImage: {}
						}
					},
					grid: {
						left: "3%",
						right: "4%",
						bottom: "3%",
						containLabel: true
					},
					xAxis: [
						{
							type: "category",
							boundaryGap: false,
							data: [0]
						}
					],
					yAxis: [
						{
							type: "value"
						}
					],
					series: [
						{
							name: "CPU占用",
							type: "line",
							stack: "总量",
							areaStyle: {},
							data: [0]
						},
						{
							name: "内存使用量",
							type: "line",
							stack: "总量",
							areaStyle: {},
							data: [0]
						}
					]
				}
			};
		},
		methods: {
			drawLine() {
				// 基于准备好的dom，初始化echarts实例
				let that = this;
				that.chart = that.$echarts.init(that.$refs.Echart);
				// 绘制图表
				that.chart.setOption(that.option);
				window.addEventListener("resize", function() {
					that.chart.resize();
				});
			},
			deleteRedundant() {
				this.xTextArr.length > 10 ? this.xTextArr.shift() : "";
				this.cpuData.length > 10 ? this.cpuData.shift() : "";
				this.memoryData.length > 10 ? this.memoryData.shift() : "";
			}
		},
		sockets: {
			connect() {
				this.id = this.$socket.id;
				console.log("is connected");
			},
			hardware(data) {
				this.deleteRedundant();
				this.xTextArr.push(this.xTextArr[this.xTextArr.length - 1] + 3);
				this.$store.commit("updateHardware", data);
				this.cpuData.push(this.cpuUsage);
				this.memoryData.push(this.memUsage);
				this.chart.setOption(this.option);
			}
		},
		mounted() {
			this.drawLine();

			this.$socket.emit("hardware");
		},
		computed: {
			cpuUsage() {
				return this.$store.state.socket.hardware.cpuUsage;
			},
			memUsage() {
				return this.$store.state.socket.hardware.memUsage;
			}
		},
		created() {
			this.xTextArr = this.option.xAxis[0].data;
			this.cpuData = this.option.series[0].data;
			this.memoryData = this.option.series[1].data;
		}
	};
</script>
