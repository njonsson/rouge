Screw.Unit(function() {
  before(function() {
    $('#dom_test').empty();
  });
});

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
