// eslint-disable-next-line no-undef
describe("Renting a car", () => {
  // eslint-disable-next-line no-undef
  it("Should rent a car", () => {
    // eslint-disable-next-line no-undef
    cy.visit("http://localhost:5173/allcars/Mustang");
    // Click on the RentButton
    cy.get(".buttons > :nth-child(4)").click();

    // Wait for the form to be visible
    cy.get("#rent-car-form").should("be.visible");

    // Fill out the form
    cy.get("#from-date").type("2024-05-10"); 
    cy.get("#to-date").type("2024-05-15"); 

    // Submit the form by clicking the Rent button
    cy.get("#rent").click();

    cy.get("#total-cost").should("have.value", "$1100.00");
    cy.wait(1000);
    cy.get("#cancel_b").click();
    cy.get("#rent-car-form").should("not.be.visible");
  });



  it("should find a mustang rented",()=>{
    cy.visit("http://localhost:5173/history");
    cy.get(".history-table").should("be.visible");
    cy.get(".history-table").debug();
    cy.wait(2000);

    // Assert if the rental history contains the expected details
      cy.get(".history-table").should("be.visible");
      cy.get(".history-table")
        .contains("Mustang")
        .parent()
        .within(() => {
          cy.contains("2024-05-10").should("exist");
          cy.contains("2024-05-15").should("exist");
        });
  })


  it("should select a car and navigate between its images",()=>{
    cy.visit("http://localhost:5173/allcars/Tiguan");
    // Wait for the images to load
    cy.wait(2000); // Adjust the wait time as needed

    cy.get(".content > :nth-child(1)").should("be.visible");
    cy.get(
      '[style="width: 100%; max-width: 600px; height: 400px; overflow: hidden; border-radius: 30px; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 8px;"] > img'
    ).should("have.length.gt", 0);

    // Get the list of images
    cy.get(
      '[style="width: 100%; max-width: 600px; height: 400px; overflow: hidden; border-radius: 30px; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 8px;"] > img'
    ).as("images");

    // Click on the first image
    cy.get("@images").eq(0).click();

    // Check if the image is displayed in full screen
    cy.get(
      '[style="width: 100%; max-width: 600px; height: 400px; overflow: hidden; border-radius: 30px; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 8px;"] > img'
    ).should("be.visible");

    // Navigate to the next image
    cy.get("#next_img").click();

    cy.wait(1000);
    // Check if the next image is displayed
    cy.get(
      '[style="width: 100%; max-width: 600px; height: 400px; overflow: hidden; border-radius: 30px; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 8px;"] > img'
    ).should("be.visible");
cy.wait(1000);
    cy.get("#next_img").click();

    // Check if the previous image is displayed
   cy.get(
     '[style="width: 100%; max-width: 600px; height: 400px; overflow: hidden; border-radius: 30px; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 8px;"] > img'
   ).should("be.visible");

  })
});
