/**
 * @fileoverview
 * Defines a JavaScript-idiomatic implementation of the Ruby core library.
 * 
 * @author Nils Jonsson <nils@alumni.rice.edu>
 */

/**
 * Array::new
 * 
 * @member Array
 * 
 * Creates a new array. Several patterns of arguments are accepted.
 * 
 * No arguments:
 * 
 * <pre>
 * var array = Array.new();
 * array // => []
 * </pre>
 * 
 * A non-negative integer:
 * 
 * <pre>
 * var array = Array.new(3);
 * array // => [undefined, undefined, undefined]
 * </pre>
 * 
 * A non-negative integer and a non-Function object:
 * 
 * <pre>
 * var array = Array.new(3, 'foo');
 * array // => ['foo', 'foo', 'foo']
 * </pre>
 * 
 * A non-negative integer and a block:
 * 
 * <pre>
 * var array = Array.new(3, function(i) { return 'item ' + i; });
 * array // => ['item 0', 'item 1', 'item 2']
 * </pre>
 * 
 * An array:
 * 
 * <pre>
 * var arg = ['foo', 'bar', 'baz'];
 * var array = Array.new(arg);
 * array         // => ['foo', 'bar', 'baz']
 * array === arg // => false
 * </pre>
 * 
 * @returns {Array} An array
 */
Array['new'] = function() {
  var withNone = function() {
    return withSize(0);
  };
  var withSize = function(size) {
    return new Array(size);
  };
  var withSizeAndValue = function(size, value) {
    return withSizeAndBlock(size, function(i) {
      return value;
    });
  };
  var withSizeAndBlock = function(size, block) {
    var array = withSize(size);
    Array.helpers.iterate.apply(array, [function(item, i) {
      this[i] = block.apply(this, [i]);
    }]);
    return array;
  };
  var withArray = function(array) {
    var newArray = new Array(array.length);
    Array.helpers.iterate.apply(array, [function(item, i) {
      newArray[i] = item;
    }]);
    return newArray;
  };
  
  if (arguments.length === 0) return withNone();
  if (arguments.length === 1) {
    if (Array.helpers.isTypeOf(arguments[0], Array)) {
      return withArray(arguments[0]);
    }
    return withSize(arguments[0]);
  }
  if (Array.helpers.isTypeOf(arguments[1], Function)) {
    return withSizeAndBlock(arguments[0], arguments[1]);
  }
  return withSizeAndValue(arguments[0], arguments[1]);
};

/**
 * An alias for <b>#areAll</b>.
 * 
 * @param {Function} block (optional) The function to execute. Should have one
 *                         parameter
 * @returns {Boolean} <tt>true</tt> if <i>block</i> does not return
 *                    <tt>false</tt> or <tt>null</tt> for any element
 * 
 * @see #areAll #areAll
 * @see #any?   #any?
 */
Array.prototype['all?'] = function(block) {
  return this.areAll.apply(this, arguments);
};

/**
 * An alias for <b>#isAny</b>.
 * 
 * @param {Function} block (optional) The function to execute. Should have one
 *                         parameter
 * @returns {Boolean} <tt>true</tt> if <i>block</i> returns a value other than
 *                    <tt>false</tt> or <tt>null</tt> for any element
 * 
 * @see #isAny #isAny
 * @see #all?  #all?
 */
Array.prototype['any?'] = function(block) {
  return this.isAny.apply(this, arguments);
};

