<script lang="ts">
	import ConversionProgress from '$lib/components/conversion-progress.svelte';
	import FileUpload from '$lib/components/file-upload.svelte';
	import { ffcore } from '$lib/utils/ffcore.svelte';
	import type { FileState } from '$lib/utils/utils';
	import { allSupportedType, allUnderMB } from '$lib/utils/validation';
	import { fly } from 'svelte/transition';
	import { convert } from './utils';

	type Status = 'idle' | 'converting' | 'done';

	let files = $state<FileState[]>([]);
	let status = $state<Status>('idle');

	async function onFilesUploaded(uploadedFiles: FileState[]) {
		if (!allUnderMB(uploadedFiles)) return;
		if (!allSupportedType(uploadedFiles, ['video', 'image'])) return;
		files = uploadedFiles;
		status = 'converting';
		await convert(files);
		if (status === 'converting') status = 'done';
	}

	function reset() {
		files = [];
		status = 'idle';
		ffcore.load();
	}
</script>

<svelte:head>
	<title>WebFF | Web Optimizer</title>
</svelte:head>

<section class="space-y-4 pt-12 text-center">
	<h1 class="text-4xl font-semibold">Web Optimizer</h1>
	<h2 class="mx-auto max-w-prose text-base text-muted-foreground lg:text-lg">
		Easily convert images and videos to optimized WebP and WebM formats. <br class="hidden md:block" />
		Save time by uploading images and videos together for seamless bulk conversion.
	</h2>
</section>

{#if status === 'idle'}
	<section class="flex justify-center pt-12" in:fly={{ y: 6, duration: 150, delay: 100 }}>
		<FileUpload onUpload={onFilesUploaded} />
	</section>
{:else}
	<section class="flex justify-center pt-12" in:fly={{ y: 6, duration: 150, delay: 100 }}>
		<ConversionProgress {files} {reset} />
	</section>
{/if}
