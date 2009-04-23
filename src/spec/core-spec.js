Screw.Unit(function() {
  describe('Array', function() {
    describe('that is empty', function() {
      var _array = null;
      
      before(function() {
        _array = [];
      });
      
      describe('when sent #collect with a block', function() {
        function doCollect() {
          return _array.collect.apply(_array, arguments);
        }
        
        it('should not yield', function() {
          var yieldedValues = [];
          doCollect(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, []);
        });
        
        it('should return itself', function() {
          var returnValue = doCollect(function(s) { });
          expect(returnValue).to(equal, _array);
        });
        
        it('should not mutate itself', function() {
          doCollect(function(s) { });
          expect(_array).to(equal, []);
        });
      });
      
      describe('when sent #collectThis with a block', function() {
        function doCollectThis() {
          return _array.collectThis.apply(_array, arguments);
        }
        
        it('should not yield', function() {
          var yieldedValues = [];
          doCollectThis(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, []);
        });
        
        it('should return itself', function() {
          var returnValue = doCollectThis(function(s) { });
          expect(returnValue).to(equal, _array);
        });
        
        it('should not mutate itself', function() {
          doCollectThis(function(s) { });
          expect(_array).to(equal, []);
        });
      });
      
      describe('when sent #detect with a block', function() {
        function doDetect() {
          return _array.detect.apply(_array, arguments);
        }
        
        it('should not yield', function() {
          var yieldedValues = [];
          doDetect(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, []);
        });
        
        it('should return null', function() {
          var returnValue = doDetect(function(s) { return false; });
          expect(returnValue).to(be_null);
        });
        
        it('should not mutate itself', function() {
          doDetect(function(s) {
            return false;
          });
          expect(_array).to(equal, []);
        });
        
        describe('and an "ifNone" argument', function() {
          var _ifNone = null;
          
          before(function() {
            _ifNone = function() { return 'nothing here'; };
          });
          
          it('should not yield', function() {
            var yieldedValues = [];
            doDetect(_ifNone, function(s) {
              yieldedValues[yieldedValues.length] = arguments;
            });
            expect(yieldedValues).to(equal, []);
          });
          
          it('should return the expected value', function() {
            var returnValue = doDetect(_ifNone, function(s) {
              return false;
            });
            expect(returnValue).to(equal, 'nothing here');
          });
          
          it('should not mutate itself', function() {
            doDetect(_ifNone, function(s) {
              return false;
            });
            expect(_array).to(equal, []);
          });
        });
      });
      
      describe('when sent #each with a block', function() {
        function doEach() {
          return _array.each.apply(_array, arguments);
        }
        
        it('should not yield', function() {
          var yieldedValues = [];
          doEach(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, []);
        });
        
        it('should return itself', function() {
          var returnValue = doEach(function(s) { });
          expect(returnValue).to(equal, _array);
        });
        
        it('should not mutate itself', function() {
          doEach(function(s) { });
          expect(_array).to(equal, []);
        });
      });
      
      describe('when sent #eachWithIndex with a block', function() {
        function doEachWithIndex() {
          return _array.eachWithIndex.apply(_array, arguments);
        }
        
        it('should not yield', function() {
          var yieldedValues = [];
          doEachWithIndex(function(s, i) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, []);
        });
        
        it('should return itself', function() {
          var returnValue = doEachWithIndex(function(s, i) { });
          expect(returnValue).to(equal, _array);
        });
        
        it('should not mutate itself', function() {
          doEachWithIndex(function(s) { });
          expect(_array).to(equal, []);
        });
      });
      
      describe('when sent #find with a block', function() {
        function doFind() {
          return _array.find.apply(_array, arguments);
        }
        
        it('should not yield', function() {
          var yieldedValues = [];
          doFind(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, []);
        });
        
        it('should return null', function() {
          var returnValue = doFind(function(s) { return false; });
          expect(returnValue).to(be_null);
        });
        
        it('should not mutate itself', function() {
          doFind(function(s) { return false; });
          expect(_array).to(equal, []);
        });
        
        describe('and an "ifNone" argument', function() {
          var _ifNone = null;
          
          before(function() {
            _ifNone = function() { return 'nothing here'; };
          });
          
          it('should not yield', function() {
            var yieldedValues = [];
            doFind(_ifNone, function(s) {
              yieldedValues[yieldedValues.length] = arguments;
            });
            expect(yieldedValues).to(equal, []);
          });
          
          it('should return the expected value', function() {
            var returnValue = doFind(_ifNone, function(s) {
              return false;
            });
            expect(returnValue).to(equal, 'nothing here');
          });
        
          it('should not mutate itself', function() {
            doFind(_ifNone, function(s) { return false; });
            expect(_array).to(equal, []);
          });
        });
      });
      
      describe('when sent #inject with a block', function() {
        function doInject() {
          return _array.inject.apply(_array, arguments);
        }
        
        it('should not yield', function() {
          var yieldedValues = [];
          doInject(function(memo, s) {
            yieldedValues[yieldedValues.length] = arguments;
            return memo;
          });
          expect(yieldedValues).to(equal, []);
        });
        
        it('should return null', function() {
          var returnValue = doInject(function(memo, s) { return memo; });
          expect(returnValue).to(be_null);
        });
        
        it('should not mutate itself', function() {
          doInject(function(memo, s) { return memo; });
          expect(_array).to(equal, []);
        });
        
        describe('and an "initial" argument', function() {
          var _initial = null;
          
          before(function() {
            _initial = 'nothing here';
          });
          
          it('should not yield', function() {
            var yieldedValues = [];
            doInject(_initial, function(memo, s) {
              yieldedValues[yieldedValues.length] = s;
              return memo;
            });
            expect(yieldedValues).to(equal, []);
          });
          
          it('should return the expected value', function() {
            var returnValue = doInject(_initial, function(memo, s) {
              return memo;
            });
            expect(returnValue).to(equal, 'nothing here');
          });
          
          it('should not mutate itself', function() {
            doInject(_initial, function(memo, s) { return memo; });
            expect(_array).to(equal, []);
          });
        });
      });
      
      describe('when sent #map with a block', function() {
        function doMap() {
          return _array.map.apply(_array, arguments);
        }
        
        it('should not yield', function() {
          var yieldedValues = [];
          doMap(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, []);
        });
        
        it('should return itself', function() {
          var returnValue = doMap(function(s) { });
          expect(returnValue).to(equal, _array);
        });
        
        it('should not mutate itself', function() {
          doMap(function(s) { });
          expect(_array).to(equal, []);
        });
      });
    });
    
    describe('with one element', function() {
      var _array = null;
      
      before(function() {
        _array = ['foo'];
      });
      
      describe('when sent #collect with a block', function() {
        function doCollect() {
          return _array.collect.apply(_array, arguments);
        }
        
        it('should yield the element once', function() {
          var yieldedValues = [];
          doCollect(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, [['foo']]);
        });
        
        it('should return an array containing the yielded value', function() {
          var returnValue = doCollect(function(s) {
            return 'item: ' + s;
          });
          expect(returnValue).to(equal, ['item: foo']);
        });
      });
      
      describe('when sent #collectThis with a block', function() {
        function doCollectThis() {
          return _array.collectThis.apply(_array, arguments);
        }
        
        it('should yield the element once', function() {
          var yieldedValues = [];
          doCollectThis(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, [['foo']]);
        });
        
        it('should return itself', function() {
          var returnValue = doCollectThis(function(s) { });
          expect(returnValue).to(equal, _array);
        });
        
        it('should mutate itself as expected', function() {
          doCollectThis(function(s) {
            return 'item: ' + s;
          });
          expect(_array).to(equal, ['item: foo']);
        });
      });
      
      describe('when sent #detect with a block', function() {
        function doDetect() {
          return _array.detect.apply(_array, arguments);
        }
        
        it('should yield the element once', function() {
          var yieldedValues = [];
          doDetect(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, [['foo']]);
        });
        
        it('should return the element when detecting', function() {
          var returnValue = doDetect(function(s) {
            return s == 'foo';
          });
          expect(returnValue).to(equal, 'foo');
        });
        
        it('should return null when not detecting', function() {
          var returnValue = doDetect(function(s) {
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
            doDetect(_ifNone, function(s) {
              yieldedValues[yieldedValues.length] = arguments;
            });
            expect(yieldedValues).to(equal, [['foo']]);
          });
          
          it('should return the element when detecting', function() {
            var returnValue = doDetect(_ifNone, function(s) {
              return s == 'foo';
            });
            expect(returnValue).to(equal, 'foo');
          });
          
          it('should return the expected value when not detecting', function() {
            var returnValue = doDetect(_ifNone, function(s) {
              return s == 'bizzle';
            });
            expect(returnValue).to(equal, 'nothing here');
          });
        });
      });
      
      describe('when sent #each with a block', function() {
        function doEach() {
          return _array.each.apply(_array, arguments);
        }
        
        it('should yield the element once', function() {
          var yieldedValues = [];
          doEach(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, [['foo']]);
        });
        
        it('should return itself', function() {
          var returnValue = doEach(function(s) { });
          expect(returnValue).to(equal, _array);
        });
      });
      
      describe('when sent #eachWithIndex with a block', function() {
        function doEachWithIndex() {
          return _array.eachWithIndex.apply(_array, arguments);
        }
        
        it('should yield the element and 0 once', function() {
          var yieldedValues = [];
          doEachWithIndex(function(s, i) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, [['foo', 0]]);
        });
        
        it('should return itself', function() {
          var returnValue = doEachWithIndex(function(s, i) { });
          expect(returnValue).to(equal, _array);
        });
      });
      
      describe('when sent #find with a block', function() {
        function doFind() {
          return _array.find.apply(_array, arguments);
        }
        
        it('should yield the element once', function() {
          var yieldedValues = [];
          doFind(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, [['foo']]);
        });
        
        it('should return the element when finding', function() {
          var returnValue = doFind(function(s) {
            return s == 'foo';
          });
          expect(returnValue).to(equal, 'foo');
        });
        
        it('should return null when not finding', function() {
          var returnValue = doFind(function(s) {
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
            doFind(_ifNone, function(s) {
              yieldedValues[yieldedValues.length] = arguments;
            });
            expect(yieldedValues).to(equal, [['foo']]);
          });
          
          it('should return the element when finding', function() {
            var returnValue = doFind(_ifNone, function(s) {
              return s == 'foo';
            });
            expect(returnValue).to(equal, 'foo');
          });
          
          it('should return the expected value when not finding', function() {
            var returnValue = doFind(_ifNone, function(s) {
              return s == 'bizzle';
            });
            expect(returnValue).to(equal, 'nothing here');
          });
        });
      });
      
      describe('when sent #inject with a block', function() {
        function doInject() {
          return _array.inject.apply(_array, arguments);
        }
        
        it('should not yield', function() {
          var yieldedValues = [];
          doInject(function(memo, s) {
            yieldedValues[yieldedValues.length] = arguments;
            return memo;
          });
          expect(yieldedValues).to(equal, []);
        });
        
        it('should return the element', function() {
          var returnValue = doInject(function(memo, s) { return memo; });
          expect(returnValue).to(equal, 'foo');
        });
        
        describe('and an "initial" argument', function() {
          var _initial = null;
          
          before(function() {
            _initial = 'nothing here';
          });
          
          it('should yield the expected memo and the element once', function() {
            var yieldedValues = [];
            doInject(_initial, function(memo, s) {
              yieldedValues[yieldedValues.length] = arguments;
              return memo;
            });
            expect(yieldedValues).to(equal, [['nothing here', 'foo']]);
          });
          
          it('should return the expected value', function() {
            var returnValue = doInject(_initial, function(memo, s) {
              return memo;
            });
            expect(returnValue).to(equal, 'nothing here');
          });
        });
      });
      
      describe('when sent #map with a block', function() {
        function doMap() {
          return _array.map.apply(_array, arguments);
        }
        
        it('should yield the element once', function() {
          var yieldedValues = [];
          doMap(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, [['foo']]);
        });
        
        it('should return an array containing the yielded value', function() {
          var returnValue = doMap(function(s) {
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
        function doCollect() {
          return _array.collect.apply(_array, arguments);
        }
        
        it('should yield the elements once each', function() {
          var yieldedValues = [];
          doCollect(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, [['foo'], ['bar']]);
        });
        
        it('should return an array of the yielded values', function() {
          var returnValue = doCollect(function(s) {
            return 'item: ' + s;
          });
          expect(returnValue).to(equal, ['item: foo', 'item: bar']);
        });
      });
      
      describe('when sent #collectThis with a block', function() {
        function doCollectThis() {
          return _array.collectThis.apply(_array, arguments);
        }
        
        it('should yield the element once each', function() {
          var yieldedValues = [];
          doCollectThis(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, [['foo'], ['bar']]);
        });
        
        it('should return itself', function() {
          var returnValue = doCollectThis(function(s) { });
          expect(returnValue).to(equal, _array);
        });
        
        it('should mutate itself as expected', function() {
          doCollectThis(function(s) {
            return 'item: ' + s;
          });
          expect(_array).to(equal, ['item: foo', 'item: bar']);
        });
      });
      
      describe('when sent #detect with a block', function() {
        function doDetect() {
          return _array.detect.apply(_array, arguments);
        }
        
        it('should yield the elements once each', function() {
          var yieldedValues = [];
          doDetect(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, [['foo'], ['bar']]);
        });
        
        it('should return the detected element when detecting', function() {
          var returnValue = doDetect(function(s) {
            return s == 'foo';
          });
          expect(returnValue).to(equal, 'foo');
        });
        
        it('should return null when not detecting', function() {
          var returnValue = doDetect(function(s) {
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
            doDetect(_ifNone, function(s) {
              yieldedValues[yieldedValues.length] = arguments;
            });
            expect(yieldedValues).to(equal, [['foo'], ['bar']]);
          });
          
          it('should return the detected element when detecting', function() {
            var returnValue = doDetect(_ifNone, function(s) {
              return s == 'foo';
            });
            expect(returnValue).to(equal, 'foo');
          });
          
          it('should return the expected value when not detecting', function() {
            var returnValue = doDetect(_ifNone, function(s) {
              return s == 'bizzle';
            });
            expect(returnValue).to(equal, 'nothing here');
          });
        });
      });
      
      describe('when sent #each with a block', function() {
        function doEach() {
          return _array.each.apply(_array, arguments);
        }
        
        it('should yield the elements once each', function() {
          var yieldedValues = [];
          doEach(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, [['foo'], ['bar']]);
        });
        
        it('should return itself', function() {
          var returnValue = doEach(function(s) { });
          expect(returnValue).to(equal, _array);
        });
      });
      
      describe('when sent #eachWithIndex with a block', function() {
        function doEachWithIndex() {
          return _array.eachWithIndex.apply(_array, arguments);
        }
        
        it('should yield the elements and their indexes once each', function() {
          var yieldedValues = [];
          doEachWithIndex(function(s, i) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, [['foo', 0], ['bar', 1]]);
        });
        
        it('should return itself', function() {
          var returnValue = doEachWithIndex(function(s, i) { });
          expect(returnValue).to(equal, _array);
        });
      });
      
      describe('when sent #find with a block', function() {
        function doFind() {
          return _array.find.apply(_array, arguments);
        }
        
        it('should yield the elements once each', function() {
          var yieldedValues = [];
          doFind(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, [['foo'], ['bar']]);
        });
        
        it('should return the found element when finding', function() {
          var returnValue = doFind(function(s) {
            return s == 'foo';
          });
          expect(returnValue).to(equal, 'foo');
        });
        
        it('should return null when not finding', function() {
          var returnValue = doFind(function(s) {
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
            doFind(_ifNone, function(s) {
              yieldedValues[yieldedValues.length] = arguments;
            });
            expect(yieldedValues).to(equal, [['foo'], ['bar']]);
          });
          
          it('should return the found element when finding', function() {
            var returnValue = doFind(_ifNone, function(s) {
              return s == 'foo';
            });
            expect(returnValue).to(equal, 'foo');
          });
          
          it('should return the expected value when not finding', function() {
            var returnValue = doFind(_ifNone, function(s) {
              return s == 'bizzle';
            });
            expect(returnValue).to(equal, 'nothing here');
          });
        });
      });
      
      describe('when sent #inject with a block', function() {
        function doInject() {
          return _array.inject.apply(_array, arguments);
        }
        
        it('should yield once the first and the second elements', function() {
          var yieldedValues = [];
          doInject(function(memo, s) {
            yieldedValues[yieldedValues.length] = arguments;
            return memo;
          });
          expect(yieldedValues).to(equal, [['foo', 'bar']]);
        });
        
        it('should return the first element', function() {
          var returnValue = doInject(function(memo, s) { return memo; });
          expect(returnValue).to(equal, 'foo');
        });
        
        describe('and an "initial" argument', function() {
          var _initial = null;
          
          before(function() {
            _initial = 'nothing here';
          });
          
          it('should yield the expected memo and the elements once each', function() {
            var yieldedValues = [];
            doInject(_initial, function(memo, s) {
              yieldedValues[yieldedValues.length] = arguments;
              return memo;
            });
            expect(yieldedValues).to(equal,
                                     [['nothing here', 'foo'],
                                      ['nothing here', 'bar']]);
          });
          
          it('should return the expected value', function() {
            var returnValue = doInject(_initial, function(memo, s) {
              return memo;
            });
            expect(returnValue).to(equal, 'nothing here');
          });
        });
      });
      
      describe('when sent #map with a block', function() {
        function doMap() {
          return _array.map.apply(_array, arguments);
        }
        
        it('should yield the elements once each', function() {
          var yieldedValues = [];
          doMap(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, [['foo'], ['bar']]);
        });
        
        it('should return an array of the yielded values', function() {
          var returnValue = doMap(function(s) {
            return 'item: ' + s;
          });
          expect(returnValue).to(equal, ['item: foo', 'item: bar']);
        });
      });
    });
  });
});