/**
 * Passes each element in the array to <i>block</i>, returning <tt>true</tt> if
 * <i>block</i> never returns <tt>false</tt> or <tt>null</tt>. If <i>block</i>
 * is not given, Rouge adds an implicit block that will return <tt>true</tt>
 * only if none of the elements is <tt>false</tt> or <tt>null</tt>.
 * 
 * <pre>
 * var array = ['foo', 'bar', 'bizzle'];
 * var result = array.areAll(function(item) {
 *   return item.length >= 3;
 * });
 * result // => true
 * array  // => ['foo', 'bar', 'bizzle']
 * 
 * var array = ['foo', 'bar', 'bizzle'];
 * var result = array.areAll(function(item) {
 *   return item.length >= 4;
 * });
 * result // => false
 * array  // => ['foo', 'bar', 'bizzle']
 * </pre>
 * 
 * Without the optional <i>block</i>:
 * 
 * <pre>
 * var array = [null, true, 99];
 * var result = array.areAll();
 * result // => false
 * array  // => [null, true, 99]
 * </pre>
 * 
 * @param {Function} block (optional) The function to execute. Should have one
 *                         parameter
 * @returns {Boolean} <tt>true</tt> if <i>block</i> does not return
 *                    <tt>false</tt> or <tt>null</tt> for any element
 * 
 * @see #isAny #isAny
 */
Array.prototype.areAll = function(block) {
  if (block === undefined) {
    block = function(item) {
      return ! Array.helpers.isNullOrFalse(item);
    };
  }
  var result = true;
  Array.helpers.iterate.apply(this, [function(item, i) {
    result = block(this[i]);
    if (Array.helpers.isNullOrFalse(result)) return true; // break
  }]);
  return ! Array.helpers.isNullOrFalse(result);
};

/**
 * Creates a different array of the same size. Invokes <i>block</i> once for
 * each element in the array, passing that element as an argument.
 * 
 * <pre>
 * var array = ['foo', 'bar', 'baz'];
 * var result = array.collect(function(item) {
 *   return item + '!';
 * });
 * result // => ['foo!', 'bar!', 'baz!']
 * array  // => ['foo', 'bar', 'baz']
 * </pre>
 * 
 * @param {Function} block The function to execute. Should have one parameter
 * @returns {Array} An array containing the values returned by <i>block</i>
 * 
 * @see #collectThis #collectThis
 * @see #map         #map
 */
Array.prototype.collect = function(block) {
  var result = [];
  Array.helpers.iterate.apply(this, [function(item, i) {
    result[result.length] = block.apply(this, [item]);
  }]);
  return result;
};

/**
 * Invokes <i>block</i> once for each element in the array, replacing that
 * element with the value returned by <i>block</i>.
 * 
 * <pre>
 * var array = ['foo', 'bar', 'baz'];
 * var result = array.collectThis(function(item) {
 *   return item + '!';
 * });
 * result // => ['foo!', 'bar!', 'baz!']
 * array  // => ['foo!', 'bar!', 'baz!']
 * </pre>
 * 
 * @param {Function} block The function to execute. Should have one parameter
 * @returns {Array} The array
 * 
 * @see #collect #collect
 * @see #mapThis #mapThis
 */
Array.prototype.collectThis = function(block) {
  Array.helpers.iterate.apply(this, [function(item, i) {
    this[i] = block.apply(this, [item]);
  }]);
  return this;
};

/**
 * An alias for <b>#collectThis</b>.
 * 
 * @param {Function} block The function to execute. Should have one parameter
 * @returns {Array} The array
 * 
 * @see #collectThis #collectThis
 * @see #collect     #collect
 */
Array.prototype['collect!'] = function(block) {
  return this.collectThis.apply(this, arguments);
};

