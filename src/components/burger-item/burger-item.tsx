import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { clsx } from 'clsx';

import { deleteBurgerIngredient, useAppDispatch } from '@store';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from '@components/burger-constructor/burger-constructor.module.scss';

import type { TIngredient } from '@store';
import type { TBurgerItemProps } from './burger-item.props';
import type { FC } from 'react';

export const BurgerItem: FC<TBurgerItemProps> = ({
	ingredient,
	handleMove,
	index,
}) => {
	const dispatch = useAppDispatch();
	const ref = useRef<HTMLLIElement>(null);

	const [{ isDragging }, dragRef] = useDrag({
		type: 'item',
		item: { index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [, drop] = useDrop({
		accept: 'item',
		hover: (item: TIngredient, monitor) => {
			if (!ref.current) return;
			const draggedIndex = item.index;
			const hoveredIndex = index;

			if (draggedIndex === hoveredIndex) return;

			const hoverBoundingRect = ref.current.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2 - 1;

			const clientOffset = monitor.getClientOffset();
			if (!clientOffset) return;

			const hoverActualY = clientOffset.y - hoverBoundingRect.top;

			if (draggedIndex === undefined || hoveredIndex === undefined) return;

			if (draggedIndex < hoveredIndex && hoverActualY < hoverMiddleY) return;
			if (draggedIndex > hoveredIndex && hoverActualY > hoverMiddleY) return;

			handleMove(draggedIndex, hoveredIndex);
			item.index = hoveredIndex;
		},
	});

	dragRef(drop(ref));

	return (
		<li
			className={clsx(
				styles.listElement,
				isDragging && styles.listElementHover
			)}
			ref={ref}>
			<DragIcon type={'primary'} />
			<ConstructorElement
				isLocked={false}
				text={ingredient.name}
				price={ingredient.price}
				thumbnail={ingredient.image}
				handleClose={() => dispatch(deleteBurgerIngredient(index))}
			/>
		</li>
	);
};
