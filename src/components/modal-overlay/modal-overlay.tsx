import styles from './modal-overlay.module.scss';

import type { FC } from 'react';

type TModalOverlayProps = {
	setModalActive?: (e: boolean) => void;
	onClick?: () => void;
};

export const ModalOverlay: FC<TModalOverlayProps> = (props) => {
	return (
		<div
			className={styles.modalOverlay}
			onClick={props.onClick}
			role='button'
			tabIndex={0}
		/>
	);
};
