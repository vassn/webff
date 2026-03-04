<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Binary, Computer, PanelsTopLeft, Shield } from '@lucide/svelte';
</script>

<section class="pt-12 text-center">
	<h1 class="pb-6 text-5xl font-semibold tracking-tight">Private In-Browser Media Converter</h1>
	<h2 class="mx-auto max-w-[60ch] text-lg text-muted-foreground">
		Securely convert and optimize your files without ever uploading them to a server. No ads, no tracking, no server
		limits, no artificial wait times.
	</h2>
</section>

<section class="flex justify-center gap-4 pt-10">
	<Button href="/quick">Quick Convert</Button>
	<Button href="/" variant="ghost">How It Works</Button>
</section>

<section class="mx-auto grid max-w-4xl grid-cols-1 gap-4 pt-18 lg:grid-cols-2 lg:gap-6 lg:pt-24">
	<div class="rounded-lg border bg-card p-6">
		<p class="flex items-center gap-2">
			<Shield class="size-6" />
			<span class="text-lg font-bold">100% Private</span>
		</p>
		<p class="pt-4 text-muted-foreground">
			Files never leave your device. Since processing happens entirely in-browser, your data is never uploaded, stored,
			or shared with anyone.
		</p>
	</div>

	<div class="rounded-lg border bg-card p-6">
		<p class="flex items-center gap-2">
			<Computer class="size-6" />
			<span class="text-lg font-bold">Fully Local</span>
		</p>
		<p class="pt-4 text-muted-foreground">
			Skip the wait for slow uploads. Conversions start instantly because the process happens on your own hardware,
			rather than a distant server.
		</p>
	</div>

	<div class="rounded-lg border bg-card p-6">
		<p class="flex items-center gap-2">
			<Binary class="size-6" />
			<span class="text-lg font-bold">Powerful Tech</span>
		</p>
		<p class="pt-4 text-muted-foreground">
			Built on FFmpeg and WebAssembly. Professional-grade media tools running directly in your browser with no software
			or plugins to install.
		</p>
	</div>

	<div class="rounded-lg border bg-card p-6">
		<p class="flex items-center gap-2">
			<PanelsTopLeft class="size-6" />
			<span class="text-lg font-bold">Simple UI</span>
		</p>
		<p class="pt-4 text-muted-foreground">
			No ads, popups, or "pro" tiers. Just clean, straightforward tools designed to help you get your work done without
			distractions.
		</p>
	</div>
</section>
