import React from 'react';
import { clsx } from 'clsx';

import styles from './notify.module.scss';

import type { FC } from 'react';

interface INotifyProps {
	message: string;
	type?: 'error' | 'info' | 'warning';
}

export const Notify: FC<INotifyProps> = ({ message, type = 'error' }) => {
	const notifyClassName = clsx(styles.notify, {
		[styles.notifyError]: type === 'error',
		[styles.notifyInfo]: type === 'info',
		[styles.notifyWarning]: type === 'warning',
	});

	return <div className={notifyClassName}>{message}</div>;
};
