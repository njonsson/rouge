Screw.Unit(function() {
  describe('Array', function() {
    describe('that is empty', function() {
      var array_ = null;
      
      before(function() {
        array_ = [];
      });
      
      describe('when sent #all? with a block', function() {
        function doAllHUH() {
          return doMethod('all?', {'on': array_, 'with': function(s) { }});
        }
        
        it('should not yield', function() {
          expect(doAllHUH().callbacks[0]).to(be_empty);
        });
        
        it('should return true', function() {
          expect(doAllHUH().returnValue).to(equal, true);
        });
        
        it('should not mutate itself', function() {
          doAllHUH();
          expect(array_).to(equal, []);
        });
      });
      
      describe('when sent #all? without a block', function() {
        function doAllHUHNoBlock() {
          return doMethod('all?', {'on': array_});
        }
        
        it('should return true', function() {
          expect(doAllHUHNoBlock().returnValue).to(equal, true);
        });
        
        it('should not mutate itself', function() {
          doAllHUHNoBlock();
          expect(array_).to(equal, []);
        });
      });
      
      describe('when sent #any? with a block', function() {
        function doAnyHUH() {
          return doMethod('any?', {'on': array_, 'with': function(s) { }});
        }
        
        it('should not yield', function() {
          expect(doAnyHUH().callbacks[0]).to(be_empty);
        });
        
        it('should return false', function() {
          expect(doAnyHUH().returnValue).to(equal, false);
        });
        
        it('should not mutate itself', function() {
          doAnyHUH();
          expect(array_).to(equal, []);
        });
      });
      
      describe('when sent #any? without a block', function() {
        function doAnyHUHNoBlock() {
          return doMethod('any?', {'on': array_});
        }
        
        it('should return false', function() {
          expect(doAnyHUHNoBlock().returnValue).to(equal, false);
        });
        
        it('should not mutate itself', function() {
          doAnyHUHNoBlock();
          expect(array_).to(equal, []);
        });
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
      
      describe('when sent #collect! with a block', function() {
        function doCollectBANG() {
          return doMethod('collect!', {'on': array_, 'with': function(s) { }});
        }
        
        it('should not yield', function() {
          expect(doCollectBANG().callbacks[0]).to(be_empty);
        });
        
        it('should return itself', function() {
          expect(doCollectBANG().returnValue).to(equal, array_);
        });
        
        it('should not mutate itself', function() {
          doCollectBANG();
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
      
      describe('when sent #include?', function() {
        function doIncludeHUH() {
          return doMethod('include?', {'on': array_, 'with': 'foo'});
        }
        
        it('should return false', function() {
          expect(doIncludeHUH().returnValue).to(equal, false);
        });
        
        it('should not mutate itself', function() {
          doIncludeHUH();
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
      
      describe('when sent #isAny with a block', function() {
        function doIsAny() {
          return doMethod('isAny', {'on': array_, 'with': function(s) { }});
        }
        
        it('should not yield', function() {
          expect(doIsAny().callbacks[0]).to(be_empty);
        });
        
        it('should return false', function() {
          expect(doIsAny().returnValue).to(equal, false);
        });
        
        it('should not mutate itself', function() {
          doIsAny();
          expect(array_).to(equal, []);
        });
      });
      
      describe('when sent #isAny without a block', function() {
        function doIsAnyNoBlock() {
          return doMethod('isAny', {'on': array_});
        }
        
        it('should return false', function() {
          expect(doIsAnyNoBlock().returnValue).to(equal, false);
        });
        
        it('should not mutate itself', function() {
          doIsAnyNoBlock();
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
      
      describe('when sent #map! with a block', function() {
        function doMapBANG() {
          return doMethod('map!', {'on': array_, 'with': function(s) { }});
        }
        
        it('should not yield', function() {
          expect(doMapBANG().callbacks[0]).to(be_empty);
        });
        
        it('should return itself', function() {
          expect(doMapBANG().returnValue).to(equal, array_);
        });
        
        it('should not mutate itself', function() {
          doMapBANG();
          expect(array_).to(equal, []);
        });
      });
      
      describe('when sent #member?', function() {
        function doMemberHUH() {
          return doMethod('member?', {'on': array_, 'with': 'foo'});
        }
        
        it('should return false', function() {
          expect(doMemberHUH().returnValue).to(equal, false);
        });
        
        it('should not mutate itself', function() {
          doMemberHUH();
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
  });
});
