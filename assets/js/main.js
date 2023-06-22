
const buttonElement = document.getElementById("play_button");
const selectElement = document.getElementById("difficulty");

const containerElement = document.getElementById('cell_container')

let numbOfCells

let bombsArray = []
//le bombe sono 16 di default

buttonElement.addEventListener('click', function () {
    containerElement.innerHTML = ''
    // questo affare svuota la tabella prima che succeda altro

    numbOfCells = selectElement.value;
    cellCreator(numbOfCells);

    bombGenerator(numbOfCells)
    console.log('bombsArray', bombsArray);

    bombAdder()
})

/*
FUNCTIONS-------------------------------
*/

function rndNumb(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cellCreator(numbOfCells) {

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

function bombGenerator(maxCells) {

    while (bombsArray.length < 16) {
        let singleRndNumb = rndNumb(1, maxCells);

        if (!bombsArray.includes(singleRndNumb)) {
            bombsArray.push(singleRndNumb)
        }
    }
}

function bombAdder() {
    const allCellsArr = document.querySelectorAll('.cell')
    for (let i = 0; i < allCellsArr.length; i++) {
        const singleCell = allCellsArr[i];

        if (bombsArray.includes(singleCell.innerHTML)) {
            console.log('Sono una bomba 💣');
        }

    }

}