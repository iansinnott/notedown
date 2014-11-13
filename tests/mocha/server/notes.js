if (typeof MochaWeb !== 'undefined') {

/**
 * Notes crud.
 */

var expect = chai.expect;

MochaWeb.testOnly(function(){
  describe("Server initialization", function(){
    it("Should have a Meteor version defined", function(){
      chai.assert(Meteor.release);
    });
  });

  describe("Notes CRUD", function(){
    it("Should create notes", function() {
      expect(true).to.be.true;
    });
    it.skip("Should update notes");
    it.skip("Should archive notes");
    it.skip("Should restore notes once archived");
    it.skip("Should delete archived notes");
  });


});




}

