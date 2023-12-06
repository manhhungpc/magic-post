<script lang="ts">
	import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { AlignJustify, Users, Package, Boxes, ScrollText, Truck } from 'lucide-svelte';
	import { token } from 'src/utils/stores.js';
	import { Roles } from 'src/utils/interface.js';

	export let data;
	console.log('🚀 ~ file: +layout.svelte:8 ~ data:', data);
	$: if (!data.accessToken) token.set('');
	let expand: boolean = true;

	let isOpenCustomerOrder: boolean;

	$: isOpenCustomerOrder = ['/manage/customer-order', '/manage/customer-order/add'].includes($page.url.pathname);
</script>

<div class="wrapper">
	<div style="box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 10px;">
		<AppRail width={expand ? 'w-56' : 'w-20'} aspectRatio="aspect-[4/1]">
			<AppRailTile on:click={() => (expand = !expand)} bind:group={expand} name="tile-1" hover="" value={0}>
				<span class="flex pl-7 text-base gap-3" class:py-4={!expand} class:py-8={expand}>
					<AlignJustify /> <span class:hidden={!expand}>Menu quản lý</span>
				</span>
			</AppRailTile>

			{#if data.userData.role != Roles.GATHERS_STAFF || data.userData.role != Roles.TRANSACTION_STAFF}
				<AppRailAnchor href="/manage/staffs" selected={$page.url.pathname === '/manage/staffs'}>
					<span class="pl-7 text-base flex gap-3" class:py-4={!expand}>
						<Users /> <span class:hidden={!expand}>Nhân viên</span>
					</span>
				</AppRailAnchor>
			{/if}
			<AppRailAnchor href="/manage/customer-order" selected={isOpenCustomerOrder}>
				<span class="pl-7 text-base flex gap-3" class:py-4={!expand}>
					<Package /> <span class:hidden={!expand}>Đơn đặt hàng</span>
				</span>
			</AppRailAnchor>
			<AppRailAnchor href="/manage/transaction-order" selected={$page.url.pathname === '/manage/transaction-order'}>
				<span class="pl-7 text-base flex gap-3" class:py-4={!expand}>
					<ScrollText /> <span class:hidden={!expand}>Đơn giao dịch</span>
				</span>
			</AppRailAnchor>
			<AppRailAnchor href="/manage/gathering-order" selected={$page.url.pathname === '/manage/gathering-order'}>
				<span class="pl-7 text-base flex gap-3" class:py-4={!expand}>
					<Boxes /> <span class:hidden={!expand}>Đơn tập kết</span>
				</span>
			</AppRailAnchor>
			<AppRailAnchor href="/manage/delivery" selected={$page.url.pathname === '/manage/delivery'}>
				<span class="pl-7 text-base flex gap-3" class:py-4={!expand}>
					<Truck /> <span class:hidden={!expand}>Đơn giao hàng</span>
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
