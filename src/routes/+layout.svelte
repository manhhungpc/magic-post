<script lang="ts">
	import '../app.css';
	import { TabGroup, AppBar, TabAnchor } from '@skeletonlabs/skeleton';
	import { Newspaper, Truck, User2, MapPin, FileText } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { invalidateAll } from '$app/navigation';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { Roles } from 'src/utils/interface';
	import { storePopup } from '@skeletonlabs/skeleton';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	export let data: PageData;
	let displayName = '';
	let manageRoute = data.userData?.role == Roles.ADMIN ? '/admin' : '/manage';

	$: if (data.userData) {
		switch (data.userData.role) {
			case Roles.ADMIN:
				displayName = 'Lãnh đạo';
				break;
			case Roles.GATHERING_LEADER:
				displayName = 'Trưởng điểm tập kết';
				break;
			case Roles.GATHERS_STAFF:
				displayName = 'Nhân viên tập kết';
				break;
			case Roles.TRANSACTION_LEADER:
				displayName = 'Trưởng điểm giao dịch';
				break;
			case Roles.TRANSACTION_STAFF:
				displayName = 'Nhân viên giao dịch';
				break;
			default:
				break;
		}
	}
	// invalidateAll();
</script>

<svelte:head>
	<title>MagicPost | Hệ thống quản lý chuyển phát</title>
</svelte:head>
<header>
	<AppBar class="w-full p-3 pl-6 h-16 justify-center !bg-tertiary-300">
		<svelte:fragment slot="lead" />
		<TabAnchor href="/">
			<span class="brand">
				<img src="/img/logo-new.png" alt="logo" class="h-16 overflow-hidden" />
			</span>
		</TabAnchor>
		<svelte:fragment slot="trail">
			<TabGroup
				justify="justify-end"
				active="variant-filled-primary"
				hover="hover:variant-soft-primary"
				flex="flex-1 lg:flex-none"
				rounded="rounded-md"
				border=""
				class="!bg-transparent w-full"
			>
				<TabAnchor href="/" class="ml-3">
					<span class="link-nav flex"> Tin tức &nbsp;<Newspaper size={20} /> </span>
				</TabAnchor>

				{#if data.accessToken}
					<TabAnchor href={manageRoute} class="ml-3">
						<span class="link-nav flex"> Quản lý &nbsp;<FileText size={20} /></span>
					</TabAnchor>
					<TabAnchor href="/profile" class="ml-3">
						<span class="link-nav flex"> {displayName} &nbsp;<User2 size={20} /></span>
					</TabAnchor>
				{:else}
					<TabAnchor href="/tracking" class="ml-3">
						<span class="link-nav flex"> Theo dõi &nbsp;<MapPin size={20} /></span>
					</TabAnchor>
					<TabAnchor href="/" class="ml-3">
						<span class="link-nav flex"> Dịch vụ &nbsp;<Truck /> </span>
					</TabAnchor>
					<TabAnchor href="/login" class="ml-3">
						<span class="link-nav flex"> Đăng nhập &nbsp;<User2 size={20} /></span>
					</TabAnchor>
				{/if}
			</TabGroup>
		</svelte:fragment>
	</AppBar>
</header>

<div>
	<slot />
</div>

<style>
	.brand {
		font-size: 24px;
	}
	.link-nav {
		font-size: 16px;
	}
</style>
