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
      if (options.with === undefined) {
        options.with = [];
      } else if (! (options.with instanceof Array)) {
        options.with = [options.with];
      }
      
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
      
      describe('when sent ::new with 2', function() {
        function doNewPassing2() {
          return doMethod('new', {'on': Array, 'with': 2});
        }
        
        it('should return an array containing two null values', function() {
          expect(doNewPassing2().returnValue).to(equal, [null, null]);
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
      
      describe('when sent ::new with 1 and a block', function() {
        function doNewPassing1AndBlock() {
          return doMethod('new',
                          {'on': Array,
                           'with': [1, function(i) { return 'item ' + i; }]});
        }
        
        it('should yield once', function() {
          expect(doNewPassing1AndBlock().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doNewPassing1AndBlock().callbacks[0][0].this).to(equal, Array);
        });
        
        it('should yield 0', function() {
          expect(doNewPassing1AndBlock().callbacks[0][0].arguments).to(equal, [0]);
        });
        
        it('should return an array containing the return value of the block', function() {
          expect(doNewPassing1AndBlock().returnValue).to(equal, ['item 0']);
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
    
    describe('that is empty', function() {
      var array_ = null;
      
      before(function() {
        array_ = [];
      });
      
      describe('when sent #areAll with a block', function() {
        function doAreAll() {
          return doMethod('areAll', {'on': array_, 'with': function(s) { }});
        }
        
        it('should not yield', function() {
          expect(doAreAll().callbacks[0]).to(be_empty);
        });
        
        it('should return true', function() {
          expect(doAreAll().returnValue).to(equal, true);
        });
        
        it('should not mutate itself', function() {
          doAreAll();
          expect(array_).to(equal, []);
        });
      });
      
      describe('when sent #areAll without a block', function() {
        function doAreAllNoBlock() {
          return doMethod('areAll', {'on': array_});
        }
        
        it('should return true', function() {
          expect(doAreAllNoBlock().returnValue).to(equal, true);
        });
        
        it('should not mutate itself', function() {
          doAreAllNoBlock();
          expect(array_).to(equal, []);
        });
      });
      
      describe('when sent #areAny with a block', function() {
        function doAreAny() {
          return doMethod('areAny', {'on': array_, 'with': function(s) { }});
        }
        
        it('should not yield', function() {
          expect(doAreAny().callbacks[0]).to(be_empty);
        });
        
        it('should return false', function() {
          expect(doAreAny().returnValue).to(equal, false);
        });
        
        it('should not mutate itself', function() {
          doAreAny();
          expect(array_).to(equal, []);
        });
      });
      
      describe('when sent #areAny without a block', function() {
        function doAreAnyNoBlock() {
          return doMethod('areAny', {'on': array_});
        }
        
        it('should return false', function() {
          expect(doAreAnyNoBlock().returnValue).to(equal, false);
        });
        
        it('should not mutate itself', function() {
          doAreAnyNoBlock();
          expect(array_).to(equal, []);
        });
      });
      
      describe('when sent #collect with a block', function() {
        function doCollect() {
          return doMethod('collect', {'on': array_, 'with': function(s) { }});
        }
        
        it('should not yield', function() {
          expect(doCollect().callbacks[0]).to(be_empty);
        });
        
        it('should return itself', function() {
          expect(doCollect().returnValue).to(equal, array_);
        });
        
        it('should not mutate itself', function() {
          doCollect();
          expect(array_).to(equal, []);
        });
      });
      
      describe('when sent #collectThis with a block', function() {
        function doCollectThis() {
          return doMethod('collectThis',
                          {'on':   array_,
                           'with': function(s) { }});
        }
        
        it('should not yield', function() {
          expect(doCollectThis().callbacks[0]).to(be_empty);
        });
        
        it('should return itself', function() {
          expect(doCollectThis().returnValue).to(equal, array_);
        });
        
        it('should not mutate itself', function() {
          doCollectThis();
          expect(array_).to(equal, []);
        });
      });
      
      describe('when sent #detect with a block', function() {
        function doDetect() {
          return doMethod('detect', {'on': array_, 'with': function(s) { }});
        }
        
        it('should not yield', function() {
          expect(doDetect().callbacks[0]).to(be_empty);
        });
        
        it('should return null', function() {
          expect(doDetect().returnValue).to(be_null);
        });
        
        it('should not mutate itself', function() {
          doDetect();
          expect(array_).to(equal, []);
        });
      });
      
      describe('when sent #detect with an "ifNone" and a block', function() {
        function doDetectPassingIfNone(block) {
          return doMethod('detect',
                          {'on':   array_,
                           'with': [function() { return 'nothing here'; },
                                    function(s) { }]});
        }
        
        it('should call the "ifNone" once', function() {
          expect(doDetectPassingIfNone().callbacks[0].length).to(equal, 1);
        });
        
        it("should call the \"ifNone\" with itself as the 'this' value", function() {
          expect(doDetectPassingIfNone().callbacks[0][0].this).to(equal, array_);
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
          expect(array_).to(equal, []);
        });
      });
      
      describe('when sent #doesInclude', function() {
        function doDoesInclude() {
          return doMethod('doesInclude', {'on': array_, 'with': 'foo'});
        }
        
        it('should return false', function() {
          expect(doDoesInclude().returnValue).to(equal, false);
        });
        
        it('should not mutate itself', function() {
          doDoesInclude();
          expect(array_).to(equal, []);
        });
      });
      
      describe('when sent #each with a block', function() {
        function doEach() {
          return doMethod('each', {'on': array_, 'with': function(s) { }});
        }
        
        it('should not yield', function() {
          expect(doEach().callbacks[0]).to(be_empty);
        });
        
        it('should return itself', function() {
          expect(doEach().returnValue).to(equal, array_);
        });
        
        it('should not mutate itself', function() {
          doEach();
          expect(array_).to(equal, []);
        });
      });
      
      describe('when sent #eachCons with 1 and a block', function() {
        function doEachCons() {
          return doMethod('eachCons',
                          {'on': array_, 'with': [1, function(s) { }]});
        }
        
        it('should not yield', function() {
          expect(doEachCons().callbacks[0]).to(be_empty);
        });
        
        it('should return itself', function() {
          expect(doEachCons().returnValue).to(equal, array_);
        });
        
        it('should not mutate itself', function() {
          doEachCons();
          expect(array_).to(equal, []);
        });
      });
      
      describe('when sent #eachSlice with 1 and a block', function() {
        function doEachSlice() {
          return doMethod('eachSlice',
                          {'on': array_, 'with': [1, function(s) { }]});
        }
        
        it('should not yield', function() {
          expect(doEachSlice().callbacks[0]).to(be_empty);
        });
        
        it('should return itself', function() {
          expect(doEachSlice().returnValue).to(equal, array_);
        });
        
        it('should not mutate itself', function() {
          doEachSlice();
          expect(array_).to(equal, []);
        });
      });
      
      describe('when sent #eachWithIndex with a block', function() {
        function doEachWithIndex() {
          return doMethod('eachWithIndex',
                          {'on':   array_,
                           'with': function(s, i) { }});
        }
        
        it('should not yield', function() {
          expect(doEachWithIndex().callbacks[0]).to(be_empty);
        });
        
        it('should return itself', function() {
          expect(doEachWithIndex().returnValue).to(equal, array_);
        });
        
        it('should not mutate itself', function() {
          doEachWithIndex();
          expect(array_).to(equal, []);
        });
      });
      
      describe('when sent #find with a block', function() {
        function doFind() {
          return doMethod('find', {'on': array_, 'with': function(s) { }});
        }
        
        it('should not yield', function() {
          expect(doFind().callbacks[0]).to(be_empty);
        });
        
        it('should return null', function() {
          expect(doFind().returnValue).to(be_null);
        });
        
        it('should not mutate itself', function() {
          doFind();
          expect(array_).to(equal, []);
        });
      });
      
      describe('when sent #find with an "ifNone" and a block', function() {
        function doFindPassingIfNone(block) {
          return doMethod('find',
                          {'on':   array_,
                           'with': [function() { return 'nothing here'; },
                                    function(s) { }]});
        }
        
        it('should call the "ifNone" once', function() {
          expect(doFindPassingIfNone().callbacks[0].length).to(equal, 1);
        });
        
        it("should call the \"ifNone\" with itself as the 'this' value", function() {
          expect(doFindPassingIfNone().callbacks[0][0].this).to(equal, array_);
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
          expect(array_).to(equal, []);
        });
      });
      
      describe('when sent #findAll with a block', function() {
        function doFindAll() {
          return doMethod('findAll', {'on': array_, 'with': function(s) { }});
        }
        
        it('should not yield', function() {
          expect(doFindAll().callbacks[0]).to(be_empty);
        });
        
        it('should return itself', function() {
          expect(doFindAll().returnValue).to(equal, array_);
        });
        
        it('should not mutate itself', function() {
          doFindAll();
          expect(array_).to(equal, []);
        });
      });
      
      describe('when sent #grep with a matching Regexp', function() {
        function doGrepMatching() {
          return doMethod('grep', {'on': array_, 'with': /./});
        }
        
        it('should return an empty array', function() {
          expect(doGrepMatching().returnValue).to(be_empty);
        });
        
        it('should not mutate itself', function() {
          doGrepMatching();
          expect(array_).to(equal, []);
        });
      });
      
      describe('when sent #grep with a matching Regexp and a block', function() {
        function doGrepMatchingPassingBlock() {
          return doMethod('grep',
                          {'on': array_, 'with': [/./, function(s) { }]});
        }
        
        it('should not yield', function() {
          expect(doGrepMatchingPassingBlock().callbacks[0]).to(be_empty);
        });
        
        it('should return itself', function() {
          expect(doGrepMatchingPassingBlock().returnValue).to(equal, array_);
        });
        
        it('should not mutate itself', function() {
          doGrepMatchingPassingBlock();
          expect(array_).to(equal, []);
        });
      });
      
      describe('when sent #hasMember', function() {
        function doHasMember() {
          return doMethod('hasMember', {'on': array_, 'with': 'foo'});
        }
        
        it('should return false', function() {
          expect(doHasMember().returnValue).to(equal, false);
        });
        
        it('should not mutate itself', function() {
          doHasMember();
          expect(array_).to(equal, []);
        });
      });
      
      describe('when sent #inject with a block', function() {
        function doInject() {
          return doMethod('inject',
                          {'on':   array_,
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
          expect(array_).to(equal, []);
        });
      });
      
      describe('when sent #inject with an "initial" and a block', function() {
        function doInjectPassingInitial(block) {
          return doMethod('inject',
                          {'on':   array_,
                           'with': ['starting point',
                                    function(memo, s) { }]});
        }
        
        it('should not yield', function() {
          expect(doInjectPassingInitial().callbacks[0]).to(be_empty);
        });
        
        it('should return the "initial"', function() {
          expect(doInjectPassingInitial().returnValue).to(equal,
                                                          'starting point');
        });
        
        it('should not mutate itself', function() {
          doInjectPassingInitial();
          expect(array_).to(equal, []);
        });
      });
      
      describe('when sent #map with a block', function() {
        function doMap() {
          return doMethod('map', {'on': array_, 'with': function(s) { }});
        }
        
        it('should not yield', function() {
          expect(doMap().callbacks[0]).to(be_empty);
        });
        
        it('should return itself', function() {
          expect(doMap().returnValue).to(equal, array_);
        });
        
        it('should not mutate itself', function() {
          doMap();
          expect(array_).to(equal, []);
        });
      });
      
      describe('when sent #mapThis with a block', function() {
        function doMapThis() {
          return doMethod('mapThis', {'on': array_, 'with': function(s) { }});
        }
        
        it('should not yield', function() {
          expect(doMapThis().callbacks[0]).to(be_empty);
        });
        
        it('should return itself', function() {
          expect(doMapThis().returnValue).to(equal, array_);
        });
        
        it('should not mutate itself', function() {
          doMapThis();
          expect(array_).to(equal, []);
        });
      });
      
      describe('when sent #partition with a block', function() {
        function doPartition() {
          return doMethod('partition', {'on': array_, 'with': function(s) { }});
        }
        
        it('should not yield', function() {
          expect(doPartition().callbacks[0]).to(be_empty);
        });
        
        it('should return an array of two elements', function() {
          expect(doPartition().returnValue.length).to(equal, 2);
        });
        
        it('should return an array whose first element is an empty array', function() {
          expect(doPartition().returnValue[0]).to(be_empty);
        });
        
        it('should return an array whose second element is an empty array', function() {
          expect(doPartition().returnValue[1]).to(be_empty);
        });
        
        it('should not mutate itself', function() {
          doPartition();
          expect(array_).to(equal, []);
        });
      });
      
      describe('when sent #reject with a block', function() {
        function doReject() {
          return doMethod('reject', {'on': array_, 'with': function(s) { }});
        }
        
        it('should not yield', function() {
          expect(doReject().callbacks[0]).to(be_empty);
        });
        
        it('should return itself', function() {
          expect(doReject().returnValue).to(equal, array_);
        });
        
        it('should not mutate itself', function() {
          doReject();
          expect(array_).to(equal, []);
        });
      });
      
      describe('when sent #select with a block', function() {
        function doSelect() {
          return doMethod('select', {'on': array_, 'with': function(s) { }});
        }
        
        it('should not yield', function() {
          expect(doSelect().callbacks[0]).to(be_empty);
        });
        
        it('should return itself', function() {
          expect(doSelect().returnValue).to(equal, array_);
        });
        
        it('should not mutate itself', function() {
          doSelect();
          expect(array_).to(equal, []);
        });
      });
    });
    
    describe('with one non-null element', function() {
      var array_ = null;
      
      before(function() {
        array_ = ['foo'];
      });
      
      describe('when sent #areAll with a block that returns true', function() {
        function doAreAllTrue() {
          return doMethod('areAll',
                          {'on':   array_,
                           'with': function(s) { return true; }});
        }
        
        it('should yield once', function() {
          expect(doAreAllTrue().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doAreAllTrue().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the element', function() {
          expect(doAreAllTrue().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return true', function() {
          expect(doAreAllTrue().returnValue).to(be_true);
        });
        
        it('should not mutate itself', function() {
          doAreAllTrue();
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #areAll with a block that returns false', function() {
        function doAreAllFalse() {
          return doMethod('areAll',
                          {'on':   array_,
                           'with': function(s) { return false; }});
        }
        
        it('should yield once', function() {
          expect(doAreAllFalse().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doAreAllFalse().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the element', function() {
          expect(doAreAllFalse().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return false', function() {
          expect(doAreAllFalse().returnValue).to(be_false);
        });
        
        it('should not mutate itself', function() {
          doAreAllFalse();
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #areAll without a block', function() {
        function doAreAllNoBlock() {
          return doMethod('areAll', {'on': array_});
        }
        
        it('should return true', function() {
          expect(doAreAllNoBlock().returnValue).to(be_true);
        });
        
        it('should not mutate itself', function() {
          doAreAllNoBlock();
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #areAny with a block that returns true', function() {
        function doAreAnyTrue() {
          return doMethod('areAny',
                          {'on':   array_,
                           'with': function(s) { return true; }});
        }
        
        it('should yield once', function() {
          expect(doAreAnyTrue().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doAreAnyTrue().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the element', function() {
          expect(doAreAnyTrue().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return true', function() {
          expect(doAreAnyTrue().returnValue).to(be_true);
        });
        
        it('should not mutate itself', function() {
          doAreAnyTrue();
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #areAny with a block that returns false', function() {
        function doAreAnyFalse() {
          return doMethod('areAny',
                          {'on':   array_,
                           'with': function(s) { return false; }});
        }
        
        it('should yield once', function() {
          expect(doAreAnyFalse().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doAreAnyFalse().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the element', function() {
          expect(doAreAnyFalse().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return false', function() {
          expect(doAreAnyFalse().returnValue).to(be_false);
        });
        
        it('should not mutate itself', function() {
          doAreAnyFalse();
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #areAny without a block', function() {
        function doAreAnyNoBlock() {
          return doMethod('areAny', {'on': array_});
        }
        
        it('should return true', function() {
          expect(doAreAnyNoBlock().returnValue).to(be_true);
        });
        
        it('should not mutate itself', function() {
          doAreAnyNoBlock();
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #collect with a block', function() {
        function doCollect() {
          return doMethod('collect',
                          {'on':   array_,
                           'with': function(s) { return 'item: ' + s; }});
        }
        
        it('should yield once', function() {
          expect(doCollect().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doCollect().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the element', function() {
          expect(doCollect().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return an array containing the value returned by the block', function() {
          expect(doCollect().returnValue).to(equal, ['item: foo']);
        });
        
        it('should not mutate itself', function() {
          doCollect();
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #collectThis with a block', function() {
        function doCollectThis() {
          return doMethod('collectThis',
                          {'on':   array_,
                           'with': function(s) { return 'item: ' + s; }});
        }
        
        it('should yield once', function() {
          expect(doCollectThis().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doCollectThis().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the element', function() {
          expect(doCollectThis().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return itself', function() {
          expect(doCollectThis().returnValue).to(equal, array_);
        });
        
        it('should mutate itself as expected', function() {
          doCollectThis();
          expect(array_).to(equal, ['item: foo']);
        });
      });
      
      describe('when sent #detect with a block that returns true', function() {
        function doDetectTrue() {
          return doMethod('detect',
                          {'on':   array_,
                           'with': function(s) { return true; }});
        }
        
        it('should yield once', function() {
          expect(doDetectTrue().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doDetectTrue().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the element', function() {
          expect(doDetectTrue().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return the element', function() {
          expect(doDetectTrue().returnValue).to(equal, 'foo');
        });
        
        it('should not mutate itself', function() {
          doDetectTrue();
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #detect with a block that returns false', function() {
        function doDetectFalse() {
          return doMethod('detect',
                          {'on':   array_,
                           'with': function(s) { return false; }});
        }
        
        it('should yield once', function() {
          expect(doDetectFalse().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doDetectFalse().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the element', function() {
          expect(doDetectFalse().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return null', function() {
          expect(doDetectFalse().returnValue).to(be_null);
        });
        
        it('should not mutate itself', function() {
          doDetectFalse();
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #detect with an "ifNone" and a block that returns true', function() {
        function doDetectTruePassingIfNone(block) {
          return doMethod('detect',
                          {'on':   array_,
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
                                                                      array_);
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
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #detect with an "ifNone" and a block that returns false', function() {
        function doDetectFalsePassingIfNone(block) {
          return doMethod('detect',
                          {'on':   array_,
                           'with': [function() { return 'nothing here'; },
                                    function(s) { return false; }]});
        }
        
        it('should call the "ifNone" once', function() {
          expect(doDetectFalsePassingIfNone().callbacks[0].length).to(equal, 1);
        });
        
        it("should call the \"ifNone\" with itself as the 'this' value", function() {
          expect(doDetectFalsePassingIfNone().callbacks[0][0].this).to(equal,
                                                                       array_);
        });
        
        it('should call the "ifNone" with no arguments', function() {
          expect(doDetectFalsePassingIfNone().callbacks[0][0].arguments).to(be_empty);
        });
        
        it('should yield to the block once', function() {
          expect(doDetectFalsePassingIfNone().callbacks[1].length).to(equal, 1);
        });
        
        it("should yield to the block with itself as the 'this' value", function() {
          expect(doDetectFalsePassingIfNone().callbacks[1][0].this).to(equal,
                                                                       array_);
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
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #doesInclude with a member', function() {
        function doDoesIncludePassingMember() {
          return doMethod('doesInclude', {'on': array_, 'with': 'foo'});
        }
        
        it('should return true', function() {
          expect(doDoesIncludePassingMember().returnValue).to(equal, true);
        });
        
        it('should not mutate itself', function() {
          doDoesIncludePassingMember();
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #doesInclude with a non-member', function() {
        function doDoesIncludePassingNonmember() {
          return doMethod('doesInclude',
                          {'on': array_, 'with': 'something else'});
        }
        
        it('should return false', function() {
          expect(doDoesIncludePassingNonmember().returnValue).to(equal, false);
        });
        
        it('should not mutate itself', function() {
          doDoesIncludePassingNonmember();
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #each with a block', function() {
        function doEach() {
          return doMethod('each',
                          {'on':   array_,
                           'with': function(s) { }});
        }
        
        it('should yield once', function() {
          expect(doEach().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doEach().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the element', function() {
          expect(doEach().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return itself', function() {
          expect(doEach().returnValue).to(equal, array_);
        });
        
        it('should not mutate itself', function() {
          doEach();
          expect(array_).to(equal, ['foo']);
        });
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
      
      describe('when sent #eachWithIndex with a block', function() {
        function doEachWithIndex() {
          return doMethod('eachWithIndex',
                          {'on':   array_,
                           'with': function(s, i) { }});
        }
        
        it('should yield once', function() {
          expect(doEachWithIndex().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doEachWithIndex().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the element and 0', function() {
          expect(doEachWithIndex().callbacks[0][0].arguments).to(equal,
                                                                 ['foo', 0]);
        });
        
        it('should return itself', function() {
          expect(doEachWithIndex().returnValue).to(equal, array_);
        });
        
        it('should not mutate itself', function() {
          doEachWithIndex();
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #find with a block that returns true', function() {
        function doFindTrue() {
          return doMethod('find',
                          {'on':   array_,
                           'with': function(s) { return true; }});
        }
        
        it('should yield once', function() {
          expect(doFindTrue().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doFindTrue().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the element', function() {
          expect(doFindTrue().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return the element', function() {
          expect(doFindTrue().returnValue).to(equal, 'foo');
        });
        
        it('should not mutate itself', function() {
          doFindTrue();
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #find with a block that returns false', function() {
        function doFindFalse() {
          return doMethod('find',
                          {'on':   array_,
                           'with': function(s) { return false; }});
        }
        
        it('should yield once', function() {
          expect(doFindFalse().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doFindFalse().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the element', function() {
          expect(doFindFalse().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return null', function() {
          expect(doFindFalse().returnValue).to(be_null);
        });
        
        it('should not mutate itself', function() {
          doFindFalse();
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #find with an "ifNone" and a block that returns true', function() {
        function doFindTruePassingIfNone(block) {
          return doMethod('find',
                          {'on':   array_,
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
                                                                    array_);
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
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #find with an "ifNone" and a block that returns false', function() {
        function doFindFalsePassingIfNone(block) {
          return doMethod('find',
                          {'on':   array_,
                           'with': [function() { return 'nothing here'; },
                                    function(s) { return false; }]});
        }
        
        it('should call the "ifNone" once', function() {
          expect(doFindFalsePassingIfNone().callbacks[0].length).to(equal, 1);
        });
        
        it("should call the \"ifNone\" with itself as the 'this' value", function() {
          expect(doFindFalsePassingIfNone().callbacks[0][0].this).to(equal,
                                                                     array_);
        });
        
        it('should call the "ifNone" with no arguments', function() {
          expect(doFindFalsePassingIfNone().callbacks[0][0].arguments).to(be_empty);
        });
        
        it('should yield to the block once', function() {
          expect(doFindFalsePassingIfNone().callbacks[1].length).to(equal, 1);
        });
        
        it("should yield to the block with itself as the 'this' value", function() {
          expect(doFindFalsePassingIfNone().callbacks[1][0].this).to(equal,
                                                                     array_);
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
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #findAll with a block that returns true', function() {
        function doFindAllTrue() {
          return doMethod('findAll',
                          {'on': array_, 'with': function(s) { return true; }});
        }
        
        it('should yield once', function() {
          expect(doFindAllTrue().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doFindAllTrue().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the element', function() {
          expect(doFindAllTrue().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return the array', function() {
          expect(doFindAllTrue().returnValue).to(equal, ['foo']);
        });
        
        it('should not mutate itself', function() {
          doFindAllTrue();
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #findAll with a block that returns false', function() {
        function doFindAllFalse() {
          return doMethod('findAll',
                          {'on': array_,
                           'with': function(s) { return false; }});
        }
        
        it('should yield once', function() {
          expect(doFindAllFalse().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doFindAllFalse().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the element', function() {
          expect(doFindAllFalse().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return an empty array', function() {
          expect(doFindAllFalse().returnValue).to(be_empty);
        });
        
        it('should not mutate itself', function() {
          doFindAllFalse();
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #grep with a matching Regexp', function() {
        function doGrepMatching() {
          return doMethod('grep', {'on': array_, 'with': /./});
        }
        
        it('should return an array containing the element', function() {
          expect(doGrepMatching().returnValue).to(equal, ['foo']);
        });
        
        it('should not mutate itself', function() {
          doGrepMatching();
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #grep with a non-matching Regexp', function() {
        function doGrepNonmatching() {
          return doMethod('grep', {'on': array_, 'with': /not a match/});
        }
        
        it('should return an empty array', function() {
          expect(doGrepNonmatching().returnValue).to(be_empty);
        });
        
        it('should not mutate itself', function() {
          doGrepNonmatching();
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #grep with a matching Regexp and a block', function() {
        function doGrepMatchingPassingBlock() {
          return doMethod('grep',
                          {'on': array_,
                           'with': [/./,
                                    function(s) { return 'item: ' + s; }]});
        }
        
        it('should yield once', function() {
          expect(doGrepMatchingPassingBlock().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doGrepMatchingPassingBlock().callbacks[0][0].this).to(equal,
                                                                       array_);
        });
        
        it('should yield the element', function() {
          expect(doGrepMatchingPassingBlock().callbacks[0][0].arguments).to(equal,
                                                                            ['foo']);
        });
        
        it('should return an array containing the value returned by the block', function() {
          expect(doGrepMatchingPassingBlock().returnValue).to(equal,
                                                              ['item: foo']);
        });
        
        it('should not mutate itself', function() {
          doGrepMatchingPassingBlock();
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #grep with a non-matching Regexp and a block', function() {
        function doGrepNonmatchingPassingBlock() {
          return doMethod('grep',
                          {'on': array_,
                           'with': [/\d/,
                                    function(s) { return 'item: ' + s; }]});
        }
        
        it('should not yield', function() {
          expect(doGrepNonmatchingPassingBlock().callbacks[0]).to(be_empty);
        });
        
        it('should return an empty array', function() {
          expect(doGrepNonmatchingPassingBlock().returnValue).to(be_empty);
        });
        
        it('should not mutate itself', function() {
          doGrepNonmatchingPassingBlock();
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #hasMember with a member', function() {
        function doHasMemberPassingMember() {
          return doMethod('hasMember', {'on': array_, 'with': 'foo'});
        }
        
        it('should return true', function() {
          expect(doHasMemberPassingMember().returnValue).to(equal, true);
        });
        
        it('should not mutate itself', function() {
          doHasMemberPassingMember();
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #hasMember with a non-member', function() {
        function doHasMemberPassingNonmember() {
          return doMethod('hasMember',
                          {'on': array_, 'with': 'something else'});
        }
        
        it('should return false', function() {
          expect(doHasMemberPassingNonmember().returnValue).to(equal, false);
        });
        
        it('should not mutate itself', function() {
          doHasMemberPassingNonmember();
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #inject with a block', function() {
        function doInject() {
          return doMethod('inject',
                          {'on':   array_,
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
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #inject with an "initial" and a block', function() {
        function doInjectWithInitial() {
          return doMethod('inject',
                          {'on':   array_,
                           'with': ['starting point',
                                    function(memo, s) {
                                      return 'item: ' + s;
                                    }]});
        }
        
        it('should yield once', function() {
          expect(doInjectWithInitial().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doInjectWithInitial().callbacks[0][0].this).to(equal, array_);
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
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #map with a block', function() {
        function doMap() {
          return doMethod('map',
                          {'on':   array_,
                           'with': function(s) { return 'item: ' + s; }});
        }
        
        it('should yield once', function() {
          expect(doMap().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doMap().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the element', function() {
          expect(doMap().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return an array containing the value returned by the block', function() {
          expect(doMap().returnValue).to(equal, ['item: foo']);
        });
        
        it('should not mutate itself', function() {
          doMap();
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #mapThis with a block', function() {
        function doMapThis() {
          return doMethod('mapThis',
                          {'on':   array_,
                           'with': function(s) { return 'item: ' + s; }});
        }
        
        it('should yield once', function() {
          expect(doMapThis().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doMapThis().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the element', function() {
          expect(doMapThis().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return itself', function() {
          expect(doMapThis().returnValue).to(equal, array_);
        });
        
        it('should mutate itself as expected', function() {
          doMapThis();
          expect(array_).to(equal, ['item: foo']);
        });
      });
      
      describe('when sent #partition with a block that returns true', function() {
        function doPartitionTrue() {
          return doMethod('partition',
                          {'on': array_, 'with': function(s) { return true; }});
        }
        
        it('should yield once', function() {
          expect(doPartitionTrue().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doPartitionTrue().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the element', function() {
          expect(doPartitionTrue().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return an array of two elements', function() {
          expect(doPartitionTrue().returnValue.length).to(equal, 2);
        });
        
        it('should return an array whose first element is an array containing the element', function() {
          expect(doPartitionTrue().returnValue[0]).to(equal, ['foo']);
        });
        
        it('should return an array whose second element is an empty array', function() {
          expect(doPartitionTrue().returnValue[1]).to(be_empty);
        });
        
        it('should not mutate itself', function() {
          doPartitionTrue();
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #partition with a block that returns false', function() {
        function doPartitionFalse() {
          return doMethod('partition',
                          {'on': array_, 'with': function(s) { return false; }});
        }
        
        it('should yield once', function() {
          expect(doPartitionFalse().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doPartitionFalse().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the element', function() {
          expect(doPartitionFalse().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return an array of two elements', function() {
          expect(doPartitionFalse().returnValue.length).to(equal, 2);
        });
        
        it('should return an array whose first element is an empty array', function() {
          expect(doPartitionFalse().returnValue[0]).to(be_empty);
        });
        
        it('should return an array whose second element is an array containing the element', function() {
          expect(doPartitionFalse().returnValue[1]).to(equal, ['foo']);
        });
        
        it('should not mutate itself', function() {
          doPartitionFalse();
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #reject with a block that returns true', function() {
        function doRejectTrue() {
          return doMethod('reject',
                          {'on': array_, 'with': function(s) { return true; }});
        }
        
        it('should yield once', function() {
          expect(doRejectTrue().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doRejectTrue().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the element', function() {
          expect(doRejectTrue().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return an empty array', function() {
          expect(doRejectTrue().returnValue).to(be_empty);
        });
        
        it('should not mutate itself', function() {
          doRejectTrue();
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #reject with a block that returns false', function() {
        function doRejectFalse() {
          return doMethod('reject',
                          {'on': array_,
                           'with': function(s) { return false; }});
        }
        
        it('should yield once', function() {
          expect(doRejectFalse().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doRejectFalse().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the element', function() {
          expect(doRejectFalse().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return the array', function() {
          expect(doRejectFalse().returnValue).to(equal, ['foo']);
        });
        
        it('should not mutate itself', function() {
          doRejectFalse();
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #select with a block that returns true', function() {
        function doSelectTrue() {
          return doMethod('select',
                          {'on': array_, 'with': function(s) { return true; }});
        }
        
        it('should yield once', function() {
          expect(doSelectTrue().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doSelectTrue().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the element', function() {
          expect(doSelectTrue().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return the array', function() {
          expect(doSelectTrue().returnValue).to(equal, ['foo']);
        });
        
        it('should not mutate itself', function() {
          doSelectTrue();
          expect(array_).to(equal, ['foo']);
        });
      });
      
      describe('when sent #select with a block that returns false', function() {
        function doSelectFalse() {
          return doMethod('select',
                          {'on': array_,
                           'with': function(s) { return false; }});
        }
        
        it('should yield once', function() {
          expect(doSelectFalse().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doSelectFalse().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the element', function() {
          expect(doSelectFalse().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return an empty array', function() {
          expect(doSelectFalse().returnValue).to(be_empty);
        });
        
        it('should not mutate itself', function() {
          doSelectFalse();
          expect(array_).to(equal, ['foo']);
        });
      });
    });
    
    describe('with one null element', function() {
      var array_ = null;
      
      before(function() {
        array_ = [null];
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
          expect(array_).to(equal, [null]);
        });
      });
      
      describe('when sent #areAny without a block', function() {
        function doAreAnyNoBlock() {
          return doMethod('areAny', {'on': array_});
        }
        
        it('should return false', function() {
          expect(doAreAnyNoBlock().returnValue).to(be_false);
        });
        
        it('should not mutate itself', function() {
          doAreAnyNoBlock();
          expect(array_).to(equal, [null]);
        });
      });
    });
    
    describe('with one false element', function() {
      var array_ = null;
      
      before(function() {
        array_ = [false];
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
          expect(array_).to(equal, [false]);
        });
      });
      
      describe('when sent #areAny without a block', function() {
        function doAreAnyNoBlock() {
          return doMethod('areAny', {'on': array_});
        }
        
        it('should return false', function() {
          expect(doAreAnyNoBlock().returnValue).to(be_false);
        });
        
        it('should not mutate itself', function() {
          doAreAnyNoBlock();
          expect(array_).to(equal, [false]);
        });
      });
    });
    
    describe('with two non-null elements', function() {
      var array_ = null;
      
      before(function() {
        array_ = ['foo', 'bar'];
      });
      
      describe('when sent #areAll with a block that returns true', function() {
        function doAreAllTrue() {
          return doMethod('areAll',
                          {'on':   array_,
                           'with': function(s) { return true; }});
        }
        
        it('should yield twice', function() {
          expect(doAreAllTrue().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doAreAllTrue().callbacks[0][0].this).to(equal, array_);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doAreAllTrue().callbacks[0][1].this).to(equal, array_);
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
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #areAll with a block that returns false', function() {
        function doAreAllFalse() {
          return doMethod('areAll',
                          {'on':   array_,
                           'with': function(s) { return false; }});
        }
        
        it('should yield once', function() {
          expect(doAreAllFalse().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doAreAllFalse().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the first element', function() {
          expect(doAreAllFalse().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return false', function() {
          expect(doAreAllFalse().returnValue).to(be_false);
        });
        
        it('should not mutate itself', function() {
          doAreAllFalse();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #areAll without a block', function() {
        function doAreAllNoBlock() {
          return doMethod('areAll', {'on': array_});
        }
        
        it('should return true', function() {
          expect(doAreAllNoBlock().returnValue).to(be_true);
        });
        
        it('should not mutate itself', function() {
          doAreAllNoBlock();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #areAny with a block that returns true', function() {
        function doAreAnyTrue() {
          return doMethod('areAny',
                          {'on':   array_,
                           'with': function(s) { return true; }});
        }
        
        it('should yield once', function() {
          expect(doAreAnyTrue().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doAreAnyTrue().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the first element', function() {
          expect(doAreAnyTrue().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return true', function() {
          expect(doAreAnyTrue().returnValue).to(be_true);
        });
        
        it('should not mutate itself', function() {
          doAreAnyTrue();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #areAny with a block that returns false', function() {
        function doAreAnyFalse() {
          return doMethod('areAny',
                          {'on':   array_,
                           'with': function(s) { return false; }});
        }
        
        it('should yield twice', function() {
          expect(doAreAnyFalse().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doAreAnyFalse().callbacks[0][0].this).to(equal, array_);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doAreAnyFalse().callbacks[0][1].this).to(equal, array_);
        });
        
        it('should yield the first element the first time', function() {
          expect(doAreAnyFalse().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should yield the second element the second time', function() {
          expect(doAreAnyFalse().callbacks[0][1].arguments).to(equal, ['bar']);
        });
        
        it('should return false', function() {
          expect(doAreAnyFalse().returnValue).to(be_false);
        });
        
        it('should not mutate itself', function() {
          doAreAnyFalse();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #areAny without a block', function() {
        function doAreAnyNoBlock() {
          return doMethod('areAny', {'on': array_});
        }
        
        it('should return true', function() {
          expect(doAreAnyNoBlock().returnValue).to(be_true);
        });
        
        it('should not mutate itself', function() {
          doAreAnyNoBlock();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #collect with a block', function() {
        function doCollect() {
          return doMethod('collect',
                          {'on':   array_,
                           'with': function(s) { return 'item: ' + s; }});
        }
        
        it('should yield twice', function() {
          expect(doCollect().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doCollect().callbacks[0][0].this).to(equal, array_);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doCollect().callbacks[0][1].this).to(equal, array_);
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
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #collectThis with a block', function() {
        function doCollectThis() {
          return doMethod('collectThis',
                          {'on':   array_,
                           'with': function(s) { return 'item: ' + s; }});
        }
        
        it('should yield twice', function() {
          expect(doCollectThis().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doCollectThis().callbacks[0][0].this).to(equal, array_);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doCollectThis().callbacks[0][1].this).to(equal, array_);
        });
        
        it('should yield the first element the first time', function() {
          expect(doCollectThis().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should yield the second element the second time', function() {
          expect(doCollectThis().callbacks[0][1].arguments).to(equal, ['bar']);
        });
        
        it('should return itself', function() {
          expect(doCollectThis().returnValue).to(equal, array_);
        });
        
        it('should mutate itself as expected', function() {
          doCollectThis();
          expect(array_).to(equal, ['item: foo', 'item: bar']);
        });
      });
      
      describe('when sent #detect with a block that returns true', function() {
        function doDetectTrue() {
          return doMethod('detect',
                          {'on':   array_,
                           'with': function(s) { return true; }});
        }
        
        it('should yield once', function() {
          expect(doDetectTrue().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doDetectTrue().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the first element', function() {
          expect(doDetectTrue().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return the first element', function() {
          expect(doDetectTrue().returnValue).to(equal, 'foo');
        });
        
        it('should not mutate itself', function() {
          doDetectTrue();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #detect with a block that returns false', function() {
        function doDetectFalse() {
          return doMethod('detect',
                          {'on':   array_,
                           'with': function(s) { return false; }});
        }
        
        it('should yield twice', function() {
          expect(doDetectFalse().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doDetectFalse().callbacks[0][0].this).to(equal, array_);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doDetectFalse().callbacks[0][1].this).to(equal, array_);
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
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #detect with an "ifNone" and a block that returns true', function() {
        function doDetectTruePassingIfNone(block) {
          return doMethod('detect',
                          {'on':   array_,
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
                                                                      array_);
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
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #detect with an "ifNone" and a block that returns false', function() {
        function doDetectFalsePassingIfNone(block) {
          return doMethod('detect',
                          {'on':   array_,
                           'with': [function() { return 'nothing here'; },
                                    function(s) { return false; }]});
        }
        
        it('should call the "ifNone" once', function() {
          expect(doDetectFalsePassingIfNone().callbacks[0].length).to(equal, 1);
        });
        
        it("should call the \"ifNone\" with itself as the 'this' value", function() {
          expect(doDetectFalsePassingIfNone().callbacks[0][0].this).to(equal,
                                                                       array_);
        });
        
        it('should call the "ifNone" with no arguments', function() {
          expect(doDetectFalsePassingIfNone().callbacks[0][0].arguments).to(be_empty);
        });
        
        it('should yield to the block twice', function() {
          expect(doDetectFalsePassingIfNone().callbacks[1].length).to(equal, 2);
        });
        
        it("should yield to the block with itself as the 'this' value the first time", function() {
          expect(doDetectFalsePassingIfNone().callbacks[1][0].this).to(equal,
                                                                       array_);
        });
        
        it("should yield to the block with itself as the 'this' value the second time", function() {
          expect(doDetectFalsePassingIfNone().callbacks[1][1].this).to(equal,
                                                                       array_);
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
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #doesInclude with a member', function() {
        function doDoesIncludePassingMember() {
          return doMethod('doesInclude', {'on': array_, 'with': 'foo'});
        }
        
        it('should return true', function() {
          expect(doDoesIncludePassingMember().returnValue).to(equal, true);
        });
        
        it('should not mutate itself', function() {
          doDoesIncludePassingMember();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #doesInclude with a non-member', function() {
        function doDoesIncludePassingNonmember() {
          return doMethod('doesInclude',
                          {'on': array_, 'with': 'something else'});
        }
        
        it('should return false', function() {
          expect(doDoesIncludePassingNonmember().returnValue).to(equal, false);
        });
        
        it('should not mutate itself', function() {
          doDoesIncludePassingNonmember();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #each with a block', function() {
        function doEach() {
          return doMethod('each',
                          {'on':   array_,
                           'with': function(s) { }});
        }
        
        it('should yield twice', function() {
          expect(doEach().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doEach().callbacks[0][0].this).to(equal, array_);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doEach().callbacks[0][1].this).to(equal, array_);
        });
        
        it('should yield the first element the first time', function() {
          expect(doEach().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should yield the second element the second time', function() {
          expect(doEach().callbacks[0][1].arguments).to(equal, ['bar']);
        });
        
        it('should return itself', function() {
          expect(doEach().returnValue).to(equal, array_);
        });
        
        it('should not mutate itself', function() {
          doEach();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #eachCons with 1 and a block', function() {
        function doEachCons() {
          return doMethod('eachCons',
                          {'on': array_, 'with': [1, function(s) { }]});
        }
        
        it('should yield twice', function() {
          expect(doEachCons().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doEachCons().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the first element in an array the first time', function() {
          expect(doEachCons().callbacks[0][0].arguments).to(equal, [['foo']]);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doEachCons().callbacks[0][1].this).to(equal, array_);
        });
        
        it('should yield the second element in an array the second time', function() {
          expect(doEachCons().callbacks[0][1].arguments).to(equal, [['bar']]);
        });
        
        it('should not mutate itself', function() {
          doEachCons();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #eachCons with 2 and a block', function() {
        function doEachCons() {
          return doMethod('eachCons',
                          {'on': array_, 'with': [2, function(s) { }]});
        }
        
        it('should yield once', function() {
          expect(doEachCons().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doEachCons().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the elements in an array', function() {
          expect(doEachCons().callbacks[0][0].arguments).to(equal, [['foo',
                                                                     'bar']]);
        });
        
        it('should not mutate itself', function() {
          doEachCons();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #eachCons with 3 and a block', function() {
        function doEachCons() {
          return doMethod('eachCons',
                          {'on': array_, 'with': [3, function(s) { }]});
        }
        
        it('should not yield', function() {
          expect(doEachCons().callbacks[0]).to(be_empty);
        });
        
        it('should not mutate itself', function() {
          doEachCons();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #eachSlice with 1 and a block', function() {
        function doEachSlice() {
          return doMethod('eachSlice',
                          {'on': array_, 'with': [1, function(s) { }]});
        }
        
        it('should yield twice', function() {
          expect(doEachSlice().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doEachSlice().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the first element in an array the first time', function() {
          expect(doEachSlice().callbacks[0][0].arguments).to(equal, [['foo']]);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doEachSlice().callbacks[0][1].this).to(equal, array_);
        });
        
        it('should yield the second element in an array the second time', function() {
          expect(doEachSlice().callbacks[0][1].arguments).to(equal, [['bar']]);
        });
        
        it('should not mutate itself', function() {
          doEachSlice();
          expect(array_).to(equal, ['foo', 'bar']);
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
        
        it('should yield the elements in an array', function() {
          expect(doEachSlice().callbacks[0][0].arguments).to(equal, [['foo',
                                                                      'bar']]);
        });
        
        it('should not mutate itself', function() {
          doEachSlice();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #eachSlice with 3 and a block', function() {
        function doEachSlice() {
          return doMethod('eachSlice',
                          {'on': array_, 'with': [3, function(s) { }]});
        }
        
        it('should yield once', function() {
          expect(doEachSlice().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doEachSlice().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the elements in an array', function() {
          expect(doEachSlice().callbacks[0][0].arguments).to(equal, [['foo',
                                                                      'bar']]);
        });
        
        it('should not mutate itself', function() {
          doEachSlice();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #eachWithIndex with a block', function() {
        function doEachWithIndex() {
          return doMethod('eachWithIndex',
                          {'on':   array_,
                           'with': function(s, i) { }});
        }
        
        it('should yield twice', function() {
          expect(doEachWithIndex().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doEachWithIndex().callbacks[0][0].this).to(equal, array_);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doEachWithIndex().callbacks[0][1].this).to(equal, array_);
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
          expect(doEachWithIndex().returnValue).to(equal, array_);
        });
        
        it('should not mutate itself', function() {
          doEachWithIndex();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #find with a block that returns true', function() {
        function doFindTrue() {
          return doMethod('find',
                          {'on':   array_,
                           'with': function(s) { return true; }});
        }
        
        it('should yield once', function() {
          expect(doFindTrue().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doFindTrue().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the first element', function() {
          expect(doFindTrue().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return the first element', function() {
          expect(doFindTrue().returnValue).to(equal, 'foo');
        });
        
        it('should not mutate itself', function() {
          doFindTrue();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #find with a block that returns false', function() {
        function doFindFalse() {
          return doMethod('find',
                          {'on':   array_,
                           'with': function(s) { return false; }});
        }
        
        it('should yield twice', function() {
          expect(doFindFalse().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doFindFalse().callbacks[0][0].this).to(equal, array_);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doFindFalse().callbacks[0][1].this).to(equal, array_);
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
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #find with an "ifNone" and a block that returns true', function() {
        function doFindTruePassingIfNone(block) {
          return doMethod('find',
                          {'on':   array_,
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
                                                                    array_);
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
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #find with an "ifNone" and a block that returns false', function() {
        function doFindFalsePassingIfNone(block) {
          return doMethod('find',
                          {'on':   array_,
                           'with': [function() { return 'nothing here'; },
                                    function(s) { return false; }]});
        }
        
        it('should call the "ifNone" once', function() {
          expect(doFindFalsePassingIfNone().callbacks[0].length).to(equal, 1);
        });
        
        it("should call the \"ifNone\" with itself as the 'this' value", function() {
          expect(doFindFalsePassingIfNone().callbacks[0][0].this).to(equal,
                                                                     array_);
        });
        
        it('should call the "ifNone" with no arguments', function() {
          expect(doFindFalsePassingIfNone().callbacks[0][0].arguments).to(be_empty);
        });
        
        it('should yield to the block twice', function() {
          expect(doFindFalsePassingIfNone().callbacks[1].length).to(equal, 2);
        });
        
        it("should yield to the block with itself as the 'this' value the first time", function() {
          expect(doFindFalsePassingIfNone().callbacks[1][0].this).to(equal,
                                                                     array_);
        });
        
        it("should yield to the block with itself as the 'this' value the second time", function() {
          expect(doFindFalsePassingIfNone().callbacks[1][1].this).to(equal,
                                                                     array_);
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
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #findAll with a block that returns true', function() {
        function doFindAllTrue() {
          return doMethod('findAll',
                          {'on': array_, 'with': function(s) { return true; }});
        }
        
        it('should yield twice', function() {
          expect(doFindAllTrue().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doFindAllTrue().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the first element the first time', function() {
          expect(doFindAllTrue().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doFindAllTrue().callbacks[0][1].this).to(equal, array_);
        });
        
        it('should yield the second element the second time', function() {
          expect(doFindAllTrue().callbacks[0][1].arguments).to(equal, ['bar']);
        });
        
        it('should return the array', function() {
          expect(doFindAllTrue().returnValue).to(equal, ['foo', 'bar']);
        });
        
        it('should not mutate itself', function() {
          doFindAllTrue();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #findAll with a block that returns false', function() {
        function doFindAllFalse() {
          return doMethod('findAll',
                          {'on': array_,
                           'with': function(s) { return false; }});
        }
        
        it('should yield twice', function() {
          expect(doFindAllFalse().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doFindAllFalse().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the first element the first time', function() {
          expect(doFindAllFalse().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doFindAllFalse().callbacks[0][1].this).to(equal, array_);
        });
        
        it('should yield the second element the second time', function() {
          expect(doFindAllFalse().callbacks[0][1].arguments).to(equal, ['bar']);
        });
        
        it('should return an empty array', function() {
          expect(doFindAllFalse().returnValue).to(be_empty);
        });
        
        it('should not mutate itself', function() {
          doFindAllFalse();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #grep with a matching Regexp', function() {
        function doGrepMatching() {
          return doMethod('grep', {'on': array_, 'with': /./});
        }
        
        it('should return an array containing the elements', function() {
          expect(doGrepMatching().returnValue).to(equal, ['foo', 'bar']);
        });
        
        it('should not mutate itself', function() {
          doGrepMatching();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #grep with a non-matching Regexp', function() {
        function doGrepNonmatching() {
          return doMethod('grep', {'on': array_, 'with': /not a match/});
        }
        
        it('should return an empty array', function() {
          expect(doGrepNonmatching().returnValue).to(be_empty);
        });
        
        it('should not mutate itself', function() {
          doGrepNonmatching();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #grep with a matching Regexp and a block', function() {
        function doGrepMatchingPassingBlock() {
          return doMethod('grep',
                          {'on': array_,
                           'with': [/./,
                                    function(s) { return 'item: ' + s; }]});
        }
        
        it('should yield twice', function() {
          expect(doGrepMatchingPassingBlock().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doGrepMatchingPassingBlock().callbacks[0][0].this).to(equal,
                                                                       array_);
        });
        
        it('should yield the first element the first time', function() {
          expect(doGrepMatchingPassingBlock().callbacks[0][0].arguments).to(equal,
                                                                            ['foo']);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doGrepMatchingPassingBlock().callbacks[0][1].this).to(equal,
                                                                       array_);
        });
        
        it('should yield the second element the second time', function() {
          expect(doGrepMatchingPassingBlock().callbacks[0][1].arguments).to(equal,
                                                                            ['bar']);
        });
        
        it('should return an array containing the values returned by the block', function() {
          expect(doGrepMatchingPassingBlock().returnValue).to(equal,
                                                              ['item: foo',
                                                               'item: bar']);
        });
        
        it('should not mutate itself', function() {
          doGrepMatchingPassingBlock();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #grep with a non-matching Regexp and a block', function() {
        function doGrepNonmatchingPassingBlock() {
          return doMethod('grep',
                          {'on': array_,
                           'with': [/\d/,
                                    function(s) { return 'item: ' + s; }]});
        }
        
        it('should not yield', function() {
          expect(doGrepNonmatchingPassingBlock().callbacks[0]).to(be_empty);
        });
        
        it('should return an empty array', function() {
          expect(doGrepNonmatchingPassingBlock().returnValue).to(be_empty);
        });
        
        it('should not mutate itself', function() {
          doGrepNonmatchingPassingBlock();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #hasMember with a member', function() {
        function doHasMemberPassingMember() {
          return doMethod('hasMember', {'on': array_, 'with': 'foo'});
        }
        
        it('should return true', function() {
          expect(doHasMemberPassingMember().returnValue).to(equal, true);
        });
        
        it('should not mutate itself', function() {
          doHasMemberPassingMember();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #hasMember with a non-member', function() {
        function doHasMemberPassingNonmember() {
          return doMethod('hasMember',
                          {'on': array_, 'with': 'something else'});
        }
        
        it('should return false', function() {
          expect(doHasMemberPassingNonmember().returnValue).to(equal, false);
        });
        
        it('should not mutate itself', function() {
          doHasMemberPassingNonmember();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #inject with a block', function() {
        function doInject() {
          return doMethod('inject',
                          {'on':   array_,
                           'with': function(memo, s) { return 'item: ' + s; }});
        }
        
        it('should yield once', function() {
          expect(doInject().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doInject().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the first and the second element', function() {
          expect(doInject().callbacks[0][0].arguments).to(equal, ['foo',
                                                                  'bar']);
        });
        
        it('should return the value returned by the block', function() {
          expect(doInject().returnValue).to(equal, 'item: bar');
        });
        
        it('should not mutate itself', function() {
          doInject();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #inject with an "initial" and a block', function() {
        function doInjectWithInitial() {
          return doMethod('inject',
                          {'on':   array_,
                           'with': ['starting point',
                                    function(memo, s) {
                                      return 'item: ' + s;
                                    }]});
        }
        
        it('should yield twice', function() {
          expect(doInjectWithInitial().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doInjectWithInitial().callbacks[0][0].this).to(equal, array_);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doInjectWithInitial().callbacks[0][1].this).to(equal, array_);
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
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #map with a block', function() {
        function doMap() {
          return doMethod('map',
                          {'on':   array_,
                           'with': function(s) { return 'item: ' + s; }});
        }
        
        it('should yield twice', function() {
          expect(doMap().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doMap().callbacks[0][0].this).to(equal, array_);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doMap().callbacks[0][1].this).to(equal, array_);
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
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #mapThis with a block', function() {
        function doMapThis() {
          return doMethod('mapThis',
                          {'on':   array_,
                           'with': function(s) { return 'item: ' + s; }});
        }
        
        it('should yield twice', function() {
          expect(doMapThis().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doMapThis().callbacks[0][0].this).to(equal, array_);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doMapThis().callbacks[0][1].this).to(equal, array_);
        });
        
        it('should yield the first element the first time', function() {
          expect(doMapThis().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should yield the second element the second time', function() {
          expect(doMapThis().callbacks[0][1].arguments).to(equal, ['bar']);
        });
        
        it('should return itself', function() {
          expect(doMapThis().returnValue).to(equal, array_);
        });
        
        it('should mutate itself as expected', function() {
          doMapThis();
          expect(array_).to(equal, ['item: foo', 'item: bar']);
        });
      });
      
      describe('when sent #partition with a block that returns true', function() {
        function doPartitionTrue() {
          return doMethod('partition',
                          {'on': array_, 'with': function(s) { return true; }});
        }
        
        it('should yield twice', function() {
          expect(doPartitionTrue().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doPartitionTrue().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the first element the first time', function() {
          expect(doPartitionTrue().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doPartitionTrue().callbacks[0][1].this).to(equal, array_);
        });
        
        it('should yield the second element the second time', function() {
          expect(doPartitionTrue().callbacks[0][1].arguments).to(equal, ['bar']);
        });
        
        it('should return an array of two elements', function() {
          expect(doPartitionTrue().returnValue.length).to(equal, 2);
        });
        
        it('should return an array whose first element is an array containing the elements', function() {
          expect(doPartitionTrue().returnValue[0]).to(equal, ['foo', 'bar']);
        });
        
        it('should return an array whose second element is an empty array', function() {
          expect(doPartitionTrue().returnValue[1]).to(be_empty);
        });
        
        it('should not mutate itself', function() {
          doPartitionTrue();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #partition with a block that returns false', function() {
        function doPartitionFalse() {
          return doMethod('partition',
                          {'on': array_, 'with': function(s) { return false; }});
        }
        
        it('should yield twice', function() {
          expect(doPartitionFalse().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doPartitionFalse().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the first element the first time', function() {
          expect(doPartitionFalse().callbacks[0][0].arguments).to(equal,
                                                                  ['foo']);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doPartitionFalse().callbacks[0][1].this).to(equal, array_);
        });
        
        it('should yield the second element the second time', function() {
          expect(doPartitionFalse().callbacks[0][1].arguments).to(equal,
                                                                  ['bar']);
        });
        
        it('should return an array of two elements', function() {
          expect(doPartitionFalse().returnValue.length).to(equal, 2);
        });
        
        it('should return an array whose first element is an empty array', function() {
          expect(doPartitionFalse().returnValue[0]).to(be_empty);
        });
        
        it('should return an array whose second element is an array containing the elements', function() {
          expect(doPartitionFalse().returnValue[1]).to(equal, ['foo', 'bar']);
        });
        
        it('should not mutate itself', function() {
          doPartitionFalse();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #reject with a block that returns true', function() {
        function doRejectTrue() {
          return doMethod('reject',
                          {'on': array_, 'with': function(s) { return true; }});
        }
        
        it('should yield twice', function() {
          expect(doRejectTrue().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doRejectTrue().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the first element the first time', function() {
          expect(doRejectTrue().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doRejectTrue().callbacks[0][1].this).to(equal, array_);
        });
        
        it('should yield the second element the second time', function() {
          expect(doRejectTrue().callbacks[0][1].arguments).to(equal, ['bar']);
        });
        
        it('should return an empty array', function() {
          expect(doRejectTrue().returnValue).to(be_empty);
        });
        
        it('should not mutate itself', function() {
          doRejectTrue();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #reject with a block that returns false', function() {
        function doRejectFalse() {
          return doMethod('reject',
                          {'on': array_,
                           'with': function(s) { return false; }});
        }
        
        it('should yield twice', function() {
          expect(doRejectFalse().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doRejectFalse().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the first element the first time', function() {
          expect(doRejectFalse().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doRejectFalse().callbacks[0][1].this).to(equal, array_);
        });
        
        it('should yield the second element the second time', function() {
          expect(doRejectFalse().callbacks[0][1].arguments).to(equal, ['bar']);
        });
        
        it('should return the array', function() {
          expect(doRejectFalse().returnValue).to(equal, ['foo', 'bar']);
        });
        
        it('should not mutate itself', function() {
          doRejectFalse();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #select with a block that returns true', function() {
        function doSelectTrue() {
          return doMethod('select',
                          {'on': array_, 'with': function(s) { return true; }});
        }
        
        it('should yield twice', function() {
          expect(doSelectTrue().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doSelectTrue().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the first element the first time', function() {
          expect(doSelectTrue().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doSelectTrue().callbacks[0][1].this).to(equal, array_);
        });
        
        it('should yield the second element the second time', function() {
          expect(doSelectTrue().callbacks[0][1].arguments).to(equal, ['bar']);
        });
        
        it('should return the array', function() {
          expect(doSelectTrue().returnValue).to(equal, ['foo', 'bar']);
        });
        
        it('should not mutate itself', function() {
          doSelectTrue();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #select with a block that returns false', function() {
        function doSelectFalse() {
          return doMethod('select',
                          {'on': array_,
                           'with': function(s) { return false; }});
        }
        
        it('should yield twice', function() {
          expect(doSelectFalse().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doSelectFalse().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the first element the first time', function() {
          expect(doSelectFalse().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doSelectFalse().callbacks[0][1].this).to(equal, array_);
        });
        
        it('should yield the second element the second time', function() {
          expect(doSelectFalse().callbacks[0][1].arguments).to(equal, ['bar']);
        });
        
        it('should return an empty array', function() {
          expect(doSelectFalse().returnValue).to(be_empty);
        });
        
        it('should not mutate itself', function() {
          doSelectFalse();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
    });
    
    describe('with one non-null element and one null element', function() {
      var array_ = null;
      
      before(function() {
        array_ = ['foo', null];
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
          expect(array_).to(equal, ['foo', null]);
        });
      });
      
      describe('when sent #areAny without a block', function() {
        function doAreAnyNoBlock() {
          return doMethod('areAny', {'on': array_});
        }
        
        it('should return true', function() {
          expect(doAreAnyNoBlock().returnValue).to(be_true);
        });
        
        it('should not mutate itself', function() {
          doAreAnyNoBlock();
          expect(array_).to(equal, ['foo', null]);
        });
      });
    });
    
    describe('with one true element and one false element', function() {
      var array_ = null;
      
      before(function() {
        array_ = [true, false];
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
      
      describe('when sent #areAny without a block', function() {
        function doAreAnyNoBlock() {
          return doMethod('areAny', {'on': array_});
        }
        
        it('should return true', function() {
          expect(doAreAnyNoBlock().returnValue).to(be_true);
        });
        
        it('should not mutate itself', function() {
          doAreAnyNoBlock();
          expect(array_).to(equal, [true, false]);
        });
      });
    });
    
    describe('with three non-null elements', function() {
      var array_ = null;
      
      before(function() {
        array_ = ['foo', 'bar', 'baz'];
      });
      
      describe('when sent #eachCons with 1 and a block', function() {
        function doEachCons() {
          return doMethod('eachCons',
                          {'on': array_, 'with': [1, function(s) { }]});
        }
        
        it('should yield thrice', function() {
          expect(doEachCons().callbacks[0].length).to(equal, 3);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doEachCons().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the first element in an array the first time', function() {
          expect(doEachCons().callbacks[0][0].arguments).to(equal, [['foo']]);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doEachCons().callbacks[0][1].this).to(equal, array_);
        });
        
        it('should yield the second element in an array the second time', function() {
          expect(doEachCons().callbacks[0][1].arguments).to(equal, [['bar']]);
        });
        
        it("should yield with itself as the 'this' value the third time", function() {
          expect(doEachCons().callbacks[0][2].this).to(equal, array_);
        });
        
        it('should yield the third element in an array the third time', function() {
          expect(doEachCons().callbacks[0][2].arguments).to(equal, [['baz']]);
        });
        
        it('should not mutate itself', function() {
          doEachCons();
          expect(array_).to(equal, ['foo', 'bar', 'baz']);
        });
      });
      
      describe('when sent #eachCons with 2 and a block', function() {
        function doEachCons() {
          return doMethod('eachCons',
                          {'on': array_, 'with': [2, function(s) { }]});
        }
        
        it('should yield twice', function() {
          expect(doEachCons().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doEachCons().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the first and second elements in an array the first time', function() {
          expect(doEachCons().callbacks[0][0].arguments).to(equal, [['foo',
                                                                     'bar']]);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doEachCons().callbacks[0][1].this).to(equal, array_);
        });
        
        it('should yield the second and third elements in an array the second time', function() {
          expect(doEachCons().callbacks[0][1].arguments).to(equal, [['bar',
                                                                     'baz']]);
        });
        
        it('should not mutate itself', function() {
          doEachCons();
          expect(array_).to(equal, ['foo', 'bar', 'baz']);
        });
      });
      
      describe('when sent #eachCons with 3 and a block', function() {
        function doEachCons() {
          return doMethod('eachCons',
                          {'on': array_, 'with': [3, function(s) { }]});
        }
        
        it('should yield once', function() {
          expect(doEachCons().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doEachCons().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the elements in an array', function() {
          expect(doEachCons().callbacks[0][0].arguments).to(equal,
                                                            [['foo',
                                                              'bar',
                                                              'baz']]);
        });
        
        it('should not mutate itself', function() {
          doEachCons();
          expect(array_).to(equal, ['foo', 'bar', 'baz']);
        });
      });
      
      describe('when sent #eachSlice with 1 and a block', function() {
        function doEachSlice() {
          return doMethod('eachSlice',
                          {'on': array_, 'with': [1, function(s) { }]});
        }
        
        it('should yield thrice', function() {
          expect(doEachSlice().callbacks[0].length).to(equal, 3);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doEachSlice().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the first element in an array the first time', function() {
          expect(doEachSlice().callbacks[0][0].arguments).to(equal, [['foo']]);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doEachSlice().callbacks[0][1].this).to(equal, array_);
        });
        
        it('should yield the second element in an array the second time', function() {
          expect(doEachSlice().callbacks[0][1].arguments).to(equal, [['bar']]);
        });
        
        it("should yield with itself as the 'this' value the third time", function() {
          expect(doEachSlice().callbacks[0][2].this).to(equal, array_);
        });
        
        it('should yield the third element in an array the third time', function() {
          expect(doEachSlice().callbacks[0][2].arguments).to(equal, [['baz']]);
        });
        
        it('should not mutate itself', function() {
          doEachSlice();
          expect(array_).to(equal, ['foo', 'bar', 'baz']);
        });
      });
      
      describe('when sent #eachSlice with 2 and a block', function() {
        function doEachSlice() {
          return doMethod('eachSlice',
                          {'on': array_, 'with': [2, function(s) { }]});
        }
        
        it('should yield twice', function() {
          expect(doEachSlice().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doEachSlice().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the first and second elements in an array the first time', function() {
          expect(doEachSlice().callbacks[0][0].arguments).to(equal, [['foo',
                                                                      'bar']]);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doEachSlice().callbacks[0][1].this).to(equal, array_);
        });
        
        it('should yield the third element in an array the second time', function() {
          expect(doEachSlice().callbacks[0][1].arguments).to(equal, [['baz']]);
        });
        
        it('should not mutate itself', function() {
          doEachSlice();
          expect(array_).to(equal, ['foo', 'bar', 'baz']);
        });
      });
      
      describe('when sent #eachSlice with 3 and a block', function() {
        function doEachSlice() {
          return doMethod('eachSlice',
                          {'on': array_, 'with': [3, function(s) { }]});
        }
        
        it('should yield once', function() {
          expect(doEachSlice().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doEachSlice().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the elements in an array', function() {
          expect(doEachSlice().callbacks[0][0].arguments).to(equal,
                                                            [['foo',
                                                              'bar',
                                                              'baz']]);
        });
        
        it('should not mutate itself', function() {
          doEachSlice();
          expect(array_).to(equal, ['foo', 'bar', 'baz']);
        });
      });
    });
  });
});
