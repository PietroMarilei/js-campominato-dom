
const buttonElement = document.getElementById("play_button");
const selectElement = document.getElementById("difficulty");

const containerElement = document.getElementById('cell_container')

let numbOfCells

let bombsArray = []
//le bombe sono 16 di default
bombGenerator()

buttonElement.addEventListener('click', function () {
    containerElement.innerHTML = ''
    // questo affare svuota la tabella prima che succeda altro

    cellCreator(numbOfCells);

})

/*
FUNCTIONS-------------------------------
*/

function rndNumb(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cellCreator(numbOfCells) {
    numbOfCells = selectElement.value
    //prendo il numero delle celle selezionate
    let gridLength = Math.sqrt(numbOfCells);

    for (let i = 1; i <= numbOfCells; i++) {
        console.log('creato cella');

        const singleCellEl = document.createElement('div');
        singleCellEl.innerHTML = i;
        singleCellEl.classList.add('cell');
        singleCellEl.style.width = `calc(100% / ${gridLength})`;

        // add clickable

        singleCellEl.addEventListener('click', function (e) {
            this.classList.toggle('active');
            console.log('cliccato cella num ', this.innerText);
        })

        containerElement.append(singleCellEl);
    }

}

function bombGenerator() {

    while (bombsArray.length < 16) {
        let singleRndNumb = rndNumb(1, 16);

        if (!bombsArray.includes(singleRndNumb)) {
            bombsArray.push(singleRndNumb)
        }
    }
    console.log('bombsArray', bombsArray);
}