var expect = chai.expect;

if (typeof MochaWeb !== 'undefined') {
  MochaWeb.testOnly(function(){
    describe("a group of tests", function(){
      it("Should respect equality", function(){
        chai.assert.equal(5,5);
      });

      it("Should run client-side tests.", function() {
        expect(true).to.be.true;
      });
    });
  });
}
