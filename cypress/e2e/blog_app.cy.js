describe("Blog app", function () {
    beforeEach(function () {
        cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
        cy.createUser({ username: "root", name: "Superuser", password: "qwerty" });
    });

    it("Login form is shown", function () {
        cy.contains("Log in to application");
        cy.get("#username");
        cy.get("#password");
        cy.get("html").should("not.contain", "blogs");
    });

    describe("Login", function () {
        it("succeeds with correct credentials", function () {
            cy.get("#username").type("root");
            cy.get("#password").type("qwerty");
            cy.contains("Log In").click();

            cy.contains("Superuser logged in");
        });

        it("fails with wrong credentials", function () {
            cy.get("#username").type("root");
            cy.get("#password").type("wrong");
            cy.contains("Log In").click();

            cy.get(".notification")
                .should("contain", "wrong username or password")
                .and("have.css", "color", "rgb(255, 0, 0)");
        });
    });

    describe("When logged in", function () {
        beforeEach(function () {
            cy.login({ username: "root", password: "qwerty" });
        });

        it("A blog can be created", function () {
            cy.contains("new blog").click();
            cy.get("#title").type("Cypress Blog");
            cy.get("#author").type("Cypress Company");
            cy.get("#url").type("https://www.cypress.io/");
            cy.contains("create").click();

            cy.contains("Cypress Blog");
            cy.get(".notification")
                .should("contain", "a new blog Cypress Blog by Cypress Company added");
        });

        describe("and several blogs exist", function () {
            beforeEach(function () {
                cy.createBlog({ title: "Blog 1", author: "Author 1", url: "URL1", likes: 1 });
                cy.createBlog({ title: "Blog 2", author: "Author 2", url: "URL2", likes: 4 });
                cy.createBlog({ title: "Blog 3", author: "Author 3", url: "URL3", likes: 5 });
            });

            it("A user can like a blog", function () {
                cy.contains("Blog 1").contains("show").click();
                cy.contains("Blog 1").contains("likes 1");
                cy.contains("Blog 1").contains("like").click();
                cy.contains("Blog 1").contains("likes 2");
            });

            it("A user who created a blog can delete it", function () {
                cy.get("html").should("contain", "Blog 2");
                cy.contains("Blog 2").contains("show").click();
                cy.contains("Blog 2").contains("remove").click();
                cy.get("html").should("not.contain", "Blog 2");
            });

            it("Only creator can see the delete button of a blog", function () {
                cy.contains("Blog 3").contains("show").click();
                cy.contains("Blog 3").should("contain", "remove");

                cy.createUser({ username: "test", name: "Test User", password: "qwerty" });
                cy.login({ username: "test", password: "qwerty" });
                cy.get("html").should("contain", "Test User logged in");
                cy.contains("Blog 3").contains("show").click();
                cy.contains("Blog 3").should("not.contain", "remove");
            });

            it("Blogs are ordered according to likes", function () {
                cy.get(".blog").eq(0).should("contain", "Blog 3");
                cy.get(".blog").eq(1).should("contain", "Blog 2");
                cy.get(".blog").eq(2).should("contain", "Blog 1");

                cy.get(".blog").eq(1).contains("show").click();
                cy.contains("like").click().wait(1000).click();

                cy.get(".blog").eq(0).should("contain", "Blog 2")
                    .and("contain", "likes 6");
            });
        });
    });
});