import { useState, useEffect } from 'react';

import type { RefObject } from 'react';

const THRESHOLD = 50;

type TabValue = 'buns' | 'sauces' | 'main';

export const useScrollIngredients = (
	refs: Array<RefObject<HTMLElement>>,
	containerRef: RefObject<HTMLElement>,
	tabValues: TabValue[]
) => {
	const [activeTab, setActiveTab] = useState<TabValue | null>(tabValues[0]);

	useEffect(() => {
		const container = containerRef.current;

		if (!container) return;

		const handleScroll = () => {
			const containerRect = container.getBoundingClientRect();
			for (let i = 0; i < refs.length; i++) {
				const ref = refs[i].current;
				if (ref) {
					const rect = ref.getBoundingClientRect();
					if (containerRect.top - rect.top <= THRESHOLD) {
						setActiveTab(tabValues[i]);
						break;
					}
				}
			}
		};

		container.addEventListener('scroll', handleScroll);

		handleScroll();

		return () => container.removeEventListener('scroll', handleScroll);
	}, [refs, containerRef, tabValues]);

	const scrollToSection = (indexOrValue: TabValue) => () => {
		const index = tabValues.indexOf(indexOrValue);

		if (index >= 0 && index < refs.length) {
			const ref = refs[index]?.current;
			if (ref) {
				ref.scrollIntoView({ behavior: 'smooth' });
			}
		}
	};

	return { activeTab, scrollToSection };
};
