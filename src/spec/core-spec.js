Screw.Unit(function() {
  describe('Array', function() {
    describe('that is empty', function() {
      var _array = null;
      
      before(function() {
        _array = [];
      });
      
      describe('when sent #areAll with a block', function() {
        function doAreAll() {
          return _array.areAll.apply(_array, arguments);
        }
        
        it('should not yield', function() {
          var yieldedValues = [];
          doAreAll(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, []);
        });
        
        it('should return true', function() {
          var returnValue = doAreAll(function(s) { });
          expect(returnValue).to(equal, true);
        });
        
        it('should not mutate itself', function() {
          doAreAll(function(s) { });
          expect(_array).to(equal, []);
        });
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
          var returnValue = doDetect(function(s) { });
          expect(returnValue).to(be_null);
        });
        
        it('should not mutate itself', function() {
          doDetect(function(s) { });
          expect(_array).to(equal, []);
        });
        
        describe('and an "ifNone" argument', function() {
          function doDetectPassingIfNone(block) {
            var ifNone = function() { return 'nothing here'; };
            return doDetect(ifNone, block);
          }
          
          it('should not yield', function() {
            var yieldedValues = [];
            doDetectPassingIfNone(function(s) {
              yieldedValues[yieldedValues.length] = arguments;
            });
            expect(yieldedValues).to(equal, []);
          });
          
          it('should return the expected value', function() {
            var returnValue = doDetectPassingIfNone(function(s) { });
            expect(returnValue).to(equal, 'nothing here');
          });
          
          it('should not mutate itself', function() {
            doDetectPassingIfNone(function(s) { });
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
          doEachWithIndex(function(s, i) { });
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
          var returnValue = doFind(function(s) { });
          expect(returnValue).to(be_null);
        });
        
        it('should not mutate itself', function() {
          doFind(function(s) { });
          expect(_array).to(equal, []);
        });
        
        describe('and an "ifNone" argument', function() {
          function doFindPassingIfNone(block) {
            var ifNone = function() { return 'nothing here'; };
            return doFind(ifNone, block);
          }
          
          it('should not yield', function() {
            var yieldedValues = [];
            doFindPassingIfNone(function(s) {
              yieldedValues[yieldedValues.length] = arguments;
            });
            expect(yieldedValues).to(equal, []);
          });
          
          it('should return the expected value', function() {
            var returnValue = doFindPassingIfNone(function(s) { });
            expect(returnValue).to(equal, 'nothing here');
          });
        
          it('should not mutate itself', function() {
            doFindPassingIfNone(function(s) { });
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
          function doInjectPassingInitial(block) {
            return doInject('starting point', block);
          }
          
          it('should not yield', function() {
            var yieldedValues = [];
            doInjectPassingInitial(function(memo, s) {
              yieldedValues[yieldedValues.length] = s;
            });
            expect(yieldedValues).to(equal, []);
          });
          
          it('should return the expected value', function() {
            var returnValue = doInjectPassingInitial(function(memo, s) { });
            expect(returnValue).to(equal, 'starting point');
          });
          
          it('should not mutate itself', function() {
            doInjectPassingInitial(function(memo, s) { });
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
      
      describe('when sent #mapThis with a block', function() {
        function doMapThis() {
          return _array.mapThis.apply(_array, arguments);
        }
        
        it('should not yield', function() {
          var yieldedValues = [];
          doMapThis(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, []);
        });
        
        it('should return itself', function() {
          var returnValue = doMapThis(function(s) { });
          expect(returnValue).to(equal, _array);
        });
        
        it('should not mutate itself', function() {
          doMapThis(function(s) { });
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
        
        it('should not mutate itself', function() {
          doCollect(function(s) { });
          expect(_array).to(equal, ['foo']);
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
        
        describe('that returns true', function() {
          it('should return the element', function() {
            var returnValue = doDetect(function(s) { return true; });
            expect(returnValue).to(equal, 'foo');
          });
          
          it('should not mutate itself', function() {
            doDetect(function(s) { return true; });
            expect(_array).to(equal, ['foo']);
          });
        });
        
        describe('that returns true and with an "ifNone" argument', function() {
          var _ifNone = null;
          
          before(function() {
            _ifNone = function() { return 'nothing here'; };
          });
          
          it('should yield the element once to the block', function() {
            var yieldedValues = [];
            return doDetect(_ifNone, function(s) {
              yieldedValues[yieldedValues.length] = arguments;
              return true;
            });
            expect(yieldedValues).to(equal, [['foo']]);
          });
          
          it('should return the element', function() {
            var returnValue = doDetect(_ifNone, function(s) { return true; });
            expect(returnValue).to(equal, 'foo');
          });
          
          it('should not mutate itself', function() {
            doDetect(_ifNone, function(s) { return true; });
            expect(_array).to(equal, ['foo']);
          });
        });
        
        describe('that returns false', function() {
          it('should return null', function() {
            var returnValue = doDetect(function(s) { return false; });
            expect(returnValue).to(be_null);
          });
          
          it('should not mutate itself', function() {
            doDetect(function(s) { return false; });
            expect(_array).to(equal, ['foo']);
          });
        });
        
        describe('that returns false and with an "ifNone" argument', function() {
          var _ifNone = null;
          
          before(function() {
            _ifNone = function() { return 'nothing here'; };
          });
          
          it('should yield the element once to the block', function() {
            var yieldedValues = [];
            return doDetect(_ifNone, function(s) {
              yieldedValues[yieldedValues.length] = arguments;
              return false;
            });
            expect(yieldedValues).to(equal, [['foo']]);
          });
          
          it('should return the expected value', function() {
            var returnValue = doDetect(_ifNone, function(s) { return false; });
            expect(returnValue).to(equal, 'nothing here');
          });
          
          it('should not mutate itself', function() {
            doDetect(_ifNone, function(s) { return false; });
            expect(_array).to(equal, ['foo']);
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
        
        it('should not mutate itself', function() {
          doEach(function(s) { });
          expect(_array).to(equal, ['foo']);
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
        
        it('should not mutate itself', function() {
          doEachWithIndex(function(s, i) { });
          expect(_array).to(equal, ['foo']);
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
        
        describe('that returns true', function() {
          it('should return the element', function() {
            var returnValue = doFind(function(s) { return true; });
            expect(returnValue).to(equal, 'foo');
          });
          
          it('should not mutate itself', function() {
            doFind(function(s) { return true; });
            expect(_array).to(equal, ['foo']);
          });
        });
        
        describe('that returns true and with an "ifNone" argument', function() {
          var _ifNone = null;
          
          before(function() {
            _ifNone = function() { return 'nothing here'; };
          });
          
          it('should yield the element once to the block', function() {
            var yieldedValues = [];
            return doFind(_ifNone, function(s) {
              yieldedValues[yieldedValues.length] = arguments;
              return true;
            });
            expect(yieldedValues).to(equal, [['foo']]);
          });
          
          it('should return the element', function() {
            var returnValue = doFind(_ifNone, function(s) { return true; });
            expect(returnValue).to(equal, 'foo');
          });
          
          it('should not mutate itself', function() {
            doFind(_ifNone, function(s) { return true; });
            expect(_array).to(equal, ['foo']);
          });
        });
        
        describe('that returns false', function() {
          it('should return null', function() {
            var returnValue = doFind(function(s) { return false; });
            expect(returnValue).to(be_null);
          });
          
          it('should not mutate itself', function() {
            doFind(function(s) { return false; });
            expect(_array).to(equal, ['foo']);
          });
        });
        
        describe('that returns false and with an "ifNone" argument', function() {
          var _ifNone = null;
          
          before(function() {
            _ifNone = function() { return 'nothing here'; };
          });
          
          it('should yield the element once to the block', function() {
            var yieldedValues = [];
            return doFind(_ifNone, function(s) {
              yieldedValues[yieldedValues.length] = arguments;
              return false;
            });
            expect(yieldedValues).to(equal, [['foo']]);
          });
          
          it('should return the expected value', function() {
            var returnValue = doFind(_ifNone, function(s) { return false; });
            expect(returnValue).to(equal, 'nothing here');
          });
          
          it('should not mutate itself', function() {
            doFind(_ifNone, function(s) { return false; });
            expect(_array).to(equal, ['foo']);
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
            return memo + '|' + s;
          });
          expect(yieldedValues).to(equal, []);
        });
        
        it('should return the element', function() {
          var returnValue = doInject(function(memo, s) {
            return memo + '|' + s;
          });
          expect(returnValue).to(equal, 'foo');
        });
        
        it('should not mutate itself', function() {
          doInject(function(memo, s) { return memo + '|' + s; });
          expect(_array).to(equal, ['foo']);
        });
        
        describe('and an "initial" argument', function() {
          var _initial = null;
          
          before(function() {
            _initial = 'starting point';
          });
          
          it('should yield the expected memo and the element once', function() {
            var yieldedValues = [];
            doInject(_initial, function(memo, s) {
              yieldedValues[yieldedValues.length] = arguments;
              return memo + '|' + s;
            });
            expect(yieldedValues).to(equal, [['starting point', 'foo']]);
          });
          
          it('should return the result of the yield', function() {
            var returnValue = doInject(_initial, function(memo, s) {
              return memo + '|' + s;
            });
            expect(returnValue).to(equal, 'starting point|foo');
          });
          
          it('should not mutate itself', function() {
            doInject(_initial, function(memo, s) { return memo + '|' + s; });
            expect(_array).to(equal, ['foo']);
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
        
        it('should not mutate itself', function() {
          doMap(function(s) { });
          expect(_array).to(equal, ['foo']);
        });
      });
      
      describe('when sent #mapThis with a block', function() {
        function doMapThis() {
          return _array.mapThis.apply(_array, arguments);
        }
        
        it('should yield the element once', function() {
          var yieldedValues = [];
          doMapThis(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, [['foo']]);
        });
        
        it('should return itself', function() {
          var returnValue = doMapThis(function(s) { });
          expect(returnValue).to(equal, _array);
        });
        
        it('should mutate itself as expected', function() {
          doMapThis(function(s) {
            return 'item: ' + s;
          });
          expect(_array).to(equal, ['item: foo']);
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
        
        it('should not mutate itself', function() {
          doCollect(function(s) { return s; });
          expect(_array).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #collectThis with a block', function() {
        function doCollectThis() {
          return _array.collectThis.apply(_array, arguments);
        }
        
        it('should yield the elements once each', function() {
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
        
        describe('that returns true', function() {
          it('should return the first element', function() {
            var returnValue = doDetect(function(s) { return true; });
            expect(returnValue).to(equal, 'foo');
          });
          
          it('should not mutate itself', function() {
            doDetect(function(s) { return true; });
            expect(_array).to(equal, ['foo', 'bar']);
          });
        });
        
        describe('that returns true and with an "ifNone" argument', function() {
          var _ifNone = null;
          
          before(function() {
            _ifNone = function() { return 'nothing here'; };
          });
          
          it('should yield the elements to the block once each', function() {
            var yieldedValues = [];
            return doDetect(_ifNone, function(s) {
              yieldedValues[yieldedValues.length] = arguments;
              return true;
            });
            expect(yieldedValues).to(equal, [['foo'], ['bar']]);
          });
          
          it('should return the first element', function() {
            var returnValue = doDetect(_ifNone, function(s) { return true; });
            expect(returnValue).to(equal, 'foo');
          });
          
          it('should not mutate itself', function() {
            doDetect(_ifNone, function(s) { return true; });
            expect(_array).to(equal, ['foo', 'bar']);
          });
        });
        
        describe('that returns false', function() {
          it('should return null', function() {
            var returnValue = doDetect(function(s) { return false; });
            expect(returnValue).to(be_null);
          });
          
          it('should not mutate itself', function() {
            doDetect(function(s) { return false; });
            expect(_array).to(equal, ['foo', 'bar']);
          });
        });
        
        describe('that returns false and with an "ifNone" argument', function() {
          var _ifNone = null;
          
          before(function() {
            _ifNone = function() { return 'nothing here'; };
          });
          
          it('should yield the elements to the block once each', function() {
            var yieldedValues = [];
            return doDetect(_ifNone, function(s) {
              yieldedValues[yieldedValues.length] = arguments;
              return false;
            });
            expect(yieldedValues).to(equal, [['foo'], ['bar']]);
          });
          
          it('should return the expected value', function() {
            var returnValue = doDetect(_ifNone, function(s) { return false; });
            expect(returnValue).to(equal, 'nothing here');
          });
          
          it('should not mutate itself', function() {
            doDetect(_ifNone, function(s) { return false; });
            expect(_array).to(equal, ['foo', 'bar']);
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
        
        it('should not mutate itself', function() {
          doEach(function(s) { });
          expect(_array).to(equal, ['foo', 'bar']);
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
        
        it('should not mutate itself', function() {
          doEachWithIndex(function(s) { });
          expect(_array).to(equal, ['foo', 'bar']);
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
        
        describe('that returns true', function() {
          it('should return the first element', function() {
            var returnValue = doFind(function(s) { return true; });
            expect(returnValue).to(equal, 'foo');
          });
          
          it('should not mutate itself', function() {
            doFind(function(s) { return true; });
            expect(_array).to(equal, ['foo', 'bar']);
          });
        });
        
        describe('that returns true and with an "ifNone" argument', function() {
          var _ifNone = null;
          
          before(function() {
            _ifNone = function() { return 'nothing here'; };
          });
          
          it('should yield the elements to the block once each', function() {
            var yieldedValues = [];
            return doFind(_ifNone, function(s) {
              yieldedValues[yieldedValues.length] = arguments;
              return true;
            });
            expect(yieldedValues).to(equal, [['foo'], ['bar']]);
          });
          
          it('should return the first element', function() {
            var returnValue = doFind(_ifNone, function(s) { return true; });
            expect(returnValue).to(equal, 'foo');
          });
          
          it('should not mutate itself', function() {
            doFind(_ifNone, function(s) { return true; });
            expect(_array).to(equal, ['foo', 'bar']);
          });
        });
        
        describe('that returns false', function() {
          it('should return null', function() {
            var returnValue = doFind(function(s) { return false; });
            expect(returnValue).to(be_null);
          });
          
          it('should not mutate itself', function() {
            doFind(function(s) { return false; });
            expect(_array).to(equal, ['foo', 'bar']);
          });
        });
        
        describe('that returns false and with an "ifNone" argument', function() {
          var _ifNone = null;
          
          before(function() {
            _ifNone = function() { return 'nothing here'; };
          });
          
          it('should yield the elements to the block once each', function() {
            var yieldedValues = [];
            return doFind(_ifNone, function(s) {
              yieldedValues[yieldedValues.length] = arguments;
              return false;
            });
            expect(yieldedValues).to(equal, [['foo'], ['bar']]);
          });
          
          it('should return the expected value', function() {
            var returnValue = doFind(_ifNone, function(s) { return false; });
            expect(returnValue).to(equal, 'nothing here');
          });
          
          it('should not mutate itself', function() {
            doFind(_ifNone, function(s) { return false; });
            expect(_array).to(equal, ['foo', 'bar']);
          });
        });
      });
      
      describe('when sent #inject with a block', function() {
        function doInject() {
          return _array.inject.apply(_array, arguments);
        }
        
        it('should yield the second element once with the first element as the memo', function() {
          var yieldedValues = [];
          doInject(function(memo, s) {
            yieldedValues[yieldedValues.length] = arguments;
            return memo + '|' + s;
          });
          expect(yieldedValues).to(equal, [['foo', 'bar']]);
        });
        
        it('should return the result of the yield', function() {
          var returnValue = doInject(function(memo, s) {
            return memo + '|' + s;
          });
          expect(returnValue).to(equal, 'foo|bar');
        });
        
        it('should not mutate itself', function() {
          doInject(function(memo, s) { return memo + '|' + s; });
          expect(_array).to(equal, ['foo', 'bar']);
        });
        
        describe('and an "initial" argument', function() {
          var _initial = null;
          
          before(function() {
            _initial = 'starting point';
          });
          
          it('should yield the expected memo and the elements once each', function() {
            var yieldedValues = [];
            doInject(_initial, function(memo, s) {
              yieldedValues[yieldedValues.length] = arguments;
              return memo + '|' + s;
            });
            expect(yieldedValues).to(equal,
                                     [['starting point',     'foo'],
                                      ['starting point|foo', 'bar']]);
          });
          
          it('should return the result of the last yield', function() {
            var returnValue = doInject(_initial, function(memo, s) {
              return memo + '|' + s;
            });
            expect(returnValue).to(equal, 'starting point|foo|bar');
          });
          
          it('should not mutate itself', function() {
            doInject(_initial, function(memo, s) { return memo + '|' + s; });
            expect(_array).to(equal, ['foo', 'bar']);
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
        
        it('should not mutate itself', function() {
          doMap(function(s) { });
          expect(_array).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #mapThis with a block', function() {
        function doMapThis() {
          return _array.mapThis.apply(_array, arguments);
        }
        
        it('should yield the elements once each', function() {
          var yieldedValues = [];
          doMapThis(function(s) {
            yieldedValues[yieldedValues.length] = arguments;
          });
          expect(yieldedValues).to(equal, [['foo'], ['bar']]);
        });
        
        it('should return itself', function() {
          var returnValue = doMapThis(function(s) { });
          expect(returnValue).to(equal, _array);
        });
        
        it('should mutate itself as expected', function() {
          doMapThis(function(s) {
            return 'item: ' + s;
          });
          expect(_array).to(equal, ['item: foo', 'item: bar']);
        });
      });
    });
  });
});
