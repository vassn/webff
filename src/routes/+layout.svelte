<script lang="ts">
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import SiteFooter from '$lib/components/site-footer.svelte';
	import SiteHeader from '$lib/components/site-header.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ffcore } from '$lib/utils/ffcore.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import '../app.css';

	let { children } = $props();

	onMount(async () => {
		if (ffcore.state === 'undefined') ffcore.load();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
	<link rel="preload" href="/fonts/inter-italic.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
</svelte:head>

<ModeWatcher />

<Toaster position="top-center" richColors={true} />

<SiteHeader />

<main class="container mx-auto grid flex-1 grid-cols-1 grid-rows-1 overflow-x-hidden px-4 pt-6 pb-12 md:pt-12">
	{#key page.url.pathname}
		<div class="col-start-1 row-start-1" in:fly={{ y: 6, duration: 150, delay: 100 }} out:fade={{ duration: 100 }}>
			{@render children()}
		</div>
	{/key}
</main>

<SiteFooter />
