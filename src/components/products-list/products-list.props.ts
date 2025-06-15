import type { ReactNode } from 'react';
import type { TIngredient } from '@store';

export interface ProductsListProps {
	children: ReactNode;
	data: TIngredient[];
	id: string;
}
