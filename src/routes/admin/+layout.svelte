<script lang="ts">
	import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { AlignJustify, Users, Warehouse, LineChart } from 'lucide-svelte';
	let expand: boolean = true;
</script>

<div class="wrapper">
	<div style="box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 10px;">
		<AppRail width={expand ? 'w-56' : 'w-20'} aspectRatio="aspect-[4/1]">
			<AppRailTile on:click={() => (expand = !expand)} bind:group={expand} name="tile-1" hover="" value={0}>
				<span class="flex pl-7 text-base gap-3" class:py-4={!expand} class:py-8={expand}>
					<AlignJustify /> <span class:hidden={!expand}>Menu quản lý</span>
				</span>
			</AppRailTile>

			<AppRailAnchor href="/admin" selected={$page.url.pathname === '/admin'}>
				<span class="pl-7 text-base flex gap-3" class:py-4={!expand}>
					<LineChart /> <span class:hidden={!expand}>Thống kê</span>
				</span>
			</AppRailAnchor>
			<AppRailAnchor href="/admin/staffs" selected={$page.url.pathname === '/admin/staffs'}>
				<span class="pl-7 text-base flex gap-3" class:py-4={!expand}>
					<Users /> <span class:hidden={!expand}>Nhân viên</span>
				</span>
			</AppRailAnchor>
			<AppRailAnchor href="/admin/offices" selected={$page.url.pathname === '/admin/offices'}>
				<span class="pl-7 text-base flex gap-3" class:py-4={!expand}>
					<Warehouse /> <span class:hidden={!expand}>Điểm chuyển phát</span>
				</span>
			</AppRailAnchor>
		</AppRail>
	</div>

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
