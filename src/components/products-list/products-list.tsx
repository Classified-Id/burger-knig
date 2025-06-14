import { clsx } from 'clsx';
import { forwardRef } from 'react';

import { Product } from '@components/product/product';

import styles from './products-list.module.scss';

import type { ProductsListProps } from './products-list.props';

export const ProductsList = forwardRef<HTMLHeadingElement, ProductsListProps>(
	({ data, children, id }, ref) => {
		return (
			<>
				<h2 ref={ref} className={'text text_type_main-medium mb-6'}>
					{children}
				</h2>
				<ul className={clsx(styles.list, 'list mb-6')} id={id}>
					{data.map((ingredient) => {
						return (
							<li key={ingredient._id} className={styles.listElement}>
								<Product ingredient={ingredient} />
							</li>
						);
					})}
				</ul>
			</>
		);
	}
);

ProductsList.displayName = 'ProductsList';
