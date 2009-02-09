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
 * @returns An array containing the values returned by <i>block</i>
 */
Array.prototype.collect = function(block) {
  var result = [];
  this.each(function(item) {
    result[result.length] = block(item);
  });
  return result;
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
 * var result = array.collect(function() { return 'nothing here'; }, function(item) {
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
 */
Array.prototype.detect = function(ifNone, block) {
  var array = this;
  function detectOrNone(noneValue, block) {
    var result = noneValue;
    array.each(function(item) {
      if (block(item) == true) {
        result = item;
        return;
      }
    });
    return result;
  }
  
  var noneValue = (arguments.length > 1) ? ifNone() : null;
  if (arguments.length == 1) block = ifNone;
  return detectOrNone(noneValue, block);
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
 * @returns The array
 */
Array.prototype.each = function(block) {
  return this.eachWithIndex(block);
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
 * @returns The array
 */
Array.prototype.eachWithIndex = function(block) {
  for (var i = 0; i < this.length; i += 1) {
    block(this[i], i);
  }
  return this;
};

Array.prototype.map = Array.prototype.collect;