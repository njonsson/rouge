Screw.Unit(function() {
  describe('Array', function() {
    function doMethod(methodName, options) {
      var argumentsToArray = function(argumentsObject) {
        var array = [];
        for (var i = 0; i < argumentsObject.length; i += 1) {
          array.push(argumentsObject[i]);
        }
        return array;
      };
      
      var wrapWithCallbacksRecording = function(func, callbacks) {
        return function() {
          callbacks.push({'this':      options.on,
                          'arguments': argumentsToArray(arguments)});
          return func.apply(options.on, arguments);
        };
      };
      
      // For convenience
      if (! (options.with instanceof Array)) options.with = [options.with];
      
      var result = {callbacks: []};
      for (var i = 0; i < options.with.length; i += 1) {
        var arg = options.with[i];
        if (arg instanceof Function) {
          var callbacksForFunction = [];
          options.with[i] = wrapWithCallbacksRecording.apply(options.on,
                                                                  [arg,
                                                                   callbacksForFunction]);
          result.callbacks.push(callbacksForFunction);
        }
      }
      
      result.returnValue = options.on[methodName].apply(options.on,
                                                        options.with);
      return result;
    }
    
    describe('that is empty', function() {
      var _array = null;
      
      before(function() {
        _array = [];
      });
      
      describe('when sent #areAll with a block', function() {
        function doAreAll() {
          return doMethod('areAll', {'on': _array, 'with': function(s) { }});
        }
        
        it('should not yield', function() {
          expect(doAreAll().callbacks[0]).to(be_empty);
        });
        
        it('should return true', function() {
          expect(doAreAll().returnValue).to(equal, true);
        });
        
        it('should not mutate itself', function() {
          doAreAll();
          expect(_array).to(equal, []);
        });
      });
      
      describe('when sent #areAll without a block', function() {
        function doAreAllNoBlock() {
          return doMethod('areAll', {'on': _array});
        }
        
        it('should return true', function() {
          expect(doAreAllNoBlock().returnValue).to(equal, true);
        });
        
        it('should not mutate itself', function() {
          doAreAllNoBlock();
          expect(_array).to(equal, []);
        });
      });
      
      describe('when sent #collect with a block', function() {
        function doCollect() {
          return doMethod('collect', {'on': _array, 'with': function(s) { }});
        }
        
        it('should not yield', function() {
          expect(doCollect().callbacks[0]).to(be_empty);
        });
        
        it('should return itself', function() {
          expect(doCollect().returnValue).to(equal, _array);
        });
        
        it('should not mutate itself', function() {
          doCollect();
          expect(_array).to(equal, []);
        });
      });
      
      describe('when sent #collectThis with a block', function() {
        function doCollectThis() {
          return doMethod('collectThis',
                          {'on':   _array,
                           'with': function(s) { }});
        }
        
        it('should not yield', function() {
          expect(doCollectThis().callbacks[0]).to(be_empty);
        });
        
        it('should return itself', function() {
          expect(doCollectThis().returnValue).to(equal, _array);
        });
        
        it('should not mutate itself', function() {
          doCollectThis();
          expect(_array).to(equal, []);
        });
      });
      
      describe('when sent #detect with a block', function() {
        function doDetect() {
          return doMethod('detect', {'on': _array, 'with': function(s) { }});
        }
        
        it('should not yield', function() {
          expect(doDetect().callbacks[0]).to(be_empty);
        });
        
        it('should return null', function() {
          expect(doDetect().returnValue).to(be_null);
        });
        
        it('should not mutate itself', function() {
          doDetect();
          expect(_array).to(equal, []);
        });
      });
      
      describe('when sent #detect with an "ifNone" and a block', function() {
        function doDetectPassingIfNone(block) {
          return doMethod('detect',
                          {'on':   _array,
                           'with': [function() { return 'nothing here'; },
                                    function(s) { }]});
        }
        
        it('should call the "ifNone" once', function() {
          expect(doDetectPassingIfNone().callbacks[0].length).to(equal, 1);
        });
        
        it("should call the \"ifNone\" with itself as the 'this' value", function() {
          expect(doDetectPassingIfNone().callbacks[0][0].this).to(equal, _array);
        });
        
        it('should call the "ifNone" with no arguments', function() {
          expect(doDetectPassingIfNone().callbacks[0][0].arguments).to(be_empty);
        });
        
        it('should not yield to the block', function() {
          expect(doDetectPassingIfNone().callbacks[1]).to(be_empty);
        });
        
        it('should return the result of the "ifNone"', function() {
          expect(doDetectPassingIfNone().returnValue).to(equal, 'nothing here');
        });
        
        it('should not mutate itself', function() {
          doDetectPassingIfNone();
          expect(_array).to(equal, []);
        });
      });
      
      describe('when sent #each with a block', function() {
        function doEach() {
          return doMethod('each', {'on': _array, 'with': function(s) { }});
        }
        
        it('should not yield', function() {
          expect(doEach().callbacks[0]).to(be_empty);
        });
        
        it('should return itself', function() {
          expect(doEach().returnValue).to(equal, _array);
        });
        
        it('should not mutate itself', function() {
          doEach();
          expect(_array).to(equal, []);
        });
      });
      
      describe('when sent #eachWithIndex with a block', function() {
        function doEachWithIndex() {
          return doMethod('eachWithIndex',
                          {'on':   _array,
                           'with': function(s, i) { }});
        }
        
        it('should not yield', function() {
          expect(doEachWithIndex().callbacks[0]).to(be_empty);
        });
        
        it('should return itself', function() {
          expect(doEachWithIndex().returnValue).to(equal, _array);
        });
        
        it('should not mutate itself', function() {
          doEachWithIndex();
          expect(_array).to(equal, []);
        });
      });
      
      describe('when sent #find with a block', function() {
        function doFind() {
          return doMethod('find', {'on': _array, 'with': function(s) { }});
        }
        
        it('should not yield', function() {
          expect(doFind().callbacks[0]).to(be_empty);
        });
        
        it('should return null', function() {
          expect(doFind().returnValue).to(be_null);
        });
        
        it('should not mutate itself', function() {
          doFind();
          expect(_array).to(equal, []);
        });
      });
      
      describe('when sent #find with an "ifNone" and a block', function() {
        function doFindPassingIfNone(block) {
          return doMethod('find',
                          {'on':   _array,
                           'with': [function() { return 'nothing here'; },
                                    function(s) { }]});
        }
        
        it('should call the "ifNone" once', function() {
          expect(doFindPassingIfNone().callbacks[0].length).to(equal, 1);
        });
        
        it("should call the \"ifNone\" with itself as the 'this' value", function() {
          expect(doFindPassingIfNone().callbacks[0][0].this).to(equal, _array);
        });
        
        it('should call the "ifNone" with no arguments', function() {
          expect(doFindPassingIfNone().callbacks[0][0].arguments).to(be_empty);
        });
        
        it('should not yield to the block', function() {
          expect(doFindPassingIfNone().callbacks[1]).to(be_empty);
        });
        
        it('should return the result of the "ifNone"', function() {
          expect(doFindPassingIfNone().returnValue).to(equal, 'nothing here');
        });
        
        it('should not mutate itself', function() {
          doFindPassingIfNone();
          expect(_array).to(equal, []);
        });
      });
      
      describe('when sent #inject with a block', function() {
        function doInject() {
          return doMethod('inject',
                          {'on':   _array,
                           'with': function(memo, s) { }});
        }
        
        it('should not yield', function() {
          expect(doInject().callbacks[0]).to(be_empty);
        });
        
        it('should return null', function() {
          expect(doInject().returnValue).to(be_null);
        });
        
        it('should not mutate itself', function() {
          doInject();
          expect(_array).to(equal, []);
        });
      });
      
      describe('when sent #inject with an "initial" and a block', function() {
        function doInjectPassingInitial(block) {
          return doMethod('inject',
                          {'on':   _array,
                           'with': ['starting point',
                                    function(memo, s) { }]});
        }
        
        it('should not yield', function() {
          expect(doInjectPassingInitial().callbacks[0]).to(equal, []);
        });
        
        it('should return the "initial"', function() {
          expect(doInjectPassingInitial().returnValue).to(equal,
                                                          'starting point');
        });
        
        it('should not mutate itself', function() {
          doInjectPassingInitial();
          expect(_array).to(equal, []);
        });
      });
      
      describe('when sent #map with a block', function() {
        function doMap() {
          return doMethod('map', {'on': _array, 'with': function(s) { }});
        }
        
        it('should not yield', function() {
          expect(doMap().callbacks[0]).to(equal, []);
        });
        
        it('should return itself', function() {
          expect(doMap().returnValue).to(equal, _array);
        });
        
        it('should not mutate itself', function() {
          doMap();
          expect(_array).to(equal, []);
        });
      });
      
      describe('when sent #mapThis with a block', function() {
        function doMapThis() {
          return doMethod('mapThis', {'on': _array, 'with': function(s) { }});
        }
        
        it('should not yield', function() {
          expect(doMapThis().callbacks[0]).to(equal, []);
        });
        
        it('should return itself', function() {
          expect(doMapThis().returnValue).to(equal, _array);
        });
        
        it('should not mutate itself', function() {
          doMapThis();
          expect(_array).to(equal, []);
        });
      });
    });
    
    describe('with one element', function() {
      var _array = null;
      
      before(function() {
        _array = ['foo'];
      });
      
      describe('when sent #areAll with a block that returns true', function() {
        function doAreAllTrue() {
          return doMethod('areAll',
                          {'on':   _array,
                           'with': function(s) { return true; }});
        }
        
        it('should yield once', function() {
          expect(doAreAllTrue().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doAreAllTrue().callbacks[0][0].this).to(equal, _array);
        });
        
        it('should yield the element', function() {
          expect(doAreAllTrue().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return true', function() {
          expect(doAreAllTrue().returnValue).to(be_true);
        });
        
        it('should not mutate itself', function() {
          doAreAllTrue();
          expect(_array).to(equal, ['foo']);
        });
      });
      
      describe('when sent #areAll with a block that returns false', function() {
        function doAreAllFalse() {
          return doMethod('areAll',
                          {'on':   _array,
                           'with': function(s) { return false; }});
        }
        
        it('should yield once', function() {
          expect(doAreAllFalse().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doAreAllFalse().callbacks[0][0].this).to(equal, _array);
        });
        
        it('should yield the element', function() {
          expect(doAreAllFalse().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return false', function() {
          expect(doAreAllFalse().returnValue).to(be_false);
        });
        
        it('should not mutate itself', function() {
          doAreAllFalse();
          expect(_array).to(equal, ['foo']);
        });
      });
      
      describe('when sent #areAll without a block', function() {
        function doAreAllNoBlock() {
          return doMethod('areAll', {'on': _array});
        }
        
        it('should return true', function() {
          expect(doAreAllNoBlock().returnValue).to(be_true);
        });
        
        it('should not mutate itself', function() {
          doAreAllNoBlock();
          expect(_array).to(equal, ['foo']);
        });
      });
      
      describe('when sent #collect with a block', function() {
        function doCollect() {
          return doMethod('collect',
                          {'on':   _array,
                           'with': function(s) { return 'item: ' + s; }});
        }
        
        it('should yield once', function() {
          expect(doCollect().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doCollect().callbacks[0][0].this).to(equal, _array);
        });
        
        it('should yield the element', function() {
          expect(doCollect().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return an array containing the value returned by the block', function() {
          expect(doCollect().returnValue).to(equal, ['item: foo']);
        });
        
        it('should not mutate itself', function() {
          doCollect();
          expect(_array).to(equal, ['foo']);
        });
      });
      
      describe('when sent #collectThis with a block', function() {
        function doCollectThis() {
          return doMethod('collectThis',
                          {'on':   _array,
                           'with': function(s) { return 'item: ' + s; }});
        }
        
        it('should yield once', function() {
          expect(doCollectThis().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doCollectThis().callbacks[0][0].this).to(equal, _array);
        });
        
        it('should yield the element', function() {
          expect(doCollectThis().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return itself', function() {
          expect(doCollectThis().returnValue).to(equal, _array);
        });
        
        it('should mutate itself as expected', function() {
          doCollectThis();
          expect(_array).to(equal, ['item: foo']);
        });
      });
      
      describe('when sent #detect with a block that returns true', function() {
        function doDetectTrue() {
          return doMethod('detect',
                          {'on':   _array,
                           'with': function(s) { return true; }});
        }
        
        it('should yield once', function() {
          expect(doDetectTrue().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doDetectTrue().callbacks[0][0].this).to(equal, _array);
        });
        
        it('should yield the element', function() {
          expect(doDetectTrue().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return the element', function() {
          expect(doDetectTrue().returnValue).to(equal, 'foo');
        });
        
        it('should not mutate itself', function() {
          doDetectTrue();
          expect(_array).to(equal, ['foo']);
        });
      });
      
      describe('when sent #detect with a block that returns false', function() {
        function doDetectFalse() {
          return doMethod('detect',
                          {'on':   _array,
                           'with': function(s) { return false; }});
        }
        
        it('should yield once', function() {
          expect(doDetectFalse().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doDetectFalse().callbacks[0][0].this).to(equal, _array);
        });
        
        it('should yield the element', function() {
          expect(doDetectFalse().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return null', function() {
          expect(doDetectFalse().returnValue).to(be_null);
        });
        
        it('should not mutate itself', function() {
          doDetectFalse();
          expect(_array).to(equal, ['foo']);
        });
      });
      
      describe('when sent #detect with an "ifNone" and a block that returns true', function() {
        function doDetectTruePassingIfNone(block) {
          return doMethod('detect',
                          {'on':   _array,
                           'with': [function() { return 'nothing here'; },
                                    function(s) { return true; }]});
        }
        
        it('should not call the "ifNone"', function() {
          expect(doDetectTruePassingIfNone().callbacks[0]).to(be_empty);
        });
        
        it('should yield to the block once', function() {
          expect(doDetectTruePassingIfNone().callbacks[1].length).to(equal, 1);
        });
        
        it("should yield to the block with itself as the 'this' value", function() {
          expect(doDetectTruePassingIfNone().callbacks[1][0].this).to(equal,
                                                                      _array);
        });
        
        it('should yield the element to the block', function() {
          expect(doDetectTruePassingIfNone().callbacks[1][0].arguments).to(equal,
                                                                           ['foo']);
        });
        
        it('should return the element', function() {
          expect(doDetectTruePassingIfNone().returnValue).to(equal, 'foo');
        });
        
        it('should not mutate itself', function() {
          doDetectTruePassingIfNone();
          expect(_array).to(equal, ['foo']);
        });
      });
      
      describe('when sent #detect with an "ifNone" and a block that returns false', function() {
        function doDetectFalsePassingIfNone(block) {
          return doMethod('detect',
                          {'on':   _array,
                           'with': [function() { return 'nothing here'; },
                                    function(s) { return false; }]});
        }
        
        it('should call the "ifNone" once', function() {
          expect(doDetectFalsePassingIfNone().callbacks[0].length).to(equal, 1);
        });
        
        it("should call the \"ifNone\" with itself as the 'this' value", function() {
          expect(doDetectFalsePassingIfNone().callbacks[0][0].this).to(equal,
                                                                       _array);
        });
        
        it('should call the "ifNone" with no arguments', function() {
          expect(doDetectFalsePassingIfNone().callbacks[0][0].arguments).to(be_empty);
        });
        
        it('should yield to the block once', function() {
          expect(doDetectFalsePassingIfNone().callbacks[1].length).to(equal, 1);
        });
        
        it("should yield to the block with itself as the 'this' value", function() {
          expect(doDetectFalsePassingIfNone().callbacks[1][0].this).to(equal,
                                                                       _array);
        });
        
        it('should yield the element to the block', function() {
          expect(doDetectFalsePassingIfNone().callbacks[1][0].arguments).to(equal,
                                                                            ['foo']);
        });
        
        it('should return the result of the "ifNone"', function() {
          expect(doDetectFalsePassingIfNone().returnValue).to(equal,
                                                              'nothing here');
        });
        
        it('should not mutate itself', function() {
          doDetectFalsePassingIfNone();
          expect(_array).to(equal, ['foo']);
        });
      });
      
      describe('when sent #each with a block', function() {
        function doEach() {
          return doMethod('each',
                          {'on':   _array,
                           'with': function(s) { }});
        }
        
        it('should yield once', function() {
          expect(doEach().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doEach().callbacks[0][0].this).to(equal, _array);
        });
        
        it('should yield the element', function() {
          expect(doEach().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return itself', function() {
          expect(doEach().returnValue).to(equal, _array);
        });
        
        it('should not mutate itself', function() {
          doEach();
          expect(_array).to(equal, ['foo']);
        });
      });
      
      describe('when sent #eachWithIndex with a block', function() {
        function doEachWithIndex() {
          return doMethod('eachWithIndex',
                          {'on':   _array,
                           'with': function(s, i) { }});
        }
        
        it('should yield once', function() {
          expect(doEachWithIndex().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doEachWithIndex().callbacks[0][0].this).to(equal, _array);
        });
        
        it('should yield the element and 0', function() {
          expect(doEachWithIndex().callbacks[0][0].arguments).to(equal,
                                                                 ['foo', 0]);
        });
        
        it('should return itself', function() {
          expect(doEachWithIndex().returnValue).to(equal, _array);
        });
        
        it('should not mutate itself', function() {
          doEachWithIndex();
          expect(_array).to(equal, ['foo']);
        });
      });
      
      describe('when sent #find with a block that returns true', function() {
        function doFindTrue() {
          return doMethod('find',
                          {'on':   _array,
                           'with': function(s) { return true; }});
        }
        
        it('should yield once', function() {
          expect(doFindTrue().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doFindTrue().callbacks[0][0].this).to(equal, _array);
        });
        
        it('should yield the element', function() {
          expect(doFindTrue().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return the element', function() {
          expect(doFindTrue().returnValue).to(equal, 'foo');
        });
        
        it('should not mutate itself', function() {
          doFindTrue();
          expect(_array).to(equal, ['foo']);
        });
      });
      
      describe('when sent #find with a block that returns false', function() {
        function doFindFalse() {
          return doMethod('find',
                          {'on':   _array,
                           'with': function(s) { return false; }});
        }
        
        it('should yield once', function() {
          expect(doFindFalse().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doFindFalse().callbacks[0][0].this).to(equal, _array);
        });
        
        it('should yield the element', function() {
          expect(doFindFalse().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return null', function() {
          expect(doFindFalse().returnValue).to(be_null);
        });
        
        it('should not mutate itself', function() {
          doFindFalse();
          expect(_array).to(equal, ['foo']);
        });
      });
      
      describe('when sent #find with an "ifNone" and a block that returns true', function() {
        function doFindTruePassingIfNone(block) {
          return doMethod('find',
                          {'on':   _array,
                           'with': [function() { return 'nothing here'; },
                                    function(s) { return true; }]});
        }
        
        it('should not call the "ifNone"', function() {
          expect(doFindTruePassingIfNone().callbacks[0]).to(be_empty);
        });
        
        it('should yield to the block once', function() {
          expect(doFindTruePassingIfNone().callbacks[1].length).to(equal, 1);
        });
        
        it("should yield to the block with itself as the 'this' value", function() {
          expect(doFindTruePassingIfNone().callbacks[1][0].this).to(equal,
                                                                    _array);
        });
        
        it('should yield the element to the block', function() {
          expect(doFindTruePassingIfNone().callbacks[1][0].arguments).to(equal,
                                                                         ['foo']);
        });
        
        it('should return the element', function() {
          expect(doFindTruePassingIfNone().returnValue).to(equal, 'foo');
        });
        
        it('should not mutate itself', function() {
          doFindTruePassingIfNone();
          expect(_array).to(equal, ['foo']);
        });
      });
      
      describe('when sent #find with an "ifNone" and a block that returns false', function() {
        function doFindFalsePassingIfNone(block) {
          return doMethod('find',
                          {'on':   _array,
                           'with': [function() { return 'nothing here'; },
                                    function(s) { return false; }]});
        }
        
        it('should call the "ifNone" once', function() {
          expect(doFindFalsePassingIfNone().callbacks[0].length).to(equal, 1);
        });
        
        it("should call the \"ifNone\" with itself as the 'this' value", function() {
          expect(doFindFalsePassingIfNone().callbacks[0][0].this).to(equal,
                                                                     _array);
        });
        
        it('should call the "ifNone" with no arguments', function() {
          expect(doFindFalsePassingIfNone().callbacks[0][0].arguments).to(be_empty);
        });
        
        it('should yield to the block once', function() {
          expect(doFindFalsePassingIfNone().callbacks[1].length).to(equal, 1);
        });
        
        it("should yield to the block with itself as the 'this' value", function() {
          expect(doFindFalsePassingIfNone().callbacks[1][0].this).to(equal,
                                                                     _array);
        });
        
        it('should yield the element to the block', function() {
          expect(doFindFalsePassingIfNone().callbacks[1][0].arguments).to(equal,
                                                                          ['foo']);
        });
        
        it('should return the result of the "ifNone"', function() {
          expect(doFindFalsePassingIfNone().returnValue).to(equal,
                                                            'nothing here');
        });
        
        it('should not mutate itself', function() {
          doFindFalsePassingIfNone();
          expect(_array).to(equal, ['foo']);
        });
      });
      
      describe('when sent #inject with a block', function() {
        function doInject() {
          return doMethod('inject',
                          {'on':   _array,
                           'with': function(memo, s) { }});
        }
        
        it('should not yield', function() {
          expect(doInject().callbacks[0]).to(be_empty);
        });
        
        it('should return the element', function() {
          expect(doInject().returnValue).to(equal, 'foo');
        });
        
        it('should not mutate itself', function() {
          doInject();
          expect(_array).to(equal, ['foo']);
        });
      });
      
      describe('when sent #inject with an "initial" and a block', function() {
        function doInjectWithInitial() {
          return doMethod('inject',
                          {'on':   _array,
                           'with': ['starting point',
                                    function(memo, s) {
                                      return 'item: ' + s;
                                    }]});
        }
        
        it('should yield once', function() {
          expect(doInjectWithInitial().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doInjectWithInitial().callbacks[0][0].this).to(equal, _array);
        });
        
        it('should yield the "initial" and the element', function() {
          expect(doInjectWithInitial().callbacks[0][0].arguments).to(equal,
                                                                     ['starting point',
                                                                      'foo']);
        });
        
        it('should return the value returned by the block', function() {
          expect(doInjectWithInitial().returnValue).to(equal, 'item: foo');
        });
        
        it('should not mutate itself', function() {
          doInjectWithInitial();
          expect(_array).to(equal, ['foo']);
        });
      });
      
      describe('when sent #map with a block', function() {
        function doMap() {
          return doMethod('map',
                          {'on':   _array,
                           'with': function(s) { return 'item: ' + s; }});
        }
        
        it('should yield once', function() {
          expect(doMap().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doMap().callbacks[0][0].this).to(equal, _array);
        });
        
        it('should yield the element', function() {
          expect(doMap().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return an array containing the value returned by the block', function() {
          expect(doMap().returnValue).to(equal, ['item: foo']);
        });
        
        it('should not mutate itself', function() {
          doMap();
          expect(_array).to(equal, ['foo']);
        });
      });
      
      describe('when sent #mapThis with a block', function() {
        function doMapThis() {
          return doMethod('mapThis',
                          {'on':   _array,
                           'with': function(s) { return 'item: ' + s; }});
        }
        
        it('should yield once', function() {
          expect(doMapThis().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doMapThis().callbacks[0][0].this).to(equal, _array);
        });
        
        it('should yield the element', function() {
          expect(doMapThis().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return itself', function() {
          expect(doMapThis().returnValue).to(equal, _array);
        });
        
        it('should mutate itself as expected', function() {
          doMapThis();
          expect(_array).to(equal, ['item: foo']);
        });
      });
    });
    
    describe('with two elements', function() {
      var _array = null;
      
      before(function() {
        _array = ['foo', 'bar'];
      });
      
      describe('when sent #areAll with a block that returns true', function() {
        function doAreAllTrue() {
          return doMethod('areAll',
                          {'on':   _array,
                           'with': function(s) { return true; }});
        }
        
        it('should yield twice', function() {
          expect(doAreAllTrue().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doAreAllTrue().callbacks[0][0].this).to(equal, _array);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doAreAllTrue().callbacks[0][1].this).to(equal, _array);
        });
        
        it('should yield the first element the first time', function() {
          expect(doAreAllTrue().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should yield the second element the second time', function() {
          expect(doAreAllTrue().callbacks[0][1].arguments).to(equal, ['bar']);
        });
        
        it('should return true', function() {
          expect(doAreAllTrue().returnValue).to(be_true);
        });
        
        it('should not mutate itself', function() {
          doAreAllTrue();
          expect(_array).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #areAll with a block that returns false', function() {
        function doAreAllFalse() {
          return doMethod('areAll',
                          {'on':   _array,
                           'with': function(s) { return false; }});
        }
        
        it('should yield once', function() {
          expect(doAreAllFalse().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doAreAllFalse().callbacks[0][0].this).to(equal, _array);
        });
        
        it('should yield the first element', function() {
          expect(doAreAllFalse().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return false', function() {
          expect(doAreAllFalse().returnValue).to(be_false);
        });
        
        it('should not mutate itself', function() {
          doAreAllFalse();
          expect(_array).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #areAll without a block', function() {
        function doAreAllNoBlock() {
          return doMethod('areAll', {'on': _array});
        }
        
        it('should return true', function() {
          expect(doAreAllNoBlock().returnValue).to(be_true);
        });
        
        it('should not mutate itself', function() {
          doAreAllNoBlock();
          expect(_array).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #collect with a block', function() {
        function doCollect() {
          return doMethod('collect',
                          {'on':   _array,
                           'with': function(s) { return 'item: ' + s; }});
        }
        
        it('should yield twice', function() {
          expect(doCollect().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doCollect().callbacks[0][0].this).to(equal, _array);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doCollect().callbacks[0][1].this).to(equal, _array);
        });
        
        it('should yield the first element the first time', function() {
          expect(doCollect().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should yield the second element the second time', function() {
          expect(doCollect().callbacks[0][1].arguments).to(equal, ['bar']);
        });
        
        it('should return an array containing the values returned by the block', function() {
          expect(doCollect().returnValue).to(equal, ['item: foo', 'item: bar']);
        });
        
        it('should not mutate itself', function() {
          doCollect();
          expect(_array).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #collectThis with a block', function() {
        function doCollectThis() {
          return doMethod('collectThis',
                          {'on':   _array,
                           'with': function(s) { return 'item: ' + s; }});
        }
        
        it('should yield twice', function() {
          expect(doCollectThis().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doCollectThis().callbacks[0][0].this).to(equal, _array);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doCollectThis().callbacks[0][1].this).to(equal, _array);
        });
        
        it('should yield the first element the first time', function() {
          expect(doCollectThis().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should yield the second element the second time', function() {
          expect(doCollectThis().callbacks[0][1].arguments).to(equal, ['bar']);
        });
        
        it('should return itself', function() {
          expect(doCollectThis().returnValue).to(equal, _array);
        });
        
        it('should mutate itself as expected', function() {
          doCollectThis();
          expect(_array).to(equal, ['item: foo', 'item: bar']);
        });
      });
      
      describe('when sent #detect with a block that returns true', function() {
        function doDetectTrue() {
          return doMethod('detect',
                          {'on':   _array,
                           'with': function(s) { return true; }});
        }
        
        it('should yield once', function() {
          expect(doDetectTrue().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doDetectTrue().callbacks[0][0].this).to(equal, _array);
        });
        
        it('should yield the first element', function() {
          expect(doDetectTrue().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return the first element', function() {
          expect(doDetectTrue().returnValue).to(equal, 'foo');
        });
        
        it('should not mutate itself', function() {
          doDetectTrue();
          expect(_array).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #detect with a block that returns false', function() {
        function doDetectFalse() {
          return doMethod('detect',
                          {'on':   _array,
                           'with': function(s) { return false; }});
        }
        
        it('should yield twice', function() {
          expect(doDetectFalse().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doDetectFalse().callbacks[0][0].this).to(equal, _array);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doDetectFalse().callbacks[0][1].this).to(equal, _array);
        });
        
        it('should yield the first element the first time', function() {
          expect(doDetectFalse().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should yield the second element the second time', function() {
          expect(doDetectFalse().callbacks[0][1].arguments).to(equal, ['bar']);
        });
        
        it('should return null', function() {
          expect(doDetectFalse().returnValue).to(be_null);
        });
        
        it('should not mutate itself', function() {
          doDetectFalse();
          expect(_array).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #detect with an "ifNone" and a block that returns true', function() {
        function doDetectTruePassingIfNone(block) {
          return doMethod('detect',
                          {'on':   _array,
                           'with': [function() { return 'nothing here'; },
                                    function(s) { return true; }]});
        }
        
        it('should not call the "ifNone"', function() {
          expect(doDetectTruePassingIfNone().callbacks[0]).to(be_empty);
        });
        
        it('should yield to the block once', function() {
          expect(doDetectTruePassingIfNone().callbacks[1].length).to(equal, 1);
        });
        
        it("should yield to the block with itself as the 'this' value", function() {
          expect(doDetectTruePassingIfNone().callbacks[1][0].this).to(equal,
                                                                      _array);
        });
        
        it('should yield the first element to the block', function() {
          expect(doDetectTruePassingIfNone().callbacks[1][0].arguments).to(equal,
                                                                           ['foo']);
        });
        
        it('should return the first element', function() {
          expect(doDetectTruePassingIfNone().returnValue).to(equal, 'foo');
        });
        
        it('should not mutate itself', function() {
          doDetectTruePassingIfNone();
          expect(_array).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #detect with an "ifNone" and a block that returns false', function() {
        function doDetectFalsePassingIfNone(block) {
          return doMethod('detect',
                          {'on':   _array,
                           'with': [function() { return 'nothing here'; },
                                    function(s) { return false; }]});
        }
        
        it('should call the "ifNone" once', function() {
          expect(doDetectFalsePassingIfNone().callbacks[0].length).to(equal, 1);
        });
        
        it("should call the \"ifNone\" with itself as the 'this' value", function() {
          expect(doDetectFalsePassingIfNone().callbacks[0][0].this).to(equal,
                                                                       _array);
        });
        
        it('should call the "ifNone" with no arguments', function() {
          expect(doDetectFalsePassingIfNone().callbacks[0][0].arguments).to(be_empty);
        });
        
        it('should yield to the block twice', function() {
          expect(doDetectFalsePassingIfNone().callbacks[1].length).to(equal, 2);
        });
        
        it("should yield to the block with itself as the 'this' value the first time", function() {
          expect(doDetectFalsePassingIfNone().callbacks[1][0].this).to(equal,
                                                                       _array);
        });
        
        it("should yield to the block with itself as the 'this' value the second time", function() {
          expect(doDetectFalsePassingIfNone().callbacks[1][1].this).to(equal,
                                                                       _array);
        });
        
        it('should yield the first element to the block the first time', function() {
          expect(doDetectFalsePassingIfNone().callbacks[1][0].arguments).to(equal,
                                                                            ['foo']);
        });
        
        it('should yield the second element to the block the second time', function() {
          expect(doDetectFalsePassingIfNone().callbacks[1][1].arguments).to(equal,
                                                                            ['bar']);
        });
        
        it('should return the result of the "ifNone"', function() {
          expect(doDetectFalsePassingIfNone().returnValue).to(equal,
                                                              'nothing here');
        });
        
        it('should not mutate itself', function() {
          doDetectFalsePassingIfNone();
          expect(_array).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #each with a block', function() {
        function doEach() {
          return doMethod('each',
                          {'on':   _array,
                           'with': function(s) { }});
        }
        
        it('should yield twice', function() {
          expect(doEach().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doEach().callbacks[0][0].this).to(equal, _array);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doEach().callbacks[0][1].this).to(equal, _array);
        });
        
        it('should yield the first element the first time', function() {
          expect(doEach().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should yield the second element the second time', function() {
          expect(doEach().callbacks[0][1].arguments).to(equal, ['bar']);
        });
        
        it('should return itself', function() {
          expect(doEach().returnValue).to(equal, _array);
        });
        
        it('should not mutate itself', function() {
          doEach();
          expect(_array).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #eachWithIndex with a block', function() {
        function doEachWithIndex() {
          return doMethod('eachWithIndex',
                          {'on':   _array,
                           'with': function(s, i) { }});
        }
        
        it('should yield twice', function() {
          expect(doEachWithIndex().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doEachWithIndex().callbacks[0][0].this).to(equal, _array);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doEachWithIndex().callbacks[0][1].this).to(equal, _array);
        });
        
        it('should yield the first element and 0 the first time', function() {
          expect(doEachWithIndex().callbacks[0][0].arguments).to(equal,
                                                                 ['foo', 0]);
        });
        
        it('should yield the second element and 1 the first time', function() {
          expect(doEachWithIndex().callbacks[0][1].arguments).to(equal,
                                                                 ['bar', 1]);
        });
        
        it('should return itself', function() {
          expect(doEachWithIndex().returnValue).to(equal, _array);
        });
        
        it('should not mutate itself', function() {
          doEachWithIndex();
          expect(_array).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #find with a block that returns true', function() {
        function doFindTrue() {
          return doMethod('find',
                          {'on':   _array,
                           'with': function(s) { return true; }});
        }
        
        it('should yield once', function() {
          expect(doFindTrue().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doFindTrue().callbacks[0][0].this).to(equal, _array);
        });
        
        it('should yield the first element', function() {
          expect(doFindTrue().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return the first element', function() {
          expect(doFindTrue().returnValue).to(equal, 'foo');
        });
        
        it('should not mutate itself', function() {
          doFindTrue();
          expect(_array).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #find with a block that returns false', function() {
        function doFindFalse() {
          return doMethod('find',
                          {'on':   _array,
                           'with': function(s) { return false; }});
        }
        
        it('should yield twice', function() {
          expect(doFindFalse().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doFindFalse().callbacks[0][0].this).to(equal, _array);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doFindFalse().callbacks[0][1].this).to(equal, _array);
        });
        
        it('should yield the first element the first time', function() {
          expect(doFindFalse().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should yield the second element the second time', function() {
          expect(doFindFalse().callbacks[0][1].arguments).to(equal, ['bar']);
        });
        
        it('should return null', function() {
          expect(doFindFalse().returnValue).to(be_null);
        });
        
        it('should not mutate itself', function() {
          doFindFalse();
          expect(_array).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #find with an "ifNone" and a block that returns true', function() {
        function doFindTruePassingIfNone(block) {
          return doMethod('find',
                          {'on':   _array,
                           'with': [function() { return 'nothing here'; },
                                    function(s) { return true; }]});
        }
        
        it('should not call the "ifNone"', function() {
          expect(doFindTruePassingIfNone().callbacks[0]).to(be_empty);
        });
        
        it('should yield to the block once', function() {
          expect(doFindTruePassingIfNone().callbacks[1].length).to(equal, 1);
        });
        
        it("should yield to the block with itself as the 'this' value", function() {
          expect(doFindTruePassingIfNone().callbacks[1][0].this).to(equal,
                                                                    _array);
        });
        
        it('should yield the first element to the block', function() {
          expect(doFindTruePassingIfNone().callbacks[1][0].arguments).to(equal,
                                                                         ['foo']);
        });
        
        it('should return the first element', function() {
          expect(doFindTruePassingIfNone().returnValue).to(equal, 'foo');
        });
        
        it('should not mutate itself', function() {
          doFindTruePassingIfNone();
          expect(_array).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #find with an "ifNone" and a block that returns false', function() {
        function doFindFalsePassingIfNone(block) {
          return doMethod('find',
                          {'on':   _array,
                           'with': [function() { return 'nothing here'; },
                                    function(s) { return false; }]});
        }
        
        it('should call the "ifNone" once', function() {
          expect(doFindFalsePassingIfNone().callbacks[0].length).to(equal, 1);
        });
        
        it("should call the \"ifNone\" with itself as the 'this' value", function() {
          expect(doFindFalsePassingIfNone().callbacks[0][0].this).to(equal,
                                                                     _array);
        });
        
        it('should call the "ifNone" with no arguments', function() {
          expect(doFindFalsePassingIfNone().callbacks[0][0].arguments).to(be_empty);
        });
        
        it('should yield to the block twice', function() {
          expect(doFindFalsePassingIfNone().callbacks[1].length).to(equal, 2);
        });
        
        it("should yield to the block with itself as the 'this' value the first time", function() {
          expect(doFindFalsePassingIfNone().callbacks[1][0].this).to(equal,
                                                                     _array);
        });
        
        it("should yield to the block with itself as the 'this' value the second time", function() {
          expect(doFindFalsePassingIfNone().callbacks[1][1].this).to(equal,
                                                                     _array);
        });
        
        it('should yield the first element to the block the first time', function() {
          expect(doFindFalsePassingIfNone().callbacks[1][0].arguments).to(equal,
                                                                          ['foo']);
        });
        
        it('should yield the second element to the block the second time', function() {
          expect(doFindFalsePassingIfNone().callbacks[1][1].arguments).to(equal,
                                                                          ['bar']);
        });
        
        it('should return the result of the "ifNone"', function() {
          expect(doFindFalsePassingIfNone().returnValue).to(equal,
                                                            'nothing here');
        });
        
        it('should not mutate itself', function() {
          doFindFalsePassingIfNone();
          expect(_array).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #inject with a block', function() {
        function doInject() {
          return doMethod('inject',
                          {'on':   _array,
                           'with': function(memo, s) { return 'item: ' + s; }});
        }
        
        it('should yield once', function() {
          expect(doInject().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doInject().callbacks[0][0].this).to(equal, _array);
        });
        
        it('should yield the first and the second element', function() {
          expect(doInject().callbacks[0][0].arguments).to(equal, ['foo', 'bar']);
        });
        
        it('should return the value returned by the block', function() {
          expect(doInject().returnValue).to(equal, 'item: bar');
        });
        
        it('should not mutate itself', function() {
          doInject();
          expect(_array).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #inject with an "initial" and a block', function() {
        function doInjectWithInitial() {
          return doMethod('inject',
                          {'on':   _array,
                           'with': ['starting point',
                                    function(memo, s) {
                                      return 'item: ' + s;
                                    }]});
        }
        
        it('should yield twice', function() {
          expect(doInjectWithInitial().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doInjectWithInitial().callbacks[0][0].this).to(equal, _array);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doInjectWithInitial().callbacks[0][1].this).to(equal, _array);
        });
        
        it('should yield the "initial" and the first element the first time', function() {
          expect(doInjectWithInitial().callbacks[0][0].arguments).to(equal,
                                                                     ['starting point',
                                                                      'foo']);
        });
        
        it('should yield the first value returned by the block and the second element the second time', function() {
          expect(doInjectWithInitial().callbacks[0][1].arguments).to(equal,
                                                                     ['item: foo',
                                                                      'bar']);
        });
        
        it('should return the last value returned by the block', function() {
          expect(doInjectWithInitial().returnValue).to(equal, 'item: bar');
        });
        
        it('should not mutate itself', function() {
          doInjectWithInitial();
          expect(_array).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #map with a block', function() {
        function doMap() {
          return doMethod('map',
                          {'on':   _array,
                           'with': function(s) { return 'item: ' + s; }});
        }
        
        it('should yield twice', function() {
          expect(doMap().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doMap().callbacks[0][0].this).to(equal, _array);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doMap().callbacks[0][1].this).to(equal, _array);
        });
        
        it('should yield the first element the first time', function() {
          expect(doMap().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should yield the second element the second time', function() {
          expect(doMap().callbacks[0][1].arguments).to(equal, ['bar']);
        });
        
        it('should return an array containing the values returned by the block', function() {
          expect(doMap().returnValue).to(equal, ['item: foo', 'item: bar']);
        });
        
        it('should not mutate itself', function() {
          doMap();
          expect(_array).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #mapThis with a block', function() {
        function doMapThis() {
          return doMethod('mapThis',
                          {'on':   _array,
                           'with': function(s) { return 'item: ' + s; }});
        }
        
        it('should yield twice', function() {
          expect(doMapThis().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doMapThis().callbacks[0][0].this).to(equal, _array);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doMapThis().callbacks[0][1].this).to(equal, _array);
        });
        
        it('should yield the first element the first time', function() {
          expect(doMapThis().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should yield the second element the second time', function() {
          expect(doMapThis().callbacks[0][1].arguments).to(equal, ['bar']);
        });
        
        it('should return itself', function() {
          expect(doMapThis().returnValue).to(equal, _array);
        });
        
        it('should mutate itself as expected', function() {
          doMapThis();
          expect(_array).to(equal, ['item: foo', 'item: bar']);
        });
      });
    });
    
    describe('with one non-null element and one null element', function() {
      var _array = null;
      
      before(function() {
        _array = ['foo', null];
      });
      
      describe('when sent #areAll without a block', function() {
        function doAreAllNoBlock() {
          return doMethod('areAll', {'on': _array});
        }
        
        it('should return false', function() {
          expect(doAreAllNoBlock().returnValue).to(be_false);
        });
        
        it('should not mutate itself', function() {
          doAreAllNoBlock();
          expect(_array).to(equal, ['foo', null]);
        });
      });
    });
    
    describe('with one true element and one false element', function() {
      var _array = null;
      
      before(function() {
        _array = [true, false];
      });
      
      describe('when sent #areAll without a block', function() {
        function doAreAllNoBlock() {
          return doMethod('areAll', {'on': _array});
        }
        
        it('should return false', function() {
          expect(doAreAllNoBlock().returnValue).to(be_false);
        });
        
        it('should not mutate itself', function() {
          doAreAllNoBlock();
          expect(_array).to(equal, [true, false]);
        });
      });
    });
  });
});
