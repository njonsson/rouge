Screw.Unit(function() {
  describe('Array', function() {
    describe('with two non-null elements', function() {
      var array_ = null;
      
      before(function() {
        array_ = ['foo', 'bar'];
      });
      
      describe('when sent #all? with a block that returns true', function() {
        function doAllHUHTrue() {
          return doMethod('all?',
                          {'on':   array_,
                           'with': function(s) { return true; }});
        }
        
        it('should yield twice', function() {
          expect(doAllHUHTrue().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doAllHUHTrue().callbacks[0][0].this).to(equal, array_);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doAllHUHTrue().callbacks[0][1].this).to(equal, array_);
        });
        
        it('should yield the first element the first time', function() {
          expect(doAllHUHTrue().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should yield the second element the second time', function() {
          expect(doAllHUHTrue().callbacks[0][1].arguments).to(equal, ['bar']);
        });
        
        it('should return true', function() {
          expect(doAllHUHTrue().returnValue).to(be_true);
        });
        
        it('should not mutate itself', function() {
          doAllHUHTrue();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #all? with a block that returns false', function() {
        function doAllHUHFalse() {
          return doMethod('all?',
                          {'on':   array_,
                           'with': function(s) { return false; }});
        }
        
        it('should yield once', function() {
          expect(doAllHUHFalse().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doAllHUHFalse().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the first element', function() {
          expect(doAllHUHFalse().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return false', function() {
          expect(doAllHUHFalse().returnValue).to(be_false);
        });
        
        it('should not mutate itself', function() {
          doAllHUHFalse();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #all? without a block', function() {
        function doAllHUHNoBlock() {
          return doMethod('all?', {'on': array_});
        }
        
        it('should return true', function() {
          expect(doAllHUHNoBlock().returnValue).to(be_true);
        });
        
        it('should not mutate itself', function() {
          doAllHUHNoBlock();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #any? with a block that returns true', function() {
        function doAnyHUHTrue() {
          return doMethod('any?',
                          {'on':   array_,
                           'with': function(s) { return true; }});
        }
        
        it('should yield once', function() {
          expect(doAnyHUHTrue().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doAnyHUHTrue().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the first element', function() {
          expect(doAnyHUHTrue().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return true', function() {
          expect(doAnyHUHTrue().returnValue).to(be_true);
        });
        
        it('should not mutate itself', function() {
          doAnyHUHTrue();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #any? with a block that returns false', function() {
        function doAnyHUHFalse() {
          return doMethod('any?',
                          {'on':   array_,
                           'with': function(s) { return false; }});
        }
        
        it('should yield twice', function() {
          expect(doAnyHUHFalse().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doAnyHUHFalse().callbacks[0][0].this).to(equal, array_);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doAnyHUHFalse().callbacks[0][1].this).to(equal, array_);
        });
        
        it('should yield the first element the first time', function() {
          expect(doAnyHUHFalse().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should yield the second element the second time', function() {
          expect(doAnyHUHFalse().callbacks[0][1].arguments).to(equal, ['bar']);
        });
        
        it('should return false', function() {
          expect(doAnyHUHFalse().returnValue).to(be_false);
        });
        
        it('should not mutate itself', function() {
          doAnyHUHFalse();
          expect(array_).to(equal, ['foo', 'bar']);
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
          expect(array_).to(equal, ['foo', 'bar']);
        });
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
      
      describe('when sent #collect! with a block', function() {
        function doCollectBANG() {
          return doMethod('collect!',
                          {'on':   array_,
                           'with': function(s) { return 'item: ' + s; }});
        }
        
        it('should yield twice', function() {
          expect(doCollectBANG().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doCollectBANG().callbacks[0][0].this).to(equal, array_);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doCollectBANG().callbacks[0][1].this).to(equal, array_);
        });
        
        it('should yield the first element the first time', function() {
          expect(doCollectBANG().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should yield the second element the second time', function() {
          expect(doCollectBANG().callbacks[0][1].arguments).to(equal, ['bar']);
        });
        
        it('should return itself', function() {
          expect(doCollectBANG().returnValue).to(equal, array_);
        });
        
        it('should mutate itself as expected', function() {
          doCollectBANG();
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
      
      describe('when sent #include? with a member', function() {
        function doIncludeHUHPassingMember() {
          return doMethod('include?', {'on': array_, 'with': 'foo'});
        }
        
        it('should return true', function() {
          expect(doIncludeHUHPassingMember().returnValue).to(equal, true);
        });
        
        it('should not mutate itself', function() {
          doIncludeHUHPassingMember();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #include? with a non-member', function() {
        function doIncludeHUHPassingNonmember() {
          return doMethod('include?', {'on': array_, 'with': 'something else'});
        }
        
        it('should return false', function() {
          expect(doIncludeHUHPassingNonmember().returnValue).to(equal, false);
        });
        
        it('should not mutate itself', function() {
          doIncludeHUHPassingNonmember();
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
      
      describe('when sent #isAny with a block that returns true', function() {
        function doIsAnyTrue() {
          return doMethod('isAny',
                          {'on':   array_,
                           'with': function(s) { return true; }});
        }
        
        it('should yield once', function() {
          expect(doIsAnyTrue().callbacks[0].length).to(equal, 1);
        });
        
        it("should yield with itself as the 'this' value", function() {
          expect(doIsAnyTrue().callbacks[0][0].this).to(equal, array_);
        });
        
        it('should yield the first element', function() {
          expect(doIsAnyTrue().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should return true', function() {
          expect(doIsAnyTrue().returnValue).to(be_true);
        });
        
        it('should not mutate itself', function() {
          doIsAnyTrue();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #isAny with a block that returns false', function() {
        function doIsAnyFalse() {
          return doMethod('isAny',
                          {'on':   array_,
                           'with': function(s) { return false; }});
        }
        
        it('should yield twice', function() {
          expect(doIsAnyFalse().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doIsAnyFalse().callbacks[0][0].this).to(equal, array_);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doIsAnyFalse().callbacks[0][1].this).to(equal, array_);
        });
        
        it('should yield the first element the first time', function() {
          expect(doIsAnyFalse().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should yield the second element the second time', function() {
          expect(doIsAnyFalse().callbacks[0][1].arguments).to(equal, ['bar']);
        });
        
        it('should return false', function() {
          expect(doIsAnyFalse().returnValue).to(be_false);
        });
        
        it('should not mutate itself', function() {
          doIsAnyFalse();
          expect(array_).to(equal, ['foo', 'bar']);
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
      
      describe('when sent #map! with a block', function() {
        function doMapBANG() {
          return doMethod('map!',
                          {'on':   array_,
                           'with': function(s) { return 'item: ' + s; }});
        }
        
        it('should yield twice', function() {
          expect(doMapBANG().callbacks[0].length).to(equal, 2);
        });
        
        it("should yield with itself as the 'this' value the first time", function() {
          expect(doMapBANG().callbacks[0][0].this).to(equal, array_);
        });
        
        it("should yield with itself as the 'this' value the second time", function() {
          expect(doMapBANG().callbacks[0][1].this).to(equal, array_);
        });
        
        it('should yield the first element the first time', function() {
          expect(doMapBANG().callbacks[0][0].arguments).to(equal, ['foo']);
        });
        
        it('should yield the second element the second time', function() {
          expect(doMapBANG().callbacks[0][1].arguments).to(equal, ['bar']);
        });
        
        it('should return itself', function() {
          expect(doMapBANG().returnValue).to(equal, array_);
        });
        
        it('should mutate itself as expected', function() {
          doMapBANG();
          expect(array_).to(equal, ['item: foo', 'item: bar']);
        });
      });
      
      describe('when sent #member? with a member', function() {
        function doMemberHUHPassingMember() {
          return doMethod('member?', {'on': array_, 'with': 'foo'});
        }
        
        it('should return true', function() {
          expect(doMemberHUHPassingMember().returnValue).to(equal, true);
        });
        
        it('should not mutate itself', function() {
          doMemberHUHPassingMember();
          expect(array_).to(equal, ['foo', 'bar']);
        });
      });
      
      describe('when sent #member? with a non-member', function() {
        function doMemberHUHPassingNonmember() {
          return doMethod('member?', {'on': array_, 'with': 'something else'});
        }
        
        it('should return false', function() {
          expect(doMemberHUHPassingNonmember().returnValue).to(equal, false);
        });
        
        it('should not mutate itself', function() {
          doMemberHUHPassingNonmember();
          expect(array_).to(equal, ['foo', 'bar']);
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
  });
});
