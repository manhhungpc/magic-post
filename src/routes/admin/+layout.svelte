<script lang="ts">
	import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { AlignJustify, Users, Warehouse, LineChart } from 'lucide-svelte';
	let expand: boolean = true;
</script>

<div class="wrapper">
	<AppRail width="w-56" aspectRatio="aspect-[4/1]">
		<AppRailTile bind:group={expand} name="tile-1" active="" value={0}>
			<span class="flex justify-center text-base gap-3">
				<AlignJustify /> Menu quản lý
			</span>
		</AppRailTile>

		<AppRailAnchor href="/admin" selected={$page.url.pathname === '/admin'}>
			<span class="pl-5 text-base flex gap-3">
				<LineChart /> Thống kê
			</span>
		</AppRailAnchor>
		<AppRailAnchor href="/admin/staffs" selected={$page.url.pathname === '/admin/staffs'}>
			<span class="pl-5 text-base flex gap-3">
				<Users /> Nhân viên
			</span>
		</AppRailAnchor>
		<AppRailAnchor href="/admin/offices" selected={$page.url.pathname === '/admin/offices'}>
			<span class="pl-5 text-base flex gap-3">
				<Warehouse />Điểm chuyển phát
			</span>
		</AppRailAnchor>
	</AppRail>

	<div class="p-6 flex-1 overflow-auto">
		<slot />
	</div>
</div>

<style>
	.wrapper {
		width: 100%;
		height: calc(100vh - 4rem);
		display: flex;
		flex: 1;
	}
</style>
