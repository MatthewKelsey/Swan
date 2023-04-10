describe("Login", () => {
  it("logs in successfully", () => {
    cy.visit("http://localhost:3000/login");

    cy.get('input[name="email"]').type("new-User@user.com");
    cy.get('input[name="password"]').type("newUser");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/home");
    cy.contains("Upcoming Races");
  });
});

describe("Odds", () => {
  it("logs in and moves succesfully to odds page", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('input[name="email"]').type("new-User@user.com");
    cy.get('input[name="password"]').type("newUser");
    cy.get('button[type="submit"]').click();
    cy.get(".race-div").first().click();
    cy.url().should("include", "/odds");
    cy.get(".horse-div").should("exist");
  });
});
