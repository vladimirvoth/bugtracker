describe('Start application', () => {
  beforeEach(() => {
    cy.viewport(1080, 800);
  });

  it('should show the Home page', () => {
    cy.visit('/');
    cy.contains('Track bugs and tasks as easy as can be.');
  });

  it('should navigate to Register page', () => {
    cy.contains('Start Now').click();
    cy.contains('Start in two steps.');
  });

  it('should accept only a correct email address', () => {
    cy.get('input').type('test.test');
    cy.contains('Enter a valid email address');

    cy.get('input').clear();
    cy.get('input').type('test.test@test.com');

    cy.contains('Continue').click();
    cy.contains('Username');
    cy.contains('Password');
    cy.contains('Confirm Password');
  });
});
