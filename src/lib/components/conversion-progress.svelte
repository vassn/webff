<script lang="ts">
	import { ffcore } from '$lib/utils/ffcore.svelte';
	import type { FileState } from '$lib/utils/utils';
	import { Check, Download, X } from '@lucide/svelte';
	import pkg from 'file-saver';
	import JSZip from 'jszip';
	import { toast } from 'svelte-sonner';
	import { Button } from './ui/button';
	import Progress from './ui/progress/progress.svelte';
	import { Spinner } from './ui/spinner';
	const { saveAs } = pkg;

	type Props = {
		files: FileState[];
		reset: () => void;
	};

	const { files, reset }: Props = $props();

	const isConverting = $derived(
		!files.every((file) => file.status === 'idle') &&
			!files.every((file) => file.status === 'done' || file.status === 'error')
	);

	const convertingCount = $derived(files.reduce((count, file) => (file.status !== 'idle' ? count + 1 : count), 0));

	let isDownloading = $state(false);

	async function download() {
		isDownloading = true;

		const convertedFiles = files.map((file) => file.output).filter((file) => file !== undefined);

		if (convertedFiles.length === 0) {
			toast.error('Failed to convert files.');
		} else if (convertedFiles.length === 1) {
			saveAs(convertedFiles[0], convertedFiles[0].name);
		} else {
			const zip = new JSZip();
			convertedFiles.forEach((file) => zip.file(file.name, file));
			const zippedFiles = await zip.generateAsync({ type: 'blob' });
			saveAs(zippedFiles, 'converted-files.zip');
		}

		isDownloading = false;
	}
</script>

<div class="w-full max-w-lg rounded-lg bg-card p-4">
	{#if ffcore.state !== 'loaded'}
		<!-- Loading FFmpeg -->
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-4">
				<Spinner class="size-5" />
				<span class="text-sm font-medium">Loading FFmpeg...</span>
			</div>

			<Button onclick={reset} variant="outline">
				<X /> Cancel
			</Button>
		</div>
	{:else if isConverting}
		<!-- Converting -->
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-4">
				<Spinner class="size-5" />
				<span class="text-sm font-medium">Converting files...</span>
			</div>

			<div class="flex items-center gap-4">
				<span class="text-sm font-medium text-muted-foreground tabular-nums">
					{convertingCount} / {files.length}
				</span>
				<Button onclick={reset} variant="outline">
					<X /> Cancel
				</Button>
			</div>
		</div>

		<div class="mt-6 mb-1">
			{#if ffcore.currentType === 'image'}
				<Progress value={0} class="animate-pulse" />
			{:else}
				<Progress value={ffcore.progress === 100 ? 0 : ffcore.progress} />
			{/if}
		</div>
	{:else}
		<!-- Done -->
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-4">
				<Check class="size-5" />
				<span class="text-sm font-medium">Conversion finished</span>
			</div>

			{#if !isDownloading}
				<Button onclick={download}>
					<Download /> Download files
				</Button>
			{:else}
				<Button disabled>
					<Spinner /> Download files
				</Button>
			{/if}
		</div>
	{/if}
</div>
