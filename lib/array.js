Array.prototype.each = function() {
  var block = arguments[arguments.length - 1];
  return this.eachWithIndex(block);
};

Array.prototype.eachWithIndex = function() {
  var block = arguments[arguments.length - 1];
  for (var i = 0; i < this.length; i++) {
    block(this[i], i);
  }
  return this;
};

Array.prototype.collect = function() {
  var result = [];
  var block = arguments[arguments.length - 1];
  this.each(function(item) {
    result[result.length] = block(item);
  });
  return result;
};