/**
 * Finds an element in the array. Invokes <i>block</i> once for each element in
 * the array, passing that element as an argument.
 * 
 * <pre>
 * var array = ['foo', 'bar', 'baz'];
 * var result = array.collect(function(item) {
 *   return item === 'bar';
 * });
 * result // => 'bar'
 * array  // => ['foo', 'bar', 'baz']
 * </pre>
 * 
 * With the optional <i>ifNone</i> argument:
 * 
 * <pre>
 * var array = ['foo', 'bar', 'baz'];
 * var ifNone = function() { return 'nothing here'; };
 * var result = array.detect(ifNone, function(item) {
 *   return item === 'bizzle';
 * });
 * result // => 'nothing here'
 * array  // => ['foo', 'bar', 'baz']
 * </pre>
 * 
 * @param {Function} ifNone (optional) A function that returns the value to be
 *                          returned by <i>#detect</i> if there are no matches
 * @param {Function} block The function to execute. Should have one parameter
 *                         and return either <tt>true</tt> or <tt>false</tt>
 * @returns The first element for which <i>block</i> returns <tt>true</tt>. If
 *          <i>block</i> never returns <tt>true</tt> and <i>ifNone</i> is
 *          specified, then the return value of a call to <i>ifNone</i> is used.
 *          If <i>block</i> never returns <tt>true</tt> and <i>ifNone</i> is not
 *          specified, then <tt>null</tt> is used
 * 
 * @see #find   #find
 * @see #select #select
 */
Array.prototype.detect = function(ifNone, block) {
  function detectOrNone(ifNone, block) {
    var found = [];
    Array.helpers.iterate.apply(this, [function(item, i) {
      if (! Array.helpers.isNullOrFalse(block.apply(this, [item]))) {
        found.push(item);
        return true; // break
      }
    }]);
    return (found.length > 0) ? found.pop() : ifNone.apply(this, []);
  }
  
  var ifNoneToUse = (arguments.length > 1) ?
                    ifNone :
                    function() { return null; };
  if (arguments.length === 1) block = arguments[0];
  return detectOrNone.apply(this, [ifNoneToUse, block]);
};

/**
 * Returns <tt>true</tt> if <i>value</i> is an element of the array.
 * 
 * <pre>
 * var array = ['foo', 'bar', 'baz'];
 * var result = array.doesInclude('bar');
 * result // => true
 * array  // => ['foo', 'bar', 'baz']
 * 
 * var array = ['foo', 'bar', 'baz'];
 * var result = array.doesInclude('bizzle');
 * result // => false
 * array  // => ['foo', 'bar', 'baz']
 * </pre>
 * 
 * @param {Object} value A value to look for
 * @returns {Boolean} <tt>true</tt> if <i>value</i> is an element
 * 
 * @see #hasMember #hasMember
 */
Array.prototype.doesInclude = function(value) {
  var found = false;
  Array.helpers.iterate.apply(this, [function(item, i) {
    if (item === value) {
      found = true;
      return true; // break;
    }
  }]);
  return found;
};

/**
 * Invokes <i>block</i> once for each element in the array, passing that element
 * as an argument.
 * 
 * <pre>
 * var array = ['foo', 'bar', 'baz'];
 * array.each(function(item) {
 *   alert(item);
 * });
 * </pre>
 * 
 * opens three alert boxes:
 * 
 * <ul>
 *   <li>foo</li>
 *   <li>bar</li>
 *   <li>baz</li>
 * </ul>
 * 
 * @param {Function} block The function to execute. Should have one parameter
 * @returns {Array} The array
 * 
 * @see #eachWithIndex #eachWithIndex
 * @see #eachCons      #eachCons
 * @see #eachSlice     #eachSlice
 */
Array.prototype.each = function(block) {
  return Array.helpers.iterate.apply(this, [function(item, i) {
    block.apply(this, [item]);
  }]);
};

/**
 * Invokes <i>block</i> once for each array of <i>n</i> consecutive elements in
 * the array, passing that array of <i>n</i> elements as an argument.
 * 
 * <pre>
 * var array = ['foo', 'bar', 'baz'];
 * array.eachCons(1, function(item) {
 *   alert(item.toString());
 * });
 * </pre>
 * 
 * opens three alert boxes:
 * 
 * <ul>
 *   <li>foo</li>
 *   <li>bar</li>
 *   <li>baz</li>
 * </ul>
 * 
 * <pre>
 * var array = ['foo', 'bar', 'baz'];
 * array.eachCons(2, function(item) {
 *   alert(item);
 * });
 * </pre>
 * 
 * opens two alert boxes:
 * 
 * <ul>
 *   <li>foo,bar</li>
 *   <li>bar,baz</li>
 * </ul>
 * 
 * @param {Number} n The number of consecutive elements
 * @param {Function} block The function to execute. Should have one parameter
 * @returns {Array} The array
 * 
 * @see #each      #each
 * @see #eachSlice #eachSlice
 */
