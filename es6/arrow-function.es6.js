var sum = (first, ...rest) => {
  var sum = first;
  for(let i = 0; i<rest.length;i++) {
    sum += rest[i];
  }
 return sum;
};
