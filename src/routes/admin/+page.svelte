<script lang="ts">
	import Chart from 'chart.js/auto';
	import type { PageServerData } from './$types';
	import { onMount } from 'svelte';
	import Loading from 'src/components/Loading.svelte';
	import { afterNavigate, goto, invalidateAll } from '$app/navigation';
	import { removeNullQueries } from 'src/utils/helper';
	import { OfficeType } from 'src/utils/enum';

	export let data: PageServerData;
	let canvas: any, ctx: any;
	let chart: any;
	let loading = false;
	let typePoint: string, pointId: string;
	let points: any = {
		data: {
			content: ''
		}
	};

	let labelPoints: any[] = [];

	function view() {
		const query = removeNullQueries(new URLSearchParams({ typePoint, pointId }));
		console.log('🚀 ~ file: +page.svelte:18 ~ view ~ query:', query.toString());
		// invalidateAll();
		goto(`?${query}`);
	}

	async function loadChart() {
		if (chart) {
			chart.destroy();
		}
		loading = true;
		const stats = await data.streamed?.stats;
		points = await data.streamed?.points;
		const labels = stats.data.map((s: any) => s.date);
		const incomming = stats.data.map((s: any) => s.numberOrderIncoming);
		const leave = stats.data.map((s: any) => s.numberOrderLeave);
		loading = false;

		if (typePoint === OfficeType.GATHERING) {
			labelPoints = ['Hàng đi', 'Hàng đến'];
		} else {
			labelPoints = ['Hàng gửi', 'Hàng nhận'];
		}

		console.log(points);

		ctx = canvas.getContext('2d');
		chart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: labels,
				datasets: [
					{
						label: labelPoints[0],
						data: incomming
					},
					{
						label: labelPoints[1],
						data: leave
					}
				]
			},
			options: {
				scales: {
					y: {
						min: 0,
						ticks: {
							precision: 0
						}
					}
				}
			}
		});
	}
	afterNavigate(async () => {
		await loadChart();
	});

	// $: loadChart();
</script>

<main class="w-full">
	<div class="text-center">
		<span class="title-font uppercase font-vn"> Thống kê </span>
	</div>
	<div class="flex flex-row gap-3 justify-center">
		<div class="w-1/3">
			<label class="dui-label pb-1" for="type">
				<span class="dui-label-text">Loại điểm chuyển phát</span>
			</label>
			<select
				required
				class="dui-select dui-select-sm dui-select-bordered w-full h-10"
				bind:value={typePoint}
				on:change={() => {
					pointId = '';
					view();
				}}
			>
				<option value="TP">Điểm giao dịch</option>
				<option value="GP">Điểm tập kết</option>
			</select>
		</div>

		<div class="w-1/3">
			<label class="dui-label pb-1" for="type">
				<span class="dui-label-text">Tên điểm chuyển phát</span>
			</label>

			<select
				required
				class="dui-select dui-select-sm dui-select-bordered w-full h-10"
				bind:value={pointId}
				on:change={view}
			>
				<option value="">--Tất cả--</option>
				{#each points.data.content as point}
					<option value={point.id}>{point.name}</option>
				{/each}
			</select>
		</div>
	</div>
	<div class="w-full flex justify-center mt-5">
		<div class="h-[65vh] w-[65vw] ml-16">
			{#if loading}
				<Loading message="Đang tổng hợp dữ liệu" />
			{/if}

			<canvas bind:this={canvas} />
		</div>
	</div>
</main>
