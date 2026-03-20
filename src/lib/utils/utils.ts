import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

export type FileState = {
	input: File;
	output?: File;
	status: 'idle' | 'converting' | 'done' | 'error';
};

export function getFileBaseName(file: File): string {
	const lastDotIndex = file.name.lastIndexOf('.');
	if (lastDotIndex === -1) return file.name;
	return file.name.substring(0, lastDotIndex);
}

export function getFileType(file: File): string {
	return file.type.split('/')[0];
}
