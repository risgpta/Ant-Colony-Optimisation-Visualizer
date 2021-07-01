const IsReverseSorted = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) return false;
  }
  return true;
};

const getJustBiggerNumber = (arr, index, k) => {
  for (let i = arr.length - 1; i >= index; i--) {
    if (arr[i] > k) return i;
  }
  return 0;
};
const getNextPermutation = (arr) => {
  if (IsReverseSorted(arr)) return [];
  let k;
  for (let i = arr.length - 2; i >= 0; i--) {
    if (arr[i] < arr[i + 1]) {
      let l = getJustBiggerNumber(arr, i + 1, arr[i]);
      let temp = arr[i];
      arr[i] = arr[l];
      arr[l] = temp;
      k = i;
      break;
    }
  }

  let restArr = arr.splice(k + 1, arr.length - 1 - k);
  restArr.sort();
  //console.log("h1", arr);
  //console.log("h2", restArr);

  arr = [...arr, ...restArr];
  return arr;
};

export default getNextPermutation;
