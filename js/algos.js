// Converts from degrees to radians.
Number.prototype.toRadians = function () {
    return this * Math.PI / 180;
};


function distanceFromAnnecy(city) {
    //rayon de la terre 
    let R = 6371; // Kmetres
    let annecyPos = [45.8494545, 6.1106385];
    let cityPos = [parseFloat(city.latitude), parseFloat(city.longitude)];

    let annecyLat = annecyPos[0].toRadians();
    let cityLat = cityPos[0].toRadians();
    let latDiff = (cityPos[0] - annecyPos[0]).toRadians();
    let longDiff = (cityPos[1] - annecyPos[1]).toRadians();

    let a = Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
        Math.cos(annecyLat) * Math.cos(cityLat) *
        Math.sin(longDiff / 2) * Math.sin(longDiff / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    let distance = R * c;

    // console.log(city.nom_commune, distance);

    return distance;
}

function swap(i, j) // Swap the values in array csvData
{
    displayBuffer.push(['swap', i, j]); // Do not delete this line (for display)    

    //prend comme paramètre les indices de 2 villes dans le tableau csvData et permute ces 2 villes.
    let temp = csvData[i];
    csvData[i] = csvData[j];
    csvData[j] = temp;

}

function isLess(A, B) {
    displayBuffer.push(['compare', A, B]); // Do not delete this line (for display)

    // prends en paramètre les indices sur 2 villes du tableaux et retourne vrai si csvData[i] est plus prêt de Annecy que csvData[j].
    if (distanceFromAnnecy(csvData[A]) < distanceFromAnnecy(csvData[B])) {

        return true;
    } else {
        return false
    }
}


function insertsort() {
    for (let i = 0; i < csvData.length - 1; i++) {

        for (let j = i; j > 0; j--) {

            if (isLess(j, j - 1)) {
                swap(j, j - 1);

            }
        }
    }
}

function selectionsort() {

    for (let i = 0; i < csvData.length - 1; i++) {
        // le tableau est trié de 0 à i-1
        // La boucle interne recherche le maximum  
        // de i+1 à la fin du tableau.
        for (let j = i + 1; j < csvData.length; j++) {
            if (isLess(j, i)) {
                swap(i, j);
            }
        }
    }
}

function bubblesort() {

    for (let i = 0; i < csvData.length - 1; i++) {
        for (let j = 0; j < csvData.length - (i + 1); j++) {

            if (isLess(j + 1, j)) {
                swap(j + 1, j)
            }
        }
    }
}

function shellsort() {
    console.log("implement me !");
}

function mergesort(data) {
    console.log("implement me !");
}

function heapsort(data) {
    console.log("implement me !");
}

function quicksort() {
    partition(csvData, "random", 0, csvData.length -1);
}

function quicksortin(aa, pivot_type, left, right) {
    if (typeof (left) === "undefined") left = 0;
    if (typeof (right) === "undefined") right = aa.length -1;   

   // if (left >= right) return;

    let pivot = partition(aa, pivot_type, left, right);
    quicksortin(aa, pivot_type, left, pivot - 1);
    quicksortin(aa, pivot_type, pivot + 1, right);
}

function partition(aa, pivot_type, left, right) {
    let pivot = choose_pivot(aa, pivot_type, left, right);

    for(let i = left; i < pivot; i++) {
    //  pivot = right
        if (isLess(i, pivot)) {
            left++;
        } else {
            aa.splice(aa.length - 1, 0, aa[i]);
            aa.splice(left, 1);
        }
    }

    for (let j = right; j > pivot; j--){
    // pivot = left
        if (isLess(j, pivot)) {
            aa.splice(pivot - 1, 0, aa[j]);
            right++;
            aa.splice(right, 1);
            right--;

        } else {
            right--;
        }
    }  

    console.log(aa);

}


    /*correction*/
    // pour plus de simplicité on place le pivot en fin et quand le tri 
    // est fini on le remet à sa place avec le swap(right, pivot)
    // swap(pivot, right);
   
    // pivot = left;
    // for (let i = left; i < right; i++) {
    //     if (isLess(i, right)) {
    //         if (i !== pivot) {
    //             swap(i, pivot)
    //         }
    //         pivot += 1;
    //     }
    // }
    // swap(right, pivot);

    // return pivot;


function choose_pivot(aa, pivot_type, left, right) {
    if (typeof (left) === "undefined") left = 0;
    if (typeof (right) === "undefined") right = aa.length -1;
    
    let pivot = 0;

    if (pivot_type === "random") {
        pivot = Math.floor(Math.random()*(right - left) + left);
    } else if (pivot_type === "first"){
        pivot = left;
    } else if (pivot_type === "last"){
        pivot = right;
    } else if (pivot_type === "middle"){
        pivot = Math.round((left + right)/2);
    } else if (pivot_type === "median"){
       //TODO
    } else {
        throw 'invalid pivot_type' + pivot_type;
    }
    console.log(pivot)
    return pivot;
}

function median(aa){
    
}

function quick3sort(data) {
    console.log("implement me !");
}


let algorithms = {
    'insert': insertsort,
    'select': selectionsort,
    'bubble': bubblesort,
    'shell': shellsort,
    'merge': mergesort,
    'heap': heapsort,
    'quick': quicksort,
    'quick3': quick3sort
}

function sort(algo) {
    if (!algorithms.hasOwnProperty(algo)) {
        throw 'Invalid algorithm ' + algo;
    }
    let sort_fn = algorithms[algo];
    sort_fn();
}