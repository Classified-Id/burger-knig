import { useState, useEffect } from 'react';

import type { RefObject } from 'react';

export const useScrollIngredients = (
	refs: Array<RefObject<HTMLElement>>,
	containerRef: RefObject<HTMLElement>,
	tabValues: string[],
	threshold = 100
) => {
	const [activeTab, setActiveTab] = useState<string | null>(tabValues[0]);

	useEffect(() => {
		const container = containerRef.current;

		if (!container) return;

		const handleScroll = () => {
			const containerRect = container.getBoundingClientRect();
			for (let i = 0; i < refs.length; i++) {
				const ref = refs[i].current;
				if (ref) {
					const rect = ref.getBoundingClientRect();
					if (containerRect.top - rect.top <= threshold) {
						setActiveTab(tabValues[i]);
						break;
					}
				}
			}
		};

		container.addEventListener('scroll', handleScroll);

		handleScroll();

		return () => container.removeEventListener('scroll', handleScroll);
	}, [refs, containerRef, tabValues, threshold]);

	return activeTab;
};