Array.prototype.eachCons = function(n, block) {
  var cons;
  var grouper = function(item, j) {
    cons.push(item);
  };
  for (var i = 0; i + n <= this.length; i += 1) {
    cons = [];
    Array.helpers.iterate.apply(this,
                                [{'first': i, 'last': i + n - 1}, grouper]);
    block.apply(this, [cons]);
  }
  return this;
};

/**
 * Invokes <i>block</i> once for each slice of <i>n</i> consecutive elements in
 * the array, passing that array of <i>n</i> elements as an argument.
 * 
 * <pre>
 * var array = ['foo', 'bar', 'baz'];
 * array.eachSlice(1, function(item) {
 *   alert(item.toString());
 * });
 * </pre>
 * 
 * opens three alert boxes:
 * 
 * <ul>
 *   <li>foo</li>
 *   <li>bar</li>
 *   <li>baz</li>
 * </ul>
 * 
 * <pre>
 * var array = ['foo', 'bar', 'baz'];
 * array.eachSlice(2, function(item) {
 *   alert(item);
 * });
 * </pre>
 * 
 * opens two alert boxes:
 * 
 * <ul>
 *   <li>foo,bar</li>
 *   <li>baz</li>
 * </ul>
 * 
 * @param {Number} n The number of elements per slice
 * @param {Function} block The function to execute. Should have one parameter
 * @returns {Array} The array
 * 
 * @see #each     #each
 * @see #eachCons #eachCons
 */
Array.prototype.eachSlice = function(n, block) {
  var slice;
  var grouper = function(item, j) {
    slice.push(item);
  };
  for (var i = 0; i + n <= this.length; i += n) {
    slice = [];
    Array.helpers.iterate.apply(this,
                                [{'first': i, 'last': i + n - 1}, grouper]);
    block.apply(this, [slice]);
  }
  var remainder = this.length % n;
  if (remainder > 0) {
    slice = [];
    Array.helpers.iterate.apply(this,
                                [{'first': this.length - remainder,
                                  'last':  this.length - 1},
                                 grouper]);
    block.apply(this, [slice]);
  }
  return this;
};

/**
 * Invokes <i>block</i> once for each element in the array, passing that element
 * and its index as arguments.
 * 
 * <pre>
 * var array = ['foo', 'bar', 'baz'];
 * array.eachWithIndex(function(item, index) {
 *   alert(index + ': ' + item);
 * });
 * </pre>
 * 
 * opens three alert boxes:
 * 
 * <ul>
 *   <li>0: foo</li>
 *   <li>1: bar</li>
 *   <li>2: baz</li>
 * </ul>
 * 
 * @param {Function} block The function to execute. Should have two parameters
 * @returns {Array} The array
 * 
 * @see #each #each
 */
Array.prototype.eachWithIndex = function(block) {
  return Array.helpers.iterate.apply(this, [function(item, i) {
    block.apply(this, [item, i]);
  }]);
};

/**
 * An alias for <b>#detect</b>.
 * 
 * @param {Function} ifNone (optional) A function that returns the value to be
 *                          returned by <i>#find</i> if there are no matches
 * @param {Function} block The function to execute. Should have one parameter
 *                         and return either <tt>true</tt> or <tt>false</tt>
 * @returns The first element for which <i>block</i> returns <tt>true</tt>. If
 *          <i>block</i> never returns <tt>true</tt> and <i>ifNone</i> is
 *          specified, then the return value of a call to <i>ifNone</i> is used.
 *          If <i>block</i> never returns <tt>true</tt> and <i>ifNone</i> is not
 *          specified, then <tt>null</tt> is used
 * 
 * @see #detect  #detect
 * @see #findAll #findAll
 */
