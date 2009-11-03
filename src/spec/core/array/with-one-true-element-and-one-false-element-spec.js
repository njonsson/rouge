Screw.Unit(function() {
  describe('Array', function() {
    describe('with one true element and one false element', function() {
      var array_ = null;
      
      before(function() {
        array_ = [true, false];
      });
      
      describe('when sent #all? without a block', function() {
        function doAllHUHNoBlock() {
          return doMethod('all?', {'on': array_});
        }
        
        it('should return false', function() {
          expect(doAllHUHNoBlock().returnValue).to(be_false);
        });
        
        it('should not mutate itself', function() {
          doAllHUHNoBlock();
          expect(array_).to(equal, [true, false]);
        });
      });
      
      describe('when sent #any? without a block', function() {
        function doAnyHUHNoBlock() {
          return doMethod('any?', {'on': array_});
        }
        
        it('should return true', function() {
          expect(doAnyHUHNoBlock().returnValue).to(be_true);
        });
        
        it('should not mutate itself', function() {
          doAnyHUHNoBlock();
          expect(array_).to(equal, [true, false]);
        });
      });
      
      describe('when sent #areAll without a block', function() {
        function doAreAllNoBlock() {
          return doMethod('areAll', {'on': array_});
        }
        
        it('should return false', function() {
          expect(doAreAllNoBlock().returnValue).to(be_false);
        });
        
        it('should not mutate itself', function() {
          doAreAllNoBlock();
          expect(array_).to(equal, [true, false]);
        });
      });
      
      describe('when sent #isAny without a block', function() {
        function doIsAnyNoBlock() {
          return doMethod('isAny', {'on': array_});
        }
        
        it('should return true', function() {
          expect(doIsAnyNoBlock().returnValue).to(be_true);
        });
        
        it('should not mutate itself', function() {
          doIsAnyNoBlock();
          expect(array_).to(equal, [true, false]);
        });
      });
    });
  });
});
