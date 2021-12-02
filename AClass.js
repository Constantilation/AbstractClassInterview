// Создать абстрактный класс “AClass” у которого будет свойство “Numbers” типа Array, который будет содержать
// n натуральных чисел. Также AClass должен иметь метод “fill”, который заполняет массив Numbers случайными числами;
// метод “factorial”, который возвращает массив факториалов из массива Numbers; и абстрактный метод “sort”.
// Конструктор принимает один параметр “n” и вызывает метод “fill”. Метод “fill” можно вызывать только из методов класса
// “AClass”. Метод “factorial” может вызываться из класса AClass и из дочерних классов.
// Реализовать два дочерних класса “Class1” и “Class2” с методом “sort” который сортирует массив Numbers,
// а затем выдает массив факториалов. Способы сортировки в классах “Class1” и “Class2” должны различаться.

/**
 * Base AClass
 */
class AClass {
    /**
     * AClass constructor
     * @param {int} amount - amount of number in array
     * */
    constructor(amount) {
        this._numbers = [];
        this.#fill(amount)
    }

    /**
     * Private method fill, needed to fill array with random _numbers
     * @param {int} amount - amount of number in array
     * */
    #fill(amount) {
        this._numbers = Array(amount)
            .fill()
            .map(() => Math.floor(amount * Math.random()));
    }

    /**
     * Method to count factorial of given number
     * @return {int} n - number to count factorial
     * */
    _factorial = (n) => {
        return n <= 1 ? 1 : n * this._factorial(n - 1)
    };

    /**
     * Method to sort array and return array of factorials of array numbers
     * */
    _sort() {}
}

/**
 * Class with sorting by quick sort
 */
class AClassWithQuickSort extends AClass {
    /**
     * Method to sort array and return array of factorials of array numbers
     * @param {Array} arr to sort with quickSort
     * */
    #quickSort = (arr) =>
        arr.length <= 1 ? arr: [
            ...this.#quickSort(arr.slice(1).filter((el) => el < arr[0])),
            arr[0],
            ...this.#quickSort(arr.slice(1).filter((el) => el >= arr[0])),
        ];

    /**
     * Method to sort array and return array of factorials of array numbers
     * */
    _sort = () => {
        const startTime = performance.now()
        this._numbers = this.#quickSort(this._numbers);

        const factorialsArray = [];
        this._numbers.forEach((elem) => {
            factorialsArray.push(this._factorial(elem))
        });

        const endTime = performance.now()
        return {
            factArray: factorialsArray,
            time: endTime - startTime
        };
    }
}

/**
 * Class with sorting by quick sort
 */
class AClassWithMergeSort extends AClass {
    /**
     * Method to sort array with merge sort
     * @param {Array} left part of array
     * @param {Array} right part of array
     * */
    #merge = (left, right) => {
        const resArr = [];
        let leftIdx = 0;
        let rightIdx = 0;

        while (leftIdx < left.length && rightIdx < right.length) {
            left[leftIdx] < right[rightIdx]
                ? resArr.push(left[leftIdx++])
                : resArr.push(right[rightIdx++]);
        }
        return [...resArr, ...left.slice(leftIdx), ...right.slice(rightIdx)];
    };

    /**
     * Method to sort array with merge sort
     * @param {Array} arr array to be sorted
     * */
    #mergeSort = (arr) =>
        arr.length <= 1
            ? arr
            : this.#merge(
                this.#mergeSort(arr.slice(0, Math.floor(arr.length / 2))),
                this.#mergeSort(arr.slice(Math.floor(arr.length / 2)))
            );

    /**
     * Method to sort array and return array of factorials of array numbers
     * */
    _sort = () => {
        const startTime = performance.now()
        this._numbers = (this._numbers.length) <= 1
            ? this._numbers
            : this.#merge(
                this.#mergeSort(this._numbers.slice(0, Math.floor(this._numbers.length / 2))),
                this.#mergeSort(this._numbers.slice(Math.floor(this._numbers.length / 2)))
            );

        const factorialsArray = [];
        this._numbers.forEach((elem) => {
            factorialsArray.push(this._factorial(elem))
        });

        const endTime = performance.now()
        return {
            factArray: factorialsArray,
            time: endTime - startTime
        };
    }
}

const mergeSort = new AClassWithMergeSort(10)
const quickSort = new AClassWithQuickSort(10)

console.log("Merge Sort result: ", mergeSort._sort());
console.log("Quick Sort result: ", quickSort._sort());
