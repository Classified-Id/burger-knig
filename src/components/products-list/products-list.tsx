import { clsx } from 'clsx';
import { forwardRef } from 'react';

import { Product } from '@components/product/product';

import styles from './products-list.module.scss';

import type { ReactNode } from 'react';
import type { TIngredient } from '@store';

interface ProductsListProps {
	children: ReactNode;
	data: TIngredient[];
}

export const ProductsList = forwardRef<HTMLHeadingElement, ProductsListProps>(
	({ data, children }, ref) => {
		return (
			<>
				<h2
					ref={ref}
					className={clsx(styles.title, 'text text_type_main-medium')}>
					{children}
				</h2>
				<div
					className={clsx(
						styles.ingredientsBox,
						'mt-6',
						'ml-4',
						'mr-4',
						'mb-10'
					)}>
					<ul className={clsx(styles.list, 'list')}>
						{data.map((ingredient) => {
							return (
								<li key={ingredient._id} className={styles.listElement}>
									<Product data={ingredient} />
								</li>
							);
						})}
					</ul>
				</div>
			</>
		);
	}
);

ProductsList.displayName = 'ProductsList';
