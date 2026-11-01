const files = import.meta.glob<string>(
	'../../../content/**/*.{png,jpg,jpeg,gif,svg,webp}',
	{ query: '?url', import: 'default', eager: true },
);

const urlsByName = new Map(
	Object.entries(files).map(([path, url]) => [path.split('/').at(-1), url]),
);

export const findImage = (name: string): string | undefined => {
	return urlsByName.get(name);
};
