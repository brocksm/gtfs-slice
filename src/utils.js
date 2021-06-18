module.exports = {
  unique: ({arr, key}) => {
    let seen = {};
    return arr.filter(function(item) {
      let accessor = key ? item[key] : item,
          result = seen.hasOwnProperty(accessor) ? false : (seen[accessor] = true);			    
      return result;
    }).map(arr => key ? arr[key] : arr)
  },
  choose: ({arr, k, prefix=[]}) => {
    if (k == 0) return [prefix];
  
    return arr.flatMap((v, i) =>
      choose(arr.slice(i+1), k-1, [...prefix, v])
    );
  },
  defined: (arg) => {
    return typeof arg != 'undefined';
  }
} 