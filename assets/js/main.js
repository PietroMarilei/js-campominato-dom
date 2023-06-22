
const buttonElement = document.getElementById("play_button");
const selectElement = document.getElementById("difficulty");

const containerElement = document.getElementById('cell_container');

let gameOver = false;

let numbOfCells;

let bombsArray = [];
//le bombe sono 16 di default

const scoreTable = [];

let playerPoints = 0;

let testVar = 0;

// here's start the play Event 🎮 ❗❗❗

buttonElement.addEventListener('click', function () {
    containerElement.innerHTML = ''
    // questo affare svuota la tabella prima che succeda altro

    numbOfCells = selectElement.value;
    cellCreator(numbOfCells);

    bombGenerator(numbOfCells)
    console.log('bombsArray', bombsArray);

    bombAdder('.cell', bombsArray)

    //scorer calculator down here
    scorerTable()

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

        const singleCellEl = document.createElement('div');
        singleCellEl.innerHTML = i;
        singleCellEl.classList.add('cell', 'hidden');
        singleCellEl.style.width = `calc(100% / ${gridLength})`;

        // add clickable
        singleCellEl.addEventListener('click', function (e) {
            this.classList.add('active');
            this.classList.remove('hidden')
            console.log('cliccato cella num ', this.innerText);
            //gameover function down here
            gameOverFunc(singleCellEl, scoreTable);
            // you win cond down there
            if (scoreTable.length == 0) {
                containerElement.innerHTML = `<div class="">You win</div>`
            }

            test(testVar)

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

function bombAdder(cellClass, bombsArr) {
    const allCellsArr = document.querySelectorAll(cellClass)
    for (let i = 0; i < allCellsArr.length; i++) {
        const singleCell = allCellsArr[i];

        if (bombsArr.includes(parseInt(singleCell.textContent))) {
            singleCell.classList.add('bomb')
            singleCell.innerText += '💣'
        }

    }

}

function gameOverFunc(singleCellELement, scorerTableArr) {
    if (singleCellELement.classList.contains('bomb')) {
        containerElement.innerHTML = `<div class="">You lose</div>`
    } else {
        playerPoints++;
        console.log('punti utente');

        scorerTableArr.splice(scorerTableArr.indexOf(Number(singleCellELement.innerText)), 1);
        console.log(scorerTableArr);
    }
}



function scorerTable() {
    const allCellsArr = document.querySelectorAll('.cell');


    for (let i = 0; i < allCellsArr.length; i++) {
        const singleCellEl = allCellsArr[i];
        if (!singleCellEl.classList.contains('bomb')) {
            scoreTable.push(Number(singleCellEl.innerText))
        }
    }

    console.log(scoreTable);

}

function test(testableVar) {
    return testableVar++
    console.log(testableVar);
}