var expect = chai.expect;

if (typeof MochaWeb !== 'undefined') {
  MochaWeb.testOnly(function(){
    describe("Server initialization", function(){
      it("Should have a Meteor version defined", function(){
        chai.assert(Meteor.release);
      });

      it("Should use 'expect' as expected.", function() {
        expect(true).to.be.true;
      });
    });
  });
}
