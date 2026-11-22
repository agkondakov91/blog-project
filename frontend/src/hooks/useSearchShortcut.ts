import { type RefObject, useEffect } from 'react';

export const useSearchShortcut = (
	inputRef: RefObject<HTMLInputElement | null>,
) => {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key !== '/') {
				return;
			}
			if (
				e.target instanceof HTMLInputElement ||
				e.target instanceof HTMLTextAreaElement
			) {
				return;
			}
			e.preventDefault();
			inputRef.current?.focus();
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});
};
