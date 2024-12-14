let arr = [];
let arrayElements = [];

function generateArray() {
  const arraySize = document.getElementById("arraySize").value;
  const arrayContainer = document.getElementById("arrayElementsContainer");
  const windowWidth = window.innerWidth;
  const maxBoxWidth = 50; // Maximum width of each box in pixels
  const totalPadding = 30; // Additional padding or margins
  const boxWidth = Math.min(
    maxBoxWidth,
    (windowWidth - totalPadding) / arraySize
  ); // Calculate the appropriate box width

  arrayContainer.innerHTML = ""; // Clear previous array elements
  arr = [];
  arrayElements = [];

  for (let i = 0; i < arraySize; i++) {
    const randomHeight = Math.floor(Math.random() * 15) + 1;
    const div = document.createElement("div");
    div.classList.add("cont");
    div.style.height = `${randomHeight}rem`;
    div.style.width = `${boxWidth}px`; // Set the dynamic width
    div.style.backgroundColor = getRandomColor();
    arrayContainer.appendChild(div);

    arr.push(randomHeight);
    arrayElements.push(div);
  }
}

function swapDivs(el1, el2) {
  const parent = el1.parentNode;
  const nextEl1 = el1.nextSibling;
  const nextEl2 = el2.nextSibling;

  parent.insertBefore(el2, el1);
  if (nextEl2 === el1) {
    parent.insertBefore(el1, el2);
  } else {
    parent.insertBefore(el1, nextEl2);
  }
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function moveDivBefore(divToMove, referenceDiv) {
  const parent = referenceDiv.parentNode;
  parent.insertBefore(divToMove, referenceDiv);
}

async function bubbleSort() {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let firstElement = arrayElements[j];
        let secondElement = arrayElements[j + 1];

        moveDivBefore(secondElement, firstElement);

        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        arrayElements[j] = secondElement;
        arrayElements[j + 1] = firstElement;

        await sleep(200);
      }
    }
  }
}

async function selectionSort() {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    let firstElement = arrayElements[minIndex];
    let secondElement = arrayElements[i];
    swapDivs(firstElement, secondElement);

    if (minIndex !== i) {
      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;

      arrayElements[i] = firstElement;
      arrayElements[minIndex] = secondElement;
    }

    await sleep(200);
  }
}

async function insertionSort() {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let keyElement = arrayElements[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      let elementToMove = arrayElements[j];
      let nextElement = arrayElements[j + 1];

      moveDivBefore(elementToMove, nextElement);

      j--;
      await sleep(200);
    }
    arr[j + 1] = key;
    if (j + 1 !== i) {
      let elementToInsert = arrayElements[i];
      let position = arrayElements[j + 1];

      moveDivBefore(elementToInsert, position);
      arrayElements.splice(j + 1, 0, arrayElements.splice(i, 1)[0]);
      await sleep(200);
    }
  }
}

async function Quicksort() {
  async function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; ++j) {
      if (arr[j] < pivot) {
        ++i;

        // Swap elements in the array
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        // Swap the div elements
        await swapDivs(arrayElements[i], arrayElements[j]);

        // Update the references in the arrayElements array
        let tempDiv = arrayElements[i];
        arrayElements[i] = arrayElements[j];
        arrayElements[j] = tempDiv;
      }
    }

    // Place the pivot element in the correct position
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    // Swap the div elements
    await swapDivs(arrayElements[i + 1], arrayElements[high]);

    // Update the references in the arrayElements array
    let tempDiv = arrayElements[i + 1];
    arrayElements[i + 1] = arrayElements[high];
    arrayElements[high] = tempDiv;

    return i + 1;
  }

  async function quickSort(arr, low, high) {
    if (low < high) {
      let pi = await partition(arr, low, high);
      await sleep(200);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
  }

  await quickSort(arr, 0, arr.length - 1);
}

async function mergeSortHandler() {
  async function merge(arr, left, mid, right) {
    let n1 = mid - left + 1;
    let n2 = right - mid;

    let L = arr.slice(left, mid + 1);
    let R = arr.slice(mid + 1, right + 1);

    let i = 0,
      j = 0,
      k = left;

    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        arrayElements[k].style.height = `${L[i]}rem`;
        i++;
      } else {
        arr[k] = R[j];
        arrayElements[k].style.height = `${R[j]}rem`;
        j++;
      }
      k++;
      await sleep(200);
    }

    while (i < n1) {
      arr[k] = L[i];
      arrayElements[k].style.height = `${L[i]}rem`;
      i++;
      k++;
      await sleep(200);
    }

    while (j < n2) {
      arr[k] = R[j];
      arrayElements[k].style.height = `${R[j]}rem`;
      j++;
      k++;
      await sleep(200);
    }
  }

  async function mergeSort(arr, left, right) {
    if (left < right) {
      let mid = Math.floor((left + right) / 2);

      await mergeSort(arr, left, mid);
      
      await mergeSort(arr, mid + 1, right);

      await merge(arr, left, mid, right);
    }
  }

  await mergeSort(arr, 0, arr.length - 1);
}
