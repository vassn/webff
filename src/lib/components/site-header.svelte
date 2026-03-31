<script lang="ts">
	import { SunMoon } from '@lucide/svelte';
	import { toggleMode } from 'mode-watcher';
	import MobileNav from './mobile-nav.svelte';
	import { Button } from './ui/button';

	let clientHeight = $state(0);
</script>

<header bind:clientHeight class="sticky top-0 z-50 w-full bg-background px-4 py-2 md:px-8">
	<!-- Desktop View -->
	<nav class="hidden lg:block">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-0.5">
				<Button variant="ghost" href="/" class="gap-0 text-lg font-bold">
					<span>Web</span> <span class="text-primary">FF</span>
				</Button>
				<Button variant="ghost" href="/image-converter">Image Converter</Button>
				<Button variant="ghost" href="/video-converter">Video Converter</Button>
				<Button variant="ghost" href="/audio-converter">Audio Converter</Button>
				<Button variant="ghost" href="/web-optimizer">Web Optimizer</Button>
				<!-- <Button variant="ghost" href="/video-compressor">Video Compressor</Button> -->
			</div>

			<div class="flex items-center">
				<Button variant="ghost" size="icon-lg" onclick={toggleMode}>
					<SunMoon class="size-6" />
				</Button>
			</div>
		</div>
	</nav>

	<!-- Mobile View -->
	<MobileNav parentHeight={clientHeight} class="block lg:hidden" />
</header>