Array.prototype.find = function(ifNone, block) {
  return this.detect.apply(this, arguments);
};

/**
 * An alias for <b>#select</b>.
 * 
 * @param {Function} block The function to execute. Should have one parameter
 *                         and return either <tt>true</tt> or <tt>false</tt>
 * @returns {Array} An array of the elements for which <i>block</i> returns
 *                  <tt>true</tt>.
 * 
 * @see #select #select
 * @see #find   #find
 */
Array.prototype.findAll = function(block) {
  return this.select.apply(this, arguments);
};

/**
 * Filters the array to elements matching <i>pattern</i>, passing each matching
 * element in the array to <i>block</i>. If <i>block</i> is not given, Rouge
 * adds an implicit block that will return the element. Invokes <i>block</i>
 * once for each matching element in the array, passing that element as an
 * argument.
 * 
 * <pre>
 * var array = ['foo', 'bar', 'baz'];
 * var result = array.grep(/r/);
 * result // => ['bar']
 * array  // => ['foo', 'bar', 'baz']
 * </pre>
 * 
 * With the optional <i>block</i>:
 * 
 * <pre>
 * var array = ['foo', 'bar', 'baz'];
 * var result = array.grep(/r/, function(s) { return 'matched ' + s; });
 * result // => ['matched bar']
 * array  // => ['foo', 'bar', 'baz']
 * </pre>
 * 
 * @param {Regexp} pattern The pattern to match
 * @param {Function} block (optional) The function to execute. Should have one
 *                         parameter
 * @returns {Array} An array containing the return values of <i>block</i> for
 *                  the matching elements
 * 
 * @see #select #select
 */
Array.prototype.grep = function(pattern, block) {
  if (arguments.length === 1) {
    block = function(item) {
      return item;
    };
  }
  var selected = [];
  Array.helpers.iterate.apply(this, [function(item, i) {
    if (pattern.test(item)) {
      selected.push(block.apply(this, [item]));
    }
  }]);
  return selected;
};

/**
 * An alias for <b>#doesInclude</b>.
 * 
 * @param {Object} value A value to look for
 * @returns {Boolean} <tt>true</tt> if <i>value</i> is an element
 * 
 * @see #doesInclude #doesInclude
 */
Array.prototype.hasMember = function(value) {
  return this.doesInclude.apply(this, arguments);
};

/**
 * An alias for <b>#doesInclude</b>.
 * 
 * @param {Object} value A value to look for
 * @returns {Boolean} <tt>true</tt> if <i>value</i> is an element
 * 
 * @see #doesInclude #doesInclude
 * @see #member?     #member?
 */
Array.prototype['include?'] = function(block) {
  return this.doesInclude.apply(this, arguments);
};

/**
 * Combines the elements of the array by applying <i>block</i> to an accumulator
 * value (<i>memo</i>) and each element in turn. Invokes <i>block</i> once for
 * each element in the array, passing <i>memo</i> and that element as arguments.
 * At each invocation of <i>block</i>, <i>memo</i> is set to the value returned
 * by <i>block</i> previously.
 * 
 * The first form lets you supply an initial value for <i>memo</i>.
 * 
 * <pre>
 * var array = [1, 2, 3, 4];
 * var result = array.inject(10, function(memo, item) {
 *   return memo * item;
 * });
 * result // => 240
 * array  // => [1, 2, 3, 4]
 * </pre>
 * 
 * The second form uses the first element as the <i>initial</i> value (and skips
 * that element while iterating).
 * 
 * <pre>
 * var array = [1, 2, 3, 4];
 * var result = array.inject(function(memo, item) {
 *   return memo * item;
 * });
 * result // => 24
 * array  // => [1, 2, 3, 4]
 * </pre>
 * 
 * @param {Object} initial (optional) The initial value of the <i>memo</i>
 *                         argument passed to <i>block</i>
 * @param {Function} block The function to execute. Should have two parameters
 *                         (<i>memo</i> and the element) and return the new
 *                         value of <i>memo</i>
 * @returns The value returned from the last invocation of <i>block</i>
 */
