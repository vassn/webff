import { ffcore } from '$lib/utils/ffcore.svelte';
import { getFileBaseName, type FileState } from '$lib/utils/utils';

const generalOptions = ['-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2', '-threads', '4', '-sn', '-dn'];

const x264Options = ['-c:v', 'libx264', '-preset', 'veryfast', '-crf', '23', '-c:a', 'aac', '-b:a', '128k'];

const webmOptions = ['-c:v', 'libvpx', '-crf', '15', '-cpu-used', '5', '-c:a', 'libvorbis', '-q:a', '4'];

const aviOptions = ['-c:v', 'mpeg4', '-q:v', '8', '-c:a', 'libmp3lame', '-q:a', '5'];

const wmvOptions = ['-c:v', 'wmv2', '-q:v', '5', '-c:a', 'wmav2', '-b:a', '128k'];

export const formats = [
	{ label: 'MP4', extension: '.mp4', options: x264Options },
	{ label: 'MOV', extension: '.mov', options: x264Options },
	{ label: 'MKV', extension: '.mkv', options: x264Options },
	{ label: 'WEBM', extension: '.webm', options: webmOptions },
	{ label: 'AVI', extension: '.avi', options: aviOptions },
	{ label: 'WMV', extension: '.wmv', options: wmvOptions }
];

export async function convert(files: FileState[], target: string): Promise<void> {
	const targetFormat = formats.find((format) => format.label === target)!;
	for (const file of files) {
		try {
			file.status = 'converting';
			const outputName = getFileBaseName(file.input) + targetFormat.extension;
			file.output = await ffcore.transcode(file.input, [...targetFormat.options, ...generalOptions], outputName);
			file.status = 'done';
		} catch (error) {
			file.status = 'error';
			await ffcore.load();
		}
	}
}
