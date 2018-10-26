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

            if (isLess(j, j-1)) {
                swap(j, j-1);
               
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
        for (let j = 0; j < csvData.length - (i +1); j++) {

            if (isLess(j+1, j)) {
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
    let pivot = 8;
    let T1 = [];
    let T2 = [];
    let TFinal = [];

    for (let i = 0; i < csvData.length; i++) {
        if (isLess(i, pivot)) {
           
            T1[i] = csvData[i];
            console.log('T1 '+T1[i].nom_commune)
            
        } else {
            T2[i] = csvData[i];
            console.log('T2 '+T2[i].nom_commune)
            
        }
    }
    
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