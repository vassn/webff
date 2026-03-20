import { ffcore } from '$lib/utils/ffcore.svelte';
import { getFileBaseName, type FileState } from '$lib/utils/utils';

export const formats = [
	{ label: 'MP3', extension: '.mp3', options: ['-c:a', 'libmp3lame', '-q:a', '4'] },
	{ label: 'WAV', extension: '.wav', options: ['-c:a', 'pcm_s16le'] },
	{ label: 'FLAC', extension: '.flac', options: ['-c:a', 'flac'] },
	{ label: 'OGG', extension: '.ogg', options: ['-c:a', 'libvorbis', '-q:a', '4'] }
];

export async function convert(files: FileState[], target: string): Promise<void> {
	const targetFormat = formats.find((format) => format.label === target)!;
	for (const file of files) {
		try {
			file.status = 'converting';
			const outputName = getFileBaseName(file.input) + targetFormat.extension;
			file.output = await ffcore.transcode(file.input, targetFormat.options, outputName);
			file.status = 'done';
		} catch (error) {
			file.status = 'error';
			await ffcore.load();
		}
	}
}
