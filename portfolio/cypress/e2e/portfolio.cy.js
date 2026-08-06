describe("Portfolio authentication and project management", () => {
    const existingEmail = "cypresstest1@test.com";
    const existingPassword = "TestPassword123";

    const signIn = () => {
        cy.visit("/admin/login");

        cy.get('[data-cy="signin-email"]').type(existingEmail);
        cy.get('[data-cy="signin-password"]').type(existingPassword);
        cy.get('[data-cy="signin-submit"]').click();

        cy.location("pathname").should("eq", "/admin");
        cy.contains("h1", "Admin Dashboard").should("be.visible");
    };

    it("allows a new user to sign up", () => {
        const uniqueEmail = `cypress${Date.now()}@test.com`;

        cy.visit("/admin/signup");

        cy.get('[data-cy="signup-firstname"]').type("Cypress");
        cy.get('[data-cy="signup-lastname"]').type("Test");
        cy.get('[data-cy="signup-email"]').type(uniqueEmail);
        cy.get('[data-cy="signup-password"]').type("TestPassword123");
        cy.get('[data-cy="signup-submit"]').click();

        cy.get('[data-cy="signup-success"]')
            .should("be.visible")
            .and("contain", "success");
    });

    it("allows an existing user to sign in", () => {
        signIn();

        cy.window().then((window) => {
            expect(
                window.localStorage.getItem("portfolioToken")
            ).to.not.be.null;
        });
    });

    it("allows an authenticated user to add a project", () => {
        const projectTitle = `Cypress Project ${Date.now()}`;

        signIn();
        cy.visit("/admin/projects");

        cy.get("#title").type(projectTitle);
        cy.get("#completion").type("2026-08-05");
        cy.get("#description").type(
            "A project created by the Cypress automated test."
        );
        cy.get("#image").type("https://example.com/cypress-project.jpg");

        cy.contains("button", "Add Project").click();

        cy.contains(".success-message", "Project added successfully.")
            .should("be.visible");

        cy.contains("tbody tr", projectTitle).should("be.visible");

        cy.on("window:confirm", () => true);

        cy.contains("tbody tr", projectTitle).within(() => {
            cy.contains("button", "Delete").click();
        });

        cy.contains("tbody tr", projectTitle).should("not.exist");
    });

    it("allows an authenticated user to edit a project", () => {
        const originalTitle = `Project Before Edit ${Date.now()}`;
        const updatedTitle = `Project After Edit ${Date.now()}`;

        signIn();
        cy.visit("/admin/projects");

        cy.get("#title").type(originalTitle);
        cy.get("#completion").type("2026-08-05");
        cy.get("#description").type(
            "A project that will be edited by Cypress."
        );
        cy.get("#image").type("https://example.com/project-before-edit.jpg");

        cy.contains("button", "Add Project").click();
        cy.contains("tbody tr", originalTitle).should("be.visible");

        cy.contains("tbody tr", originalTitle).within(() => {
            cy.contains("button", "Edit").click();
        });

        cy.get("#title").clear().type(updatedTitle);
        cy.get("#description")
            .clear()
            .type("This project was updated by Cypress.");
        cy.get("#image")
            .clear()
            .type("https://example.com/project-after-edit.jpg");

        cy.contains("button", "Update Project").click();

        cy.contains(".success-message", "Project updated successfully.")
            .should("be.visible");

        cy.contains("tbody tr", updatedTitle)
            .should("be.visible")
            .and("contain", "This project was updated by Cypress.");

        // Remove only the record created by this test.
        cy.on("window:confirm", () => true);

        cy.contains("tbody tr", updatedTitle).within(() => {
            cy.contains("button", "Delete").click();
        });

        cy.contains("tbody tr", updatedTitle).should("not.exist");
    });

    it("allows an authenticated user to sign out", () => {
        signIn();

        cy.contains("a", "Sign Out").click();

        cy.location("pathname").should("eq", "/admin/login");

        cy.window().then((window) => {
            expect(
                window.localStorage.getItem("portfolioToken")
            ).to.be.null;
        });
    });
});