Screw.Unit(function() {
  describe('Array', function() {
    describe('class', function() {
      describe('when sent ::new with no arguments', function() {
        function doNew() {
          return doMethod('new', {'on': Array});
        }
        
        it('should return an empty array', function() {
          expect(doNew().returnValue).to(be_empty);
        });
      });
      
      describe('when sent ::new with 0', function() {
        function doNewPassing0() {
          return doMethod('new', {'on': Array, 'with': 0});
        }
        
        it('should return an empty array', function() {
          expect(doNewPassing0().returnValue).to(be_empty);
        });
      });
      
      describe('when sent ::new with 1', function() {
        function doNewPassing1() {
          return doMethod('new', {'on': Array, 'with': 1});
        }
        
        it('should return an array containing a null value', function() {
          expect(doNewPassing1().returnValue).to(equal, [null]);
        });
      });
      
      describe('when sent ::new with 2 and a non-null value', function() {
        function doNewPassing2AndNonnull() {
          return doMethod('new', {'on': Array, 'with': [2, 'foo']});
        }
        
        it('should return an array containing two copies of the value', function() {
          expect(doNewPassing2AndNonnull().returnValue).to(equal,
                                                           ['foo', 'foo']);
        });
      });
      
      describe('when sent ::new with 0 and a block', function() {
        function doNewPassing0AndBlock() {
          return doMethod('new',
                          {'on': Array,
                           'with': [0, function(i) { return 'item ' + i; }]});
        }
        
        it('should not yield', function() {
          expect(doNewPassing0AndBlock().callbacks[0]).to(be_empty);
        });
        
        it('should return an empty array', function() {
          expect(doNewPassing0AndBlock().returnValue).to(be_empty);
        });
      });
      
      describe('when sent ::new with 2 and a block', function() {
        function doNewPassing2AndBlock() {
          return doMethod('new',
                          {'on': Array,
                           'with': [2, function(i) { return 'item ' + i; }]});
        }
        
        it('should yield twice', function() {
          expect(doNewPassing2AndBlock().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doNewPassing2AndBlock().callbacks[0][0].this).to(equal, Array);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doNewPassing2AndBlock().callbacks[0][1].this).to(equal, Array);
        });
        
        it('should yield 0 the first time', function() {
          expect(doNewPassing2AndBlock().callbacks[0][0].arguments).to(equal,
                                                                       [0]);
        });
        
        it('should yield 1 the second time', function() {
          expect(doNewPassing2AndBlock().callbacks[0][1].arguments).to(equal,
                                                                       [1]);
        });
        
        it('should return an array containing the return values of the block', function() {
          expect(doNewPassing2AndBlock().returnValue).to(equal,
                                                         ['item 0', 'item 1']);
        });
      });
      
      describe('when sent ::new with an array', function() {
        var arg_ = null;
        
        function doNewPassingArray() {
          arg_ = ['foo', 'bar', 'baz'];
          return doMethod('new', {'on': Array, 'with': [arg_]});
        }
        
        it('should return an equivalent array', function() {
          expect(doNewPassingArray().returnValue).to(equal,
                                                     ['foo', 'bar', 'baz']);
        });
        
        it('should return a copy of the array, not the array itself', function() {
          expect(doNewPassingArray().returnValue === arg_).to(be_false);
        });
      });
    });
  });
});
