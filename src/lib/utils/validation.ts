import { toast } from 'svelte-sonner';
import type { FileState } from './utils';

export function allUnderMB(files: FileState[], MB: number = 100): boolean {
	if (!files.every((file) => file.input.size < MB * 1e6)) {
		toast.error(`Each uploaded file must be under ${MB}MB`);
		return false;
	}
	return true;
}

export function allSameType(files: FileState[]): boolean {
	if (files.length === 0) return true;
	const baseType = files[0].input.type.split('/')[0];
	if (!files.every((file) => file.input.type.split('/')[0] === baseType)) {
		toast.error('All uploaded files must share the same file type');
		return false;
	}
	return true;
}

export function allSupportedType(files: FileState[], types: string[]): boolean {
	if (!files.every((file) => types.includes(file.input.type.split('/')[0]))) {
		toast.error('Some uploaded files have unsupported file types');
		return false;
	}
	return true;
}