Array.prototype.inject = function(initial, block) {
  var memo    = null;
  var options = {};
  if (arguments.length === 1) {
    memo          = this[0];
    block         = arguments[0];
    options.first = 1;
  } else {
    memo = initial;
  }
  Array.helpers.iterate.apply(this, [options, function(item, i) {
    memo = block.apply(this, [memo, item]);
  }]);
  return memo;
};

/**
 * Passes each element in the array to <i>block</i>, returning <tt>true</tt> if
 * <i>block</i> ever returns a value other than <tt>false</tt> or <tt>null</tt>.
 * If <i>block</i> is not given, Rouge adds an implicit block that will return
 * <tt>true</tt> if any of the elements is not <tt>false</tt> or <tt>null</tt>.
 * 
 * <pre>
 * var array = ['foo', 'bar', 'bizzle'];
 * var result = array.isAny(function(item) {
 *   return item.length >= 3;
 * });
 * result // => true
 * array  // => ['foo', 'bar', 'bizzle']
 * 
 * var array = ['foo', 'bar', 'bizzle'];
 * var result = array.isAny(function(item) {
 *   return item.length <= 2;
 * });
 * result // => false
 * array  // => ['foo', 'bar', 'bizzle']
 * </pre>
 * 
 * Without the optional <i>block</i>:
 * 
 * <pre>
 * var array = [null, true, 99];
 * var result = array.isAny();
 * result // => true
 * array  // => [null, true, 99]
 * </pre>
 * 
 * @param {Function} block (optional) The function to execute. Should have one
 *                         parameter
 * @returns {Boolean} <tt>true</tt> if <i>block</i> returns a value other than
 *                    <tt>false</tt> or <tt>null</tt> for any element
 * 
 * @see #areAll #areAll
 */
Array.prototype.isAny = function(block) {
  if (block === undefined) {
    block = function(item) {
      return ! Array.helpers.isNullOrFalse(item);
    };
  }
  var result = false;
  Array.helpers.iterate.apply(this, [function(item, i) {
    result = block(this[i]);
    if (! Array.helpers.isNullOrFalse(result)) return true;
  }]);
  return ! Array.helpers.isNullOrFalse(result);
};

/**
 * An alias for <b>#collect</b>.
 * 
 * @param {Function} block The function to execute. Should have one parameter
 * @returns {Array} An array containing the values returned by <i>block</i>
 * 
 * @see #collect #collect
 * @see #mapThis #mapThis
 */
Array.prototype.map = function(block) {
  return this.collect.apply(this, arguments);
};

/**
 * An alias for <b>#collectThis</b>.
 * 
 * @param {Function} block The function to execute. Should have one parameter
 * @returns {Array} The array
 * 
 * @see #collectThis #collectThis
 * @see #map         #map
 */
Array.prototype.mapThis = function(block) {
  return this.collectThis.apply(this, arguments);
};

/**
 * An alias for <b>#mapThis</b>.
 * 
 * @param {Function} block The function to execute. Should have one parameter
 * @returns {Array} The array
 * 
 * @see #mapThis #mapThis
 * @see #map     #map
 */
Array.prototype['map!'] = function(block) {
  return this.mapThis.apply(this, arguments);
};

/**
 * An alias for <b>#hasMember</b>.
 * 
 * @param {Object} value A value to look for
 * @returns {Boolean} <tt>true</tt> if <i>value</i> is an element
 * 
 * @see #hasMember #hasMember
 * @see #include?  #include?
 */
