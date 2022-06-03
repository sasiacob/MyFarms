/// <reference types="cypress" />

it("works", () => {
	cy.visit("/");
	cy.contains("Submit").should("be.visible");
});
