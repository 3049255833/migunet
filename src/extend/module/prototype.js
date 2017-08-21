/**
 * 判断数组是否包含指定元素
 * @param  {[type]} needle [description]
 * @return {[type]}        [description]
 */
Array.prototype.contains = function ( needle ) {
  for (i in this) {
    if (this[i] == needle) return true;
  }
  return false;
}