Array.prototype['member?'] = function(block) {
  return this.hasMember.apply(this, arguments);
};

/**
 * Returns two arrays, the first containing the elements for which <i>block</i>
 * returns <tt>true</tt>, the second containing the rest. Invokes <i>block</i>
 * once for each element in the array, passing that element as an argument.
 * 
 * <pre>
 * var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * var result = array.partition(function(item) {
 *   return (item % 3) === 0;
 * });
 * result // => [[3, 6, 9], [1, 2, 4, 5, 7, 8, 10]]
 * array  // => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * </pre>
 * 
 * @param {Function} block The function to execute. Should have one parameter
 *                         and return either <tt>true</tt> or <tt>false</tt>
 * @returns {Array} An array containing two arrays, the first containing the
 *                  elements for which <i>block</i>, the second containing the
 *                  rest
 * 
 * @see #select #select
 * @see #reject #reject
 */
Array.prototype.partition = function(block) {
  var selected = [];
  var rejected = [];
  Array.helpers.iterate.apply(this, [function(item, i) {
    if (Array.helpers.isNullOrFalse(block.apply(this, [item]))) {
      rejected.push(item);
    } else {
      selected.push(item);
    }
  }]);
  return [selected, rejected];
};

/**
 * Filters the array to elements for which <i>block</i> returns <tt>false</tt>.
 * Invokes <i>block</i> once for each element in the array, passing that element
 * as an argument.
 * 
 * <pre>
 * var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * var result = array.reject(function(item) {
 *   return (item % 2) === 0;
 * });
 * result // => [1, 3, 5, 7, 9]
 * array  // => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * </pre>
 * 
 * @param {Function} block The function to execute. Should have one parameter
 *                         and return either <tt>true</tt> or <tt>false</tt>
 * @returns {Array} An array containing the elements for which <i>block</i>
 *                  returns <tt>false</tt>
 * 
 * @see #select #select
 */
Array.prototype.reject = function(block) {
  var selected = [];
  Array.helpers.iterate.apply(this, [function(item, i) {
    if (Array.helpers.isNullOrFalse(block.apply(this, [item]))) {
      selected.push(item);
    }
  }]);
  return selected;
};

/**
 * Filters the array to elements for which <i>block</i> returns <tt>true</tt>.
 * Invokes <i>block</i> once for each element in the array, passing that element
 * as an argument.
 * 
 * <pre>
 * var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * var result = array.select(function(item) {
 *   return (item % 3) === 0;
 * });
 * result // => [3, 6, 9]
 * array  // => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * </pre>
 * 
 * @param {Function} block The function to execute. Should have one parameter
 *                         and return either <tt>true</tt> or <tt>false</tt>
 * @returns {Array} An array containing the elements for which <i>block</i>
 *                  returns <tt>true</tt>
 * 
 * @see #findAll #findAll
 * @see #grep    #grep
 * @see #reject  #reject
 * @see #detect  #detect
 */
Array.prototype.select = function(block) {
  var selected = [];
  Array.helpers.iterate.apply(this, [function(item, i) {
    if (! Array.helpers.isNullOrFalse(block.apply(this, [item]))) {
      selected.push(item);
    }
  }]);
  return selected;
};

/**
 * @private
 */
Array.helpers = {
  'isNullOrFalse': function(expr) {
    return (expr === null) || (expr === false);
  },
  
  'isTypeOf': function(object, type) {
    return object.constructor.toString() === type.toString();
  },
  
  'iterate': function(options, block) {
    if (arguments.length === 1) {
      block = options;
      options = {};
    }
    
    if (options.first === undefined) options.first = 0;
    if (options.last  === undefined) options.last  = this.length - 1;
    
    for (var i = options.first; i <= options.last; i += 1) {
      if (block.apply(this, [this[i], i])) break;
    }
    return this;
  }
};
