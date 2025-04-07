export type TIngredient = {
	calories: number;
	carbohydrates: number;
	fat: number;
	image: string;
	image_large: string;
	image_mobile: string;
	name: string;
	price: number;
	proteins: number;
	type: 'bun' | 'main' | 'sauce';
	_id: string;
	idKey?: string;
	index?: number;
};

export type TIngredientsResponse = {
	data: TIngredient[];
};

export type TTransformedResponse = {
	buns: TIngredient[];
	mains: TIngredient[];
	sauces: TIngredient[];
};
