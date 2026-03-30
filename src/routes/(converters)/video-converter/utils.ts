import { ffcore } from '$lib/utils/ffcore.svelte';
import { getFileBaseName, type FileState } from '$lib/utils/utils';

const generalOptions = ['-b:a', '128k', '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2', '-sn', '-dn', '-threads', `6`];
const x264Options = ['-c:v', 'libx264', '-preset', 'superfast', '-crf', '23', '-c:a', 'aac'];

export const formats = [
	{ label: 'MP4', extension: '.mp4', options: x264Options },
	{ label: 'MOV', extension: '.mov', options: x264Options },
	{ label: 'MKV', extension: '.mkv', options: x264Options },
	{
		label: 'WEBM',
		extension: '.webm',
		options: ['-c:v', 'libvpx', '-crf', '10', '-b:v', '0', '-cpu-used', '5', '-c:a', 'libvorbis']
	},
	{
		label: 'AVI',
		extension: '.avi',
		options: ['-c:v', 'mpeg4', '-vtag', 'xvid', '-q:v', '5', '-c:a', 'libmp3lame']
	},
	{
		label: 'WMV',
		extension: '.wmv',
		options: ['-c:v', 'wmv2', '-q:v', '5', '-c:a', 'wmav2']
	}
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
