<script lang="ts">
	import ConversionProgress from '$lib/components/conversion-progress.svelte';
	import FileUpload from '$lib/components/file-upload.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import { ffcore } from '$lib/utils/ffcore.svelte';
	import { type FileState } from '$lib/utils/utils';
	import { convert, getFormats, isUploadValid } from './utils';

	type Status = 'idle' | 'selecting-format' | 'converting' | 'done';

	let files = $state<FileState[]>([]);
	let status = $state<Status>('idle');
	let targetLabel = $state('');

	function onFilesUploaded(uploadedFiles: FileState[]) {
		if (isUploadValid(uploadedFiles)) {
			files = uploadedFiles;
			status = 'selecting-format';
		}
	}

	async function startConversion() {
		if (!files.length || !targetLabel) return;
		status = 'converting';
		await convert(files, targetLabel);
		if (status === 'converting') status = 'done';
	}

	function reset() {
		files = [];
		status = 'idle';
		targetLabel = '';
		ffcore.load();
	}

	function closeDialog() {
		if (status === 'selecting-format') reset();
	}
</script>

<section class="pt-6 text-center md:pt-12">
	<h1 class="pb-4 text-4xl font-semibold">Quick Convert</h1>
	<h2 class="mx-auto max-w-prose text-lg text-muted-foreground">
		Easily convert video, image, and audio files to any popular format. <br class="hidden md:block" />
		Save time by batch converting multiple files of the same type in bulk.
	</h2>
</section>

{#if status === 'idle' || status === 'selecting-format'}
	<section class="flex justify-center pt-12">
		<FileUpload onUpload={onFilesUploaded} />

		<Dialog.Root open={status === 'selecting-format'} onOpenChange={closeDialog}>
			<Dialog.Content onOpenAutoFocus={(e) => e.preventDefault()}>
				<Dialog.Header>
					<Dialog.Title>Select format</Dialog.Title>
					<Dialog.Description>Select the format you want your files to be converted into.</Dialog.Description>
				</Dialog.Header>

				<ToggleGroup.Root
					type="single"
					bind:value={targetLabel}
					variant="outline"
					spacing={1.5}
					class="grid w-full grid-cols-4 py-4 sm:grid-cols-6">
					{#each getFormats(files) as format}
						<ToggleGroup.Item
							value={format.label}
							class="py-5 hover:border-muted-foreground hover:bg-transparent data-[state=on]:border-muted-foreground">
							{format.label}
						</ToggleGroup.Item>
					{/each}
				</ToggleGroup.Root>

				<Dialog.Footer>
					<Dialog.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Dialog.Close>
					<Button onclick={startConversion}>Convert</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	</section>
{:else}
	<section class="flex justify-center pt-12">
		<ConversionProgress {files} {reset} />
	</section>
{/if}
