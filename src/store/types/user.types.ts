export type TNewPasswordError = {
	status: number;
	data: {
		success: boolean;
		message: string;
	};
};

export type TRegisterProps = {
	email: string;
	password: string;
	name: string;
};

export type TRegisterResponse = {
	user: {
		email: string;
		name: string;
	};
	success: boolean;
	accessToken: string;
	refreshToken: string;
};

export type TRegisterError = TNewPasswordError;
export type TLoginError = TNewPasswordError;

export type TLoginProps = {
	email: string;
	password: string;
};
