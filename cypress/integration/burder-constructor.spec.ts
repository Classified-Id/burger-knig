import { BASE_URL, DEV_URL } from '../../src/constants/index';

describe('Constructor pages', () => {
	const ingredientCardClass = "[class^='product-module__card__'";
	const modalOverlayClass = "[class^='modal-overlay']";
	const constructorClass = "[class*='burgerConstructorWrap']";
	const constructorElementClass =
		"[class^='ingredient-constructor-element-module__container']";
	const modalButtonCloseClass = "[class^='modal-module__closeButton']";
	const buttonDeleteClass = "[class^='constructor-element__action']";

	const login = () => {
		cy.intercept('GET', `${BASE_URL}/auth/user`, { fixture: 'user.json' }).as(
			'getUser'
		);

		cy.get('a[href="/profile"]').click();
		cy.get('input[name="email"]').click().type('test@mail.com');
		cy.get('input[name="password"]').click().type('password');
		cy.get('button[type="submit"]').click();
		cy.get('a[href="/"]').first().click();

		// Ждем завершения запроса логина
		cy.wait('@login');

		// Проверяем, что запрос за пользователем выполнен
		cy.wait('@getUser')
			.its('response.body.user')
			.should('have.property', 'email');

		cy.get('a[href="/"]').first().click();
	};

	beforeEach(() => {
		cy.visit(DEV_URL);

		cy.intercept('POST', `${BASE_URL}/auth/login`, {
			fixture: 'login.json', // Успешный ответ логина
		}).as('login');

		cy.intercept('GET', `${BASE_URL}/auth/user`, {
			fixture: 'user.json',
		}).as('getUser');

		cy.intercept('POST', `${BASE_URL}/orders`, {
			fixture: 'orders.json',
		}).as('createOrder');

		cy.intercept('POST', `${BASE_URL}/orders`, { fixture: 'orders' });
		cy.intercept('GET', `${BASE_URL}/ingredients`, { fixture: 'ingredients' });
		cy.intercept('POST', `${BASE_URL}/auth/login`, { fixture: 'login' });

		cy.get("[id='bun']").find(ingredientCardClass).first().as('bunIngredient');
		cy.get("[id='sauce']")
			.find(ingredientCardClass)
			.first()
			.as('sauceIngredient');
		cy.get("[id='main']")
			.find(ingredientCardClass)
			.first()
			.as('mainIngredient');
	});

	it('Should an ingredient drag in to a constructor and create order successfully', () => {
		login();
		cy.get(constructorClass).as('constructor');

		cy.get('@bunIngredient').trigger('dragstart');
		cy.get('@constructor').trigger('drop');

		cy.get('@sauceIngredient').trigger('dragstart');
		cy.get('@constructor').trigger('drop');

		cy.get('@mainIngredient').trigger('dragstart');
		cy.get('@constructor').trigger('drop');

		cy.get('button').contains('Оформить заказ').click();

		cy.get(modalOverlayClass).as('modal');
		cy.get('span').contains('Ваш заказ начали готовить');

		cy.get(modalButtonCloseClass).click();
		cy.get('@modal').should('not.exist');
	});

	// it('Should the ingredient change order in the list', () => {
	// 	cy.get(constructorClass).as('constructor');
	//
	// 	cy.get('@sauceIngredient').trigger('dragstart');
	// 	cy.get('@constructor').trigger('drop');
	//
	// 	cy.get('@mainIngredient').trigger('dragstart');
	// 	cy.get('@constructor').trigger('drop');
	//
	// 	cy.get('@constructor')
	// 		.find(constructorElementClass)
	// 		.should('have.length', 2);
	// 	cy.get('@constructor')
	// 		.find(constructorElementClass)
	// 		.as('constructorElement');
	// 	cy.get('@constructorElement').eq(0).as('firstItem');
	// 	cy.get('@constructorElement').eq(1).as('secondItem');
	//
	// 	const initialOrder: string[] = [];
	// 	cy.get('@constructorElement').each(($el) => {
	// 		initialOrder.push($el.text());
	// 	});
	//
	// 	cy.get('@firstItem').trigger('dragstart');
	// 	cy.get('@secondItem').trigger('drop');
	//
	// 	cy.get('@constructorElement').then(($items) => {
	// 		expect($items.eq(0).text()).to.equal(initialOrder[1]);
	// 		expect($items.eq(1).text()).to.equal(initialOrder[0]);
	// 	});
	// });
	//
	// it('Should an ingredient in the list be removed', () => {
	// 	cy.get(constructorClass).as('constructor');
	//
	// 	cy.get('@mainIngredient').trigger('dragstart');
	// 	cy.get('@constructor').trigger('drop');
	// 	cy.get('@constructor')
	// 		.find(constructorElementClass)
	// 		.should('have.length', 1);
	//
	// 	cy.get(buttonDeleteClass).click();
	// 	cy.get('@constructor')
	// 		.find(constructorElementClass)
	// 		.should('have.length', 0);
	// });
	//
	it('Should open a modal and close after click button', () => {
		cy.get('@bunIngredient').click();
		cy.get(modalOverlayClass).as('modal');
		cy.get(modalButtonCloseClass).click();
		cy.get('@modal').should('not.exist');
	});
});
