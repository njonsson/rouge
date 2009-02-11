Screw.Unit(function() {
  describe('Array', function() {
    describe('that is empty', function() {
      var _array = null;
      
      before(function() {
        _array = [];
      });
      
      describe('when sent #collect with a block', function() {
        it('should not yield', function() {
          var yieldedValues = [];
          _array.collect(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, []);
        });
        
        it('should return itself', function() {
          var returnValue = _array.collect(function(s) { });
          expect(returnValue).to(equal, _array);
        });
      });
      
      describe('when sent #detect with a block', function() {
        it('should not yield', function() {
          var yieldedValues = [];
          _array.detect(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, []);
        });
        
        it('should return null', function() {
          var returnValue = _array.detect(function(s) { return false; });
          expect(returnValue).to(be_null);
        });
        
        describe('and an "ifNone" argument', function() {
          var _ifNone = null;
          
          before(function() {
            _ifNone = function() { return 'nothing here'; };
          });
          
          it('should not yield', function() {
            var yieldedValues = [];
            _array.detect(_ifNone, function(s) {
              yieldedValues[yieldedValues.length] = arguments;
            });
            expect(yieldedValues).to(equal, []);
          });
          
          it('should return the expected value', function() {
            var returnValue = _array.detect(_ifNone, function(s) {
              return false;
            });
            expect(returnValue).to(equal, 'nothing here');
          });
        });
      });
      
      describe('when sent #each with a block', function() {
        it('should not yield', function() {
          var yieldedValues = [];
          _array.each(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, []);
        });
        
        it('should return itself', function() {
          var returnValue = _array.each(function(s) { });
          expect(returnValue).to(equal, _array);
        });
      });
      
      describe('when sent #eachWithIndex with a block', function() {
        it('should not yield', function() {
          var yieldedValues = [];
          _array.eachWithIndex(function(s, i) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, []);
        });
        
        it('should return itself', function() {
          var returnValue = _array.eachWithIndex(function(s, i) { });
          expect(returnValue).to(equal, _array);
        });
      });
      
      describe('when sent #find with a block', function() {
        it('should not yield', function() {
          var yieldedValues = [];
          _array.find(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, []);
        });
        
        it('should return null', function() {
          var returnValue = _array.find(function(s) { return false; });
          expect(returnValue).to(be_null);
        });
        
        describe('and an "ifNone" argument', function() {
          var _ifNone = null;
          
          before(function() {
            _ifNone = function() { return 'nothing here'; };
          });
          
          it('should not yield', function() {
            var yieldedValues = [];
            _array.find(_ifNone, function(s) {
              yieldedValues[yieldedValues.length] = arguments;
            });
            expect(yieldedValues).to(equal, []);
          });
          
          it('should return the expected value', function() {
            var returnValue = _array.find(_ifNone, function(s) {
              return false;
            });
            expect(returnValue).to(equal, 'nothing here');
          });
        });
      });
      
      describe('when sent #inject with a block', function() {
        it('should not yield', function() {
          var yieldedValues = [];
          _array.inject(function(memo, s) {
            yieldedValues[yieldedValues.length] = arguments;
            return memo;
          });
          expect(yieldedValues).to(equal, []);
        });
        
        it('should return null', function() {
          var returnValue = _array.inject(function(memo, s) { return memo; });
          expect(returnValue).to(be_null);
        });
        
        describe('and an "initial" argument', function() {
          var _initial = null;
          
          before(function() {
            _initial = 'nothing here';
          });
          
          it('should not yield', function() {
            var yieldedValues = [];
            _array.inject(_initial, function(memo, s) {
              yieldedValues[yieldedValues.length] = s;
              return memo;
            });
            expect(yieldedValues).to(equal, []);
          });
          
          it('should return the expected value', function() {
            var returnValue = _array.inject(_initial, function(memo, s) {
              return memo;
            });
            expect(returnValue).to(equal, 'nothing here');
          });
        });
      });
      
      describe('when sent #map with a block', function() {
        it('should not yield', function() {
          var yieldedValues = [];
          _array.map(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, []);
        });
        
        it('should return itself', function() {
          var returnValue = _array.map(function(s) { });
          expect(returnValue).to(equal, _array);
        });
      });
    });
    
    describe('with one element', function() {
      var _array = null;
      
      before(function() {
        _array = ['foo'];
      });
      
      describe('when sent #collect with a block', function() {
        it('should yield the element once', function() {
          var yieldedValues = [];
          _array.collect(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, [['foo']]);
        });
        
        it('should return an array containing the yielded value', function() {
          var returnValue = _array.collect(function(s) {
            return 'item: ' + s;
          });
          expect(returnValue).to(equal, ['item: foo']);
        });
      });
      
      describe('when sent #detect with a block', function() {
        it('should yield the element once', function() {
          var yieldedValues = [];
          _array.detect(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, [['foo']]);
        });
        
        it('should return the element when detecting', function() {
          var returnValue = _array.detect(function(s) {
            return s == 'foo';
          });
          expect(returnValue).to(equal, 'foo');
        });
        
        it('should return null when not detecting', function() {
          var returnValue = _array.detect(function(s) {
            return s == 'bizzle';
          });
          expect(returnValue).to(be_null);
        });
        
        describe('and an "ifNone" argument', function() {
          var _ifNone = null;
          
          before(function() {
            _ifNone = function(s) {
              return 'nothing here';
            };
          });
          
          it('should yield the element once', function() {
            var yieldedValues = [];
            _array.detect(_ifNone, function(s) {
              yieldedValues[yieldedValues.length] = arguments;
            });
            expect(yieldedValues).to(equal, [['foo']]);
          });
          
          it('should return the element when detecting', function() {
            var returnValue = _array.detect(_ifNone, function(s) {
              return s == 'foo';
            });
            expect(returnValue).to(equal, 'foo');
          });
          
          it('should return the expected value when not detecting', function() {
            var returnValue = _array.detect(_ifNone, function(s) {
              return s == 'bizzle';
            });
            expect(returnValue).to(equal, 'nothing here');
          });
        });
      });
      
      describe('when sent #each with a block', function() {
        it('should yield the element once', function() {
          var yieldedValues = [];
          _array.each(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, [['foo']]);
        });
        
        it('should return itself', function() {
          var returnValue = _array.each(function(s) { });
          expect(returnValue).to(equal, _array);
        });
      });
      
      describe('when sent #eachWithIndex with a block', function() {
        it('should yield the element and 0 once', function() {
          var yieldedValues = [];
          _array.eachWithIndex(function(s, i) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, [['foo', 0]]);
        });
        
        it('should return itself', function() {
          var returnValue = _array.eachWithIndex(function(s, i) { });
          expect(returnValue).to(equal, _array);
        });
      });
      
      describe('when sent #find with a block', function() {
        it('should yield the element once', function() {
          var yieldedValues = [];
          _array.find(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, [['foo']]);
        });
        
        it('should return the element when finding', function() {
          var returnValue = _array.find(function(s) {
            return s == 'foo';
          });
          expect(returnValue).to(equal, 'foo');
        });
        
        it('should return null when not finding', function() {
          var returnValue = _array.find(function(s) {
            return s == 'bizzle';
          });
          expect(returnValue).to(be_null);
        });
        
        describe('and an "ifNone" argument', function() {
          var _ifNone = null;
          
          before(function() {
            _ifNone = function(s) {
              return 'nothing here';
            };
          });
          
          it('should yield the element once', function() {
            var yieldedValues = [];
            _array.find(_ifNone, function(s) {
              yieldedValues[yieldedValues.length] = arguments;
            });
            expect(yieldedValues).to(equal, [['foo']]);
          });
          
          it('should return the element when finding', function() {
            var returnValue = _array.find(_ifNone, function(s) {
              return s == 'foo';
            });
            expect(returnValue).to(equal, 'foo');
          });
          
          it('should return the expected value when not finding', function() {
            var returnValue = _array.find(_ifNone, function(s) {
              return s == 'bizzle';
            });
            expect(returnValue).to(equal, 'nothing here');
          });
        });
      });
      
      describe('when sent #inject with a block', function() {
        it('should not yield', function() {
          var yieldedValues = [];
          _array.inject(function(memo, s) {
            yieldedValues[yieldedValues.length] = arguments;
            return memo;
          });
          expect(yieldedValues).to(equal, []);
        });
        
        it('should return the element', function() {
          var returnValue = _array.inject(function(memo, s) { return memo; });
          expect(returnValue).to(equal, 'foo');
        });
        
        describe('and an "initial" argument', function() {
          var _initial = null;
          
          before(function() {
            _initial = 'nothing here';
          });
          
          it('should yield the expected memo and the element once', function() {
            var yieldedValues = [];
            _array.inject(_initial, function(memo, s) {
              yieldedValues[yieldedValues.length] = arguments;
              return memo;
            });
            expect(yieldedValues).to(equal, [['nothing here', 'foo']]);
          });
          
          it('should return the expected value', function() {
            var returnValue = _array.inject(_initial, function(memo, s) {
              return memo;
            });
            expect(returnValue).to(equal, 'nothing here');
          });
        });
      });
      
      describe('when sent #map with a block', function() {
        it('should yield the element once', function() {
          var yieldedValues = [];
          _array.map(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, [['foo']]);
        });
        
        it('should return an array containing the yielded value', function() {
          var returnValue = _array.map(function(s) {
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
      
      describe('when sent #collect with a block', function() {
        it('should yield the elements once each', function() {
          var yieldedValues = [];
          _array.collect(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, [['foo'], ['bar']]);
        });
        
        it('should return an array of the yielded values', function() {
          var returnValue = _array.collect(function(s) {
            return 'item: ' + s;
          });
          expect(returnValue).to(equal, ['item: foo', 'item: bar']);
        });
      });
      
      describe('when sent #detect with a block', function() {
        it('should yield the elements once each', function() {
          var yieldedValues = [];
          _array.detect(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, [['foo'], ['bar']]);
        });
        
        it('should return the detected element when detecting', function() {
          var returnValue = _array.detect(function(s) {
            return s == 'foo';
          });
          expect(returnValue).to(equal, 'foo');
        });
        
        it('should return null when not detecting', function() {
          var returnValue = _array.detect(function(s) {
            return s == 'bizzle';
          });
          expect(returnValue).to(be_null);
        });
        
        describe('and an "ifNone" argument', function() {
          var _ifNone = null;
          
          before(function() {
            _ifNone = function(s) {
              return 'nothing here';
            };
          });
          
          it('should yield the elements once each', function() {
            var yieldedValues = [];
            _array.detect(_ifNone, function(s) {
              yieldedValues[yieldedValues.length] = arguments;
            });
            expect(yieldedValues).to(equal, [['foo'], ['bar']]);
          });
          
          it('should return the detected element when detecting', function() {
            var returnValue = _array.detect(_ifNone, function(s) {
              return s == 'foo';
            });
            expect(returnValue).to(equal, 'foo');
          });
          
          it('should return the expected value when not detecting', function() {
            var returnValue = _array.detect(_ifNone, function(s) {
              return s == 'bizzle';
            });
            expect(returnValue).to(equal, 'nothing here');
          });
        });
      });
      
      describe('when sent #each with a block', function() {
        it('should yield the elements once each', function() {
          var yieldedValues = [];
          _array.each(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, [['foo'], ['bar']]);
        });
        
        it('should return itself', function() {
          var returnValue = _array.each(function(s) { });
          expect(returnValue).to(equal, _array);
        });
      });
      
      describe('when sent #eachWithIndex with a block', function() {
        it('should yield the elements and their indexes once each', function() {
          var yieldedValues = [];
          _array.eachWithIndex(function(s, i) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, [['foo', 0], ['bar', 1]]);
        });
        
        it('should return itself', function() {
          var returnValue = _array.eachWithIndex(function(s, i) { });
          expect(returnValue).to(equal, _array);
        });
      });
      
      describe('when sent #find with a block', function() {
        it('should yield the elements once each', function() {
          var yieldedValues = [];
          _array.find(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, [['foo'], ['bar']]);
        });
        
        it('should return the found element when finding', function() {
          var returnValue = _array.find(function(s) {
            return s == 'foo';
          });
          expect(returnValue).to(equal, 'foo');
        });
        
        it('should return null when not finding', function() {
          var returnValue = _array.find(function(s) {
            return s == 'bizzle';
          });
          expect(returnValue).to(be_null);
        });
        
        describe('and an "ifNone" argument', function() {
          var _ifNone = null;
          
          before(function() {
            _ifNone = function(s) {
              return 'nothing here';
            };
          });
          
          it('should yield the elements once each', function() {
            var yieldedValues = [];
            _array.find(_ifNone, function(s) {
              yieldedValues[yieldedValues.length] = arguments;
            });
            expect(yieldedValues).to(equal, [['foo'], ['bar']]);
          });
          
          it('should return the found element when finding', function() {
            var returnValue = _array.find(_ifNone, function(s) {
              return s == 'foo';
            });
            expect(returnValue).to(equal, 'foo');
          });
          
          it('should return the expected value when not finding', function() {
            var returnValue = _array.find(_ifNone, function(s) {
              return s == 'bizzle';
            });
            expect(returnValue).to(equal, 'nothing here');
          });
        });
      });
      
      describe('when sent #inject with a block', function() {
        it('should yield once the first and the second elements', function() {
          var yieldedValues = [];
          _array.inject(function(memo, s) {
            yieldedValues[yieldedValues.length] = arguments;
            return memo;
          });
          expect(yieldedValues).to(equal, [['foo', 'bar']]);
        });
        
        it('should return the first element', function() {
          var returnValue = _array.inject(function(memo, s) { return memo; });
          expect(returnValue).to(equal, 'foo');
        });
        
        describe('and an "initial" argument', function() {
          var _initial = null;
          
          before(function() {
            _initial = 'nothing here';
          });
          
          it('should yield the expected memo and the elements once each', function() {
            var yieldedValues = [];
            _array.inject(_initial, function(memo, s) {
              yieldedValues[yieldedValues.length] = arguments;
              return memo;
            });
            expect(yieldedValues).to(equal,
                                     [['nothing here', 'foo'],
                                      ['nothing here', 'bar']]);
          });
          
          it('should return the expected value', function() {
            var returnValue = _array.inject(_initial, function(memo, s) {
              return memo;
            });
            expect(returnValue).to(equal, 'nothing here');
          });
        });
      });
      
      describe('when sent #map with a block', function() {
        it('should yield the elements once each', function() {
          var yieldedValues = [];
          _array.map(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, [['foo'], ['bar']]);
        });
        
        it('should return an array of the yielded values', function() {
          var returnValue = _array.map(function(s) {
            return 'item: ' + s;
          });
          expect(returnValue).to(equal, ['item: foo', 'item: bar']);
        });
      });
    });
  });
});
