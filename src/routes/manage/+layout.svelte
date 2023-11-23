<script lang="ts">
	import { AppRail, AppRailTile, AppRailAnchor, TreeView, TreeViewItem } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { AlignJustify, Users, Package, Boxes, Dot, ScrollText, Navigation } from 'lucide-svelte';
	import { token } from 'src/utils/stores.js';

	export let data;
	console.log('🚀 ~ file: +layout.svelte:7 ~ data:', data);
	$: if (!data.accessToken) token.set('');
	let expand: boolean = true;

	let isOpenCustomerOrder: boolean;
	let open = ['/manage/delivery', '/manage/transport'].includes($page.url.pathname);

	$: isOpenCustomerOrder = ['/manage/customer-order', '/manage/customer-order/add'].includes($page.url.pathname);
</script>

<div class="wrapper">
	<AppRail width="w-56" aspectRatio="aspect-[4/1]" class="shadow-lg">
		<AppRailTile bind:group={expand} name="tile-1" active="" value={0}>
			<span class="flex justify-center text-base gap-3">
				<AlignJustify /> Menu quản lý
			</span>
		</AppRailTile>

		<!-- --- -->
		<AppRailAnchor href="/manage/staffs" selected={$page.url.pathname === '/manage/staffs'}>
			<span class="pl-5 text-base flex gap-3">
				<Users /> Nhân viên
			</span>
		</AppRailAnchor>
		<AppRailAnchor href="/manage/customer-order" selected={isOpenCustomerOrder}>
			<span class="pl-5 text-base flex gap-3">
				<Package />Đơn đặt hàng
			</span>
		</AppRailAnchor>
		<AppRailAnchor href="/manage/transaction-order" selected={$page.url.pathname === '/manage/transaction-order'}>
			<span class="pl-5 text-base flex gap-3">
				<ScrollText />Đơn giao dịch
			</span>
		</AppRailAnchor>
		<AppRailAnchor href="/manage/gathering-order" selected={$page.url.pathname === '/manage/gathering-order'}>
			<span class="pl-5 text-base flex gap-3">
				<Boxes />Đơn tập kết
			</span>
		</AppRailAnchor>
		<TreeView rounded="rounded-none" indent="" regionSummary="flex-row-reverse gap-4" hover="hover:bg-primary-500/10">
			<TreeViewItem bind:open spacing="">
				<span class="text-base font-bold flex gap-4">
					<Navigation />
					Đơn vận chuyển
				</span>
				<svelte:fragment slot="children">
					<AppRailAnchor href="/manage/delivery" selected={$page.url.pathname === '/manage/delivery'}>
						<TreeViewItem hover="" class="text-base" regionSummary="">
							<svelte:fragment slot="lead"><Dot /></svelte:fragment>
							<p class="-m-3">Tới khách hàng</p>
						</TreeViewItem>
					</AppRailAnchor>
					<AppRailAnchor href="/manage/transport" selected={$page.url.pathname === '/manage/transport'}>
						<TreeViewItem hover="" class="text-base" regionSummary="">
							<svelte:fragment slot="lead"><Dot /></svelte:fragment>
							<p class="-m-3">Tới điểm tập kết</p>
						</TreeViewItem>
					</AppRailAnchor>
				</svelte:fragment>
			</TreeViewItem>
		</TreeView>
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
