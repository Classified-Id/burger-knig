import { render, fireEvent } from '@testing-library/react';
import { Link } from './Link';

it('Рендерит ссылку', () => {
	const { container } = render(
		<Link title='Рецепт пельменей' url='https://pelmeni.gov' />
	);
	expect(container).toMatchSnapshot();
});

it('Нажатие на кнопку вызывает корректный alert', () => {
	window.alert = jest.fn();

	// Рендерим ссылку в переменную
	const { container } = render(
		<Link title='Рецепт пельменей' url='https://pelmeni.gov' />
	);
	// Имитируем нажатие на ссылку
	fireEvent.click(container.querySelector('a'));

	// Проверяем, что alert сработал с правильным текстом предупреждения
	expect(window.alert).toHaveBeenCalledWith('Ура! Пельмени!');
});
