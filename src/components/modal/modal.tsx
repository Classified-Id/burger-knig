import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

import {
	CloseIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

import styles from './modal.module.css';

import type { ReactNode, FC } from 'react';

interface IModalProps {
	onClose: () => void;
	header?: string;
	children: ReactNode;
}

export const Modal: FC<IModalProps> = (props) => {
	useEffect(() => {
		const escClose = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				props.onClose();
			}
		};
		document.addEventListener('keydown', escClose);

		return () => {
			document.removeEventListener('keydown', escClose);
		};
	}, [props]);

	const portalContent = (
		<div>
			<ModalOverlay onClick={props.onClose} />
			<div
				className={styles.modalContent}
				onClick={(e) => e.stopPropagation()}
				role='button'
				tabIndex={0}>
				<div className={styles.modalContentCaption}>
					<span className='text text_type_main-medium'>{props.header}</span>
					<Button
						className={styles.closeButton}
						htmlType='button'
						type='secondary'
						size='small'
						onClick={props.onClose}>
						<CloseIcon type={'primary'} />
					</Button>
				</div>
				{props.children}
			</div>
		</div>
	);

	return createPortal(
		portalContent,
		document.getElementById('reactPortals') as HTMLElement
	);
};
