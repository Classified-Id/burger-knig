import type { TIngredient } from '@store';

export type TBurgerItemProps = {
	ingredient: TIngredient;
	handleMove: (dragIndex: number, hoverIndex: number) => void;
	index: number;
	key: string | undefined;
};
