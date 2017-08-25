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
};
/**
 * 通过某个特定属性判断数组中是否含有
 * */
