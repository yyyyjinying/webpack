/***
 * [1,3,1,3,4,4]
 */
const Card01 = arr => {
  arr.sort((a, b) => a - b);
  let dst = [];
  let result = true;
  let min = Number.MAX_SAFE_INTEGER;
  for (let i = 0, ln = arr.length; i < ln; i++) {
    let tmp = [];
    tmp.push(arr[i]);
    for (let j = i + 1; j < ln - 1; j++) {
      if (arr[i] === arr[j]) {
        tmp.push(arr[j]);
      } else {
        if (min > tmp.length) {
          min = tmp.length;
        }
        dst.push([].concat(tmp));
        i = j;
        break;
      }
    }
  }
  console.log(dst);
  dst.every(item => {
    if (item.length % min !== 0) {
      result = false;
      return false;
    }
  });
  console.log(result);
  return result;
};

/**
 * 
 * @param {递归函数，用来算输入为n的格雷编码序列} n 
 */
const Card02 = n => {
  const mark = n => {
    if (n === 1) {
      return [0, 1];
    } else {
      console.log(n); // 3 , 2
      let prev = mark(n - 1);
      let result = [];
      let max = Math.pow(2, n) - 1;

      for (let i = 0, ln = prev.length; i < ln; i++) {
        result[i] = `0${prev[i]}`;
        result[max - i] = `1${prev[i]}`;
      }
      return result;
    }
  };
  return mark(n);
};

/**
 * 
 * @param {冒泡排序} arr 
 */
const Card03 = arr => {
  for (let i = arr.length; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      let tmp = arr[j];
      if (tmp > arr[j + 1]) {
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
  }
  return arr;
};

/**
 * 
 * @param {选择排序} arr 
 */
const sort02 = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let tmp = arr[i];
    for (let j = i + 1; j < arr.length; j++) {
      if(arr[j] < tmp){
        let c = tmp;
        tmp = arr[j];
        arr[j] = c;
      }
    }

    arr[i] = tmp;
  }
  return arr;
}

/**
 * console.log(Arr.sort03([1,6,3,9]));
 */
const sort03 = (arr) => {
  arr.sort();
  let max = 0;
  let tmp = 0;
  for(let i = 0; i < arr.length; i++){
    tmp = arr[i + 1] - arr[i];
    if(tmp > max){
      max = tmp;
    }
  }
  return max;
}

/**
 * 按奇偶排序数组 II

 */
const sort04 = (arr) => {
  arr.sort((a, b) => a - b);

  let odd = 1;
  let even = 0;

  let nArr = [];

  arr.forEach(item => {
    if(item % 2 === 1){
      nArr[odd] = item;
      odd += 2;
    } else {
      nArr[even] = item;
      even += 2;
    }
  })

  return nArr;

}

const sort05 = (arr, k) => {
  let ln = arr.length - 1;
  for (let i = ln; i > ln - k; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        let tmp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = tmp;
      }
    }
  }

  return arr[ln - k];
}



// console.log(Arr.Card02(3));
// console.log(Arr.Card03([1,3,5,8,2,56,23]));
export { Card01, Card02, Card03, sort02, sort03, sort04, sort05 };
