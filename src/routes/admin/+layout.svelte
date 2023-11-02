<script lang="ts">
	import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { AlignJustify, Users, Building, Warehouse } from 'lucide-svelte';
	let expand: boolean = true;
</script>

<div class="wrapper">
	<AppRail width="w-56" aspectRatio="aspect-[4/1]">
		<AppRailTile bind:group={expand} name="tile-1" active="" value={0}>
			<span class="flex justify-center text-base gap-3">
				<AlignJustify /> Menu quản lý
			</span>
		</AppRailTile>

		<!-- --- -->
		<AppRailAnchor href="/admin" selected={$page.url.pathname === '/admin'}>
			<span class="pl-5 text-base flex gap-3">
				<Users /> Nhân viên
			</span>
		</AppRailAnchor>
		<AppRailAnchor href="/admin/transaction-offices" selected={$page.url.pathname === '/admin/transaction-offices'}>
			<span class="pl-5 text-base flex gap-3">
				<Building />Điểm giao dịch
			</span>
		</AppRailAnchor>
		<AppRailAnchor href="/admin/gathering-points" selected={$page.url.pathname === '/admin/gathering-points'}>
			<span class="pl-5 text-base flex gap-3">
				<Warehouse />Điêm tập kết
			</span>
		</AppRailAnchor>
	</AppRail>

	<slot />
</div>

<style>
	.wrapper {
		width: 100%;
		height: calc(100vh - 4rem);
		display: flex;
		flex: 1;
	}
</style>
