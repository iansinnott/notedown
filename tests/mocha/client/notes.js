if (typeof MochaWeb !== 'undefined') {

/**
 * Integration tests for the Notes collection.
 */

var expect = chai.expect;

MochaWeb.testOnly(function(){
  describe("a group of tests", function(){
    it("Should respect equality", function(){
      chai.assert.equal(5,5);
    });

    it("Should run client-side tests.", function() {
      expect(false).to.be.true;
    });
  });

  describe("Notes 'CRUD'", function() {
    it("Should create notes");
    it("Should list notes");
    it("Notes should be editable");
    it("Notes should be archived (not deleted) when the 'X' is pressed.");
  });
});



}

