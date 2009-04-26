/**
 * @fileoverview
 * Defines a JavaScript-idiomatic implementation of the Ruby core library.
 * 
 * @author Nils Jonsson <nils@alumni.rice.edu>
 */

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
 * @see #map #map
 */
Array.prototype.collect = function(block) {
  var result = [];
  this.each(function(item) {
    result[result.length] = block(item);
  });
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
 * @see #mapThis #mapThis
 */
Array.prototype.collectThis = function(block) {
  var self = this;
  this.eachWithIndex(function(item, index) {
    self[index] = block(item);
  });
  return this;
};

/**
 * Finds an element in the array. Invokes <i>block</i> once for each element in
 * the array, passing that element as an argument.
 * 
 * <pre>
 * var array = ['foo', 'bar', 'baz'];
 * var result = array.collect(function(item) {
 *   return item == 'bar';
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
 *   return item == 'bizzle';
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
 * @see #find #find
 */
Array.prototype.detect = function(ifNone, block) {
  function detectOrNone(noneValue, block) {
    for (var i = 0; i < this.length; i += 1) {
      var item = this[i];
      if (block(item)) return item;
    }
    return noneValue;
  }
  
  var noneValue = (arguments.length > 1) ? ifNone() : null;
  if (arguments.length === 1) {
    block = ifNone;
  }
  return detectOrNone.apply(this, [noneValue, block]);
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
 */
Array.prototype.each = function(block) {
  return this.eachWithIndex(function(item, index) {
    return block(item);
  });
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
  for (var i = 0; i < this.length; i += 1) {
    block(this[i], i);
  }
  return this;
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
 * @see #detect #detect
 */
Array.prototype.find = function(ifNone, block) {
  return this.detect.apply(this, arguments);
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
  var memo = this[0];
  if (arguments.length === 1) {
    block = initial;
    for (var i = 1; i < this.length; i++) {
      memo = block(memo, this[i]);
    }
    return memo;
  }
  
  memo = initial;
  this.each(function(item) {
    memo = block(memo, item);
  });
  return memo;
};

/**
 * An alias for <b>#collect</b>.
 * 
 * @param {Function} block The function to execute. Should have one parameter
 * @returns {Array} An array containing the values returned by <i>block</i>
 * 
 * @see #collect #collect
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
 */
Array.prototype.mapThis = function(block) {
  return this.collectThis.apply(this, arguments);
};
