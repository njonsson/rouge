Array.prototype.collect=function(block){var result=[];this.each(function(item){result[result.length]=block(item);});return result;};Array.prototype.detect=function(ifNone,block){var array=this;function detectOrNone(noneValue,block){var result=noneValue;array.each(function(item){if(block(item)==true){result=item;return;}});return result;}
var noneValue=(arguments.length>1)?ifNone():null;if(arguments.length==1)block=ifNone;return detectOrNone(noneValue,block);};Array.prototype.each=function(block){return this.eachWithIndex(block);};Array.prototype.eachWithIndex=function(block){for(var i=0;i<this.length;i+=1){block(this[i],i);}
return this;};Array.prototype.map=Array.prototype.collect;