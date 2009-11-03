Screw.Unit(function() {
  describe('Array', function() {
    describe('with one non-null element', function() {
      var array_ = null;
      
      before(function() {
        array_ = ['foo'];
      });
      
      describe('when sent #eachCons with 1 and a block', function() {
        function doEachCons() {
          return doMethod('eachCons',
                          {'on': array_, 'with': [1, function(s) { }]});
        }
        
        it('should yield once', function() {
          expect(doEachCons().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doEachCons().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the element in an array', function() {
          expect(doEachCons().callbacks[0][0].arguments).to(equal, [['foo']]);
        });
        
        it('should not mutate itself', function() {
          doEachCons();
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #eachCons with 2 and a block', function() {
        function doEachCons() {
          return doMethod('eachCons',
                          {'on': array_, 'with': [2, function(s) { }]});
        }
        
        it('should not yield', function() {
          expect(doEachCons().callbacks[0]).to(be_empty);
        });
        
        it('should not mutate itself', function() {
          doEachCons();
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #eachSlice with 1 and a block', function() {
        function doEachSlice() {
          return doMethod('eachSlice',
                          {'on': array_, 'with': [1, function(s) { }]});
        }
        
        it('should yield once', function() {
          expect(doEachSlice().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doEachSlice().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the element in an array', function() {
          expect(doEachSlice().callbacks[0][0].arguments).to(equal, [['foo']]);
        });
        
        it('should not mutate itself', function() {
          doEachSlice();
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #eachSlice with 2 and a block', function() {
        function doEachSlice() {
          return doMethod('eachSlice',
                          {'on': array_, 'with': [2, function(s) { }]});
        }
        
        it('should yield once', function() {
          expect(doEachSlice().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doEachSlice().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the element in an array', function() {
          expect(doEachSlice().callbacks[0][0].arguments).to(equal, [['foo']]);
        });
        
        it('should not mutate itself', function() {
          doEachSlice();
          expect(array_).to(equal, ['foo']);
        });
      });
    });
  });
});
