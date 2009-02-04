Screw.Unit(function() {
  describe('Array', function() {
    describe('that is empty', function() {
      var _array = null;
      
      before(function() {
        _array = [];
      });
      
      describe('when sent #each', function() {
        it('should not yield', function() {
          var yieldedValues = [];
          _array.each(function(s) {
            yieldedValues[yieldedValues.length] = s;
          });
          expect(yieldedValues).to(equal, []);
        });
        
        it('should return itself', function() {
          var returnValue = _array.each(function(s) { });
          expect(returnValue).to(equal, _array);
        });
      });
      
      describe('when sent #eachWithIndex', function() {
        it('should not yield', function() {
          var yieldedValues = {};
          _array.eachWithIndex(function(s, i) {
            yieldedValues[i] = s;
          });
          expect(yieldedValues).to(equal, {});
        });
        
        it('should return itself', function() {
          var returnValue = _array.eachWithIndex(function(s, i) { });
          expect(returnValue).to(equal, _array);
        });
      });
      
      describe('when sent #collect', function() {
        it('should not yield', function() {
          var yieldedValues = [];
          _array.collect(function(s) {
            yieldedValues[yieldedValues.length] = s;
          });
          expect(yieldedValues).to(equal, []);
        });
        
        it('should return itself', function() {
          var returnValue = _array.collect(function(s) { });
          expect(returnValue).to(equal, _array);
        });
      });
    });
    
    describe('with one element', function() {
      var _array = null;
      
      before(function() {
        _array = ['foo'];
      });
      
      describe('when sent #each', function() {
        it('with no arguments should throw TypeError', function() {
          var error = null;
          try {
            _array.each();
          } catch (e) {
            error = e;
          }
          expect(error instanceof TypeError).to(be_true);
        });
        
        it('with a non-function argument should throw TypeError', function() {
          var error = null;
          try {
            _array.each('bizzle');
          } catch (e) {
            error = e;
          }
          expect(error instanceof TypeError).to(be_true);
        });
        
        it('should yield element once', function() {
          var yieldedValues = [];
          _array.each(function(s) {
            yieldedValues[yieldedValues.length] = s;
          });
          expect(yieldedValues).to(equal, ['foo']);
        });
        
        it('should return itself', function() {
          var returnValue = _array.each(function(s) { });
          expect(returnValue).to(equal, _array);
        });
      });
      
      describe('when sent #eachWithIndex', function() {
        it('with no arguments should throw TypeError', function() {
          var error = null;
          try {
            _array.eachWithIndex();
          } catch (e) {
            error = e;
          }
          expect(error instanceof TypeError).to(be_true);
        });
        
        it('with a non-function argument should throw TypeError', function() {
          var error = null;
          try {
            _array.eachWithIndex('bizzle');
          } catch (e) {
            error = e;
          }
          expect(error instanceof TypeError).to(be_true);
        });
        
        it('should yield element and 0 once', function() {
          var yieldedValues = [];
          _array.eachWithIndex(function(s, i) {
            yieldedValues[yieldedValues.length] = [s, i];
          });
          expect(yieldedValues).to(equal, [['foo', 0]]);
        });
        
        it('should return itself', function() {
          var returnValue = _array.eachWithIndex(function(s, i) { });
          expect(returnValue).to(equal, _array);
        });
      });
      
      describe('when sent #collect', function() {
        it('with no arguments should throw TypeError', function() {
          var error = null;
          try {
            _array.collect();
          } catch (e) {
            error = e;
          }
          expect(error instanceof TypeError).to(be_true);
        });
        
        it('with a non-function argument should throw TypeError', function() {
          var error = null;
          try {
            _array.collect('bizzle');
          } catch (e) {
            error = e;
          }
          expect(error instanceof TypeError).to(be_true);
        });
        
        it('should yield element once', function() {
          var yieldedValues = [];
          _array.collect(function(s) {
            yieldedValues[yieldedValues.length] = s;
          });
          expect(yieldedValues).to(equal, ['foo']);
        });
        
        it('should return array of yielded value', function() {
          var returnValue = _array.collect(function(s) {
            return 'item: ' + s;
          });
          expect(returnValue).to(equal, ['item: foo']);
        });
      });
    });
    
    describe('with two elements', function() {
      var _array = null;
      
      before(function() {
        _array = ['foo', 'bar'];
      });
      
      describe('when sent #each', function() {
        it('with no arguments should throw TypeError', function() {
          var error = null;
          try {
            _array.each();
          } catch (e) {
            error = e;
          }
          expect(error instanceof TypeError).to(be_true);
        });
        
        it('with a non-function argument should throw TypeError', function() {
          var error = null;
          try {
            _array.each('bizzle');
          } catch (e) {
            error = e;
          }
          expect(error instanceof TypeError).to(be_true);
        });
        
        it('should yield elements once each', function() {
          var yieldedValues = [];
          _array.each(function(s) {
            yieldedValues[yieldedValues.length] = s;
          });
          expect(yieldedValues).to(equal, ['foo', 'bar']);
        });
        
        it('should return itself', function() {
          var returnValue = _array.each(function(s) { });
          expect(returnValue).to(equal, _array);
        });
      });
      
      describe('when sent #eachWithIndex', function() {
        it('with no arguments should throw TypeError', function() {
          var error = null;
          try {
            _array.eachWithIndex();
          } catch (e) {
            error = e;
          }
          expect(error instanceof TypeError).to(be_true);
        });
        
        it('with a non-function argument should throw TypeError', function() {
          var error = null;
          try {
            _array.eachWithIndex('bizzle');
          } catch (e) {
            error = e;
          }
          expect(error instanceof TypeError).to(be_true);
        });
        
        it('should yield elements and their indexes once each', function() {
          var yieldedValues = [];
          _array.eachWithIndex(function(s, i) {
            yieldedValues[yieldedValues.length] = [s, i];
          });
          expect(yieldedValues).to(equal, [['foo', 0], ['bar', 1]]);
        });
        
        it('should return itself', function() {
          var returnValue = _array.eachWithIndex(function(s, i) { });
          expect(returnValue).to(equal, _array);
        });
      });
      
      describe('when sent #collect', function() {
        it('with no arguments should throw TypeError', function() {
          var error = null;
          try {
            _array.collect();
          } catch (e) {
            error = e;
          }
          expect(error instanceof TypeError).to(be_true);
        });
        
        it('with a non-function argument should throw TypeError', function() {
          var error = null;
          try {
            _array.collect('bizzle');
          } catch (e) {
            error = e;
          }
          expect(error instanceof TypeError).to(be_true);
        });
        
        it('should yield elements once each', function() {
          var yieldedValues = [];
          _array.collect(function(s) {
            yieldedValues[yieldedValues.length] = s;
          });
          expect(yieldedValues).to(equal, ['foo', 'bar']);
        });
        
        it('should return an array of yielded values', function() {
          var returnValue = _array.collect(function(s) {
            return 'item: ' + s;
          });
          expect(returnValue).to(equal, ['item: foo', 'item: bar']);
        });
      });
    });
  });
});
