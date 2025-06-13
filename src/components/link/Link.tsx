import React from 'react';

import type { FC } from 'react';

type TLinkprops = {
	title: string;
	url: string;
};

export const Link: FC<TLinkprops> = ({ title, url }) => {
	const onClick = () => {
		alert('Ура! Пельмени!');
	};

	return (
		<a href={url} onClick={onClick}>
			{title}
		</a>
	);
};
