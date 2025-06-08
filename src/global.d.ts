import 'react';

import type { PointerEvent } from 'react';

declare module 'react' {
	interface HTMLAttributes<T> {
		onPointerEnterCapture?: (e: PointerEvent<T>) => void;
		onPointerLeaveCapture?: (e: PointerEvent<T>) => void;
	}
	interface RefAttributes<T> {
		onPointerEnterCapture?: (e: PointerEvent<T>) => void;
		onPointerLeaveCapture?: (e: PointerEvent<T>) => void;
	}
}
