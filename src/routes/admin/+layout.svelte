<script lang="ts">
	import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { AlignJustify, Users, Building, Warehouse } from 'lucide-svelte';
	let expand: boolean = true;
</script>

<div class="wrapper">
	<AppRail width="w-52" aspectRatio="aspect-[3/1]" border="border-red-600">
		<AppRailTile bind:group={expand} name="tile-1" active="" value={0}>
			<span class="flex justify-center text-base gap-3">
				<AlignJustify /> Manage menu
			</span>
		</AppRailTile>

		<!-- --- -->
		<AppRailAnchor href="/admin" selected={$page.url.pathname === '/admin'}>
			<span class="pl-5 text-base flex gap-3">
				<Users /> Staffs
			</span>
		</AppRailAnchor>
		<AppRailAnchor href="/admin/transaction-offices" selected={$page.url.pathname === '/admin/transaction-offices'}>
			<span class="pl-5 text-base flex gap-3">
				<Building />Transaction offices
			</span>
		</AppRailAnchor>
		<AppRailAnchor href="/admin/gathering-points" selected={$page.url.pathname === '/admin/gathering-points'}>
			<span class="pl-5 text-base flex gap-3">
				<Warehouse />Gathering points
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
