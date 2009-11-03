Screw.Unit(function() {
  describe('Array', function() {
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
