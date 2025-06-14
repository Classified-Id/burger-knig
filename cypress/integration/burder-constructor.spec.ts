import { BASE_URL, DEV_URL } from '../../src/constants/index';

describe('Constructor pages', () => {
	const constructorElementClass =
		"[class^='burger-constructor-module__listElement']";
	const buttonDeleteClass = "[class^='constructor-element__action']";
	const closeButtonClass = "[class^='modal-module__closeButton']";
	const ingredientCardClass = "[class^='product-module__card__'";
	const constructorClass = "[class*='burgerConstructorWrap']";
	const modalOverlayClass = "[class^='modal-overlay']";

	const login = () => {
		cy.intercept('POST', `${BASE_URL}/auth/login`, (req) => {
			req.reply({
				statusCode: 200,
				body: {
					success: true,
					accessToken: 'Bearer test-token',
					refreshToken: 'test-refresh-token',
					user: { email: 'test@mail.com', name: 'Test User' },
				},
			});
		}).as('login');

		cy.intercept('GET', `${BASE_URL}/auth/user`, {
			success: true,
			user: { email: 'test@mail.com', name: 'Test User' },
		}).as('getUser');

		cy.get('a[href="/profile"]').click();
		cy.get('input[name="email"]').type('test@mail.com');
		cy.get('input[name="password"]').type('password');
		cy.get('button[type="submit"]').click();

		cy.wait('@login');
		cy.wait('@getUser');
	};

	it('It should open the ingredient modal and close.', () => {
		cy.get('@bunIngredient').click();
		cy.get(modalOverlayClass).as('modal');
		cy.get(closeButtonClass).click();
		cy.get('@modal').should('not.exist');
	});

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

	it('Should add ingredients to constructor and create order', () => {
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
		cy.get('p').contains('Ваш заказ начали готовить');

		cy.get(closeButtonClass).click();
		cy.get('@modal').should('not.exist');
	});

	it('Should ingredients can be swapped', () => {
		cy.get(constructorClass).as('constructor');

		cy.get('@sauceIngredient').trigger('dragstart');
		cy.get('@constructor').trigger('drop');

		cy.get('@mainIngredient').trigger('dragstart');
		cy.get('@constructor').trigger('drop');

		cy.get('@constructor')
			.find(constructorElementClass)
			.should('have.length', 2);
		cy.get('@constructor')
			.find(constructorElementClass)
			.as('constructorElement');
		cy.get('@constructorElement').eq(0).as('firstItem');
		cy.get('@constructorElement').eq(1).as('secondItem');

		const initialOrder: string[] = [];
		cy.get('@constructorElement').each(($el) => {
			initialOrder.push($el.text());
		});

		cy.get('@firstItem').trigger('dragstart');
		cy.get('@secondItem').trigger('drop');

		cy.get('@constructorElement').then(($items) => {
			expect($items.eq(0).text()).to.equal(initialOrder[0]);
			expect($items.eq(1).text()).to.equal(initialOrder[1]);
		});
	});

	it('Should an ingredient in the list be removed', () => {
		cy.get(constructorClass).as('constructor');

		cy.get('@mainIngredient').trigger('dragstart');
		cy.get('@constructor').trigger('drop');
		cy.get('@constructor')
			.find(constructorElementClass)
			.should('have.length', 1);

		cy.get(buttonDeleteClass).click();
		cy.get('@constructor')
			.find(constructorElementClass)
			.should('have.length', 0);
	});
});
