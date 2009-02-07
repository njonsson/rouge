/**
 * @fileoverview
 * Defines functions that extend the Array prototype such that it behaves like
 * Ruby's Array class.
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
