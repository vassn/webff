<script lang="ts">
	import { page } from '$app/state';
	import SiteFooter from '$lib/components/site-footer.svelte';
	import SiteHeader from '$lib/components/site-header.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ffcore } from '$lib/utils/ffcore.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import '../app.css';

	let { children } = $props();

	onMount(async () => {
		if (ffcore.state === 'undefined') ffcore.load();
	});
</script>

<svelte:head>
	<title>WebFF</title>
	<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
	<link rel="icon" href="/favicon.svg" />
</svelte:head>

<ModeWatcher defaultMode="dark" />

<Toaster position="top-center" richColors={true} />

<SiteHeader />

<main class="container mx-auto grid grid-cols-1 grid-rows-1 overflow-x-hidden px-4 pt-6 pb-12 md:pt-12">
	{#key page.url.pathname}
		<div class="col-start-1 row-start-1" in:fade={{ duration: 200 }}>
			{@render children()}
		</div>
	{/key}
</main>

<SiteFooter />

<style>
	:global(body) {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
	}
</style>
