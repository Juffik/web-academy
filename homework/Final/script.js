var checkArray = [];
var moveCounter = -1;

function checkArrayFill() {
    for (var i = 1; i <= 15; i++) {
        checkArray.push(i);
    }
    checkArray.push("&nbsp;");
}

function currentField() {
    var currentArray = [];
    for (var i = 0; i <= document.getElementById('container').children.length - 2; i++) {
        if (document.getElementById('container').children[i].innerHTML.split("<")[0] == "&nbsp;") {
            currentArray.push("&nbsp;");
        } else {
            currentArray.push(parseInt(document.getElementById('container').children[i].innerHTML.split("<")[0]));
        }
    }
    return currentArray;
}

function checker() {
    var currentArray = currentField();
    var counter = 0;
    for (var i = 0; i < currentArray.length; i++) {
        if (currentArray[i] != checkArray[i]) {
            counter++;
        }
    }
    moveCounter++;
    document.getElementById("counterLabel").innerHTML = "Moves: " + moveCounter;

    if (counter == 0) {
        document.getElementById("resultLabel").innerHTML = "State: SORTED";
        return true;
    }
    else {
        document.getElementById("resultLabel").innerHTML = "State: UNSORTED";
        return false;
    }
}


function Box(i, j, name) {
    this.tag = "div";
    this.className = "box";
    this.id = "box_" + i + "_" + j;
    this.innerHTML = name;
}


function actionOnOver() {
    if (moveDownPossibility(this.id)) {
        document.getElementById(this.id).children[0].style.visibility = "visible";
    }
    if (moveUpPossibility(this.id)) {
        document.getElementById(this.id).children[1].style.visibility = "visible";
    }
    if (moveLeftPossibility(this.id)) {
        document.getElementById(this.id).children[2].style.visibility = "visible";
    }
    if (moveRightPossibility(this.id)) {
        document.getElementById(this.id).children[3].style.visibility = "visible";
    }
}

function actionOnOut() {
    hideArrows(this.id);
}

function hideArrows(id) {
    if (document.getElementById(id).children.length > 0) {
        for(var i=0; i<=3; i++ ) {
            document.getElementById(id).children[i].style.visibility = "hidden";
        }
    }

}


function actionOnClick() {

    if (moveDownPossibility(this.id)) {
        moveDown(this.id);
    }
    if (moveUpPossibility(this.id)) {
        moveUp(this.id);
    }
    if (moveLeftPossibility(this.id)) {
        moveLeft(this.id);
    }
    if (moveRightPossibility(this.id)) {
        moveRight(this.id);
    }

}

function moveDown(box) {
    var thisId = box;
    var tempText = document.getElementById(thisId).innerHTML;
    document.getElementById(thisId).innerHTML = "&nbsp;";
    var nextI = parseInt(boxIndexes(box)[0]) + 1;
    var nextJ = parseInt(boxIndexes(box)[1]);
    document.getElementById("box_" + nextI + "_" + nextJ).innerHTML = tempText;
    hideArrows("box_" + nextI + "_" + nextJ);
    checker();

}

function moveUp(box) {
    var thisId = box;
    var tempText = document.getElementById(thisId).innerHTML;
    document.getElementById(thisId).innerHTML = "&nbsp;";
    var nextI = parseInt(boxIndexes(box)[0]) - 1;
    var nextJ = parseInt(boxIndexes(box)[1]);
    document.getElementById("box_" + nextI + "_" + nextJ).innerHTML = tempText;
    hideArrows("box_" + nextI + "_" + nextJ);
    checker();
}

function moveLeft(box) {
    var thisId = box;
    var tempText = document.getElementById(thisId).innerHTML;
    document.getElementById(thisId).innerHTML = "&nbsp;";
    var nextI = parseInt(boxIndexes(box)[0]);
    var nextJ = parseInt(boxIndexes(box)[1]) - 1;
    document.getElementById("box_" + nextI + "_" + nextJ).innerHTML = tempText;
    hideArrows("box_" + nextI + "_" + nextJ);
    checker();
}

function moveRight(box) {
    var thisId = box;
    var tempText = document.getElementById(thisId).innerHTML;
    document.getElementById(thisId).innerHTML = "&nbsp;";
    var nextI = parseInt(boxIndexes(box)[0]);
    var nextJ = parseInt(boxIndexes(box)[1]) + 1;
    document.getElementById("box_" + nextI + "_" + nextJ).innerHTML = tempText;
    hideArrows("box_" + nextI + "_" + nextJ);
    checker();
}


function createBox(box) {
    var b;
    b = document.createElement(box.tag);
    b.className = box.className;
    b.id = box.id;
    b.innerHTML = box.innerHTML;
    return b;
}

function Down() {
    var b = document.createElement('div');
    b.className = 'down';
    return b;
}


function Up() {
    var b = document.createElement('div');
    b.className = 'up';
    return b;
}


function Left() {
    var b = document.createElement('div');
    b.className = 'left';
    return b;
}


function Right() {
    var b = document.createElement('div');
    b.className = 'right';
    return b;
}

function boxIndexes(box_id) {
    return box_id.split("_").splice(1, 2);
}

function moveDownPossibility(box) {
    var nextI = parseInt(boxIndexes(box)[0]) + 1;
    var nextJ = parseInt(boxIndexes(box)[1]);
    if (document.getElementById("box_" + nextI + "_" + nextJ) != null &&
        document.getElementById("box_" + nextI + "_" + nextJ).innerHTML.indexOf('nbsp') > 0) {
        return true;
    } else {
        return false;
    }
}


function moveUpPossibility(box) {
    var nextI = parseInt(boxIndexes(box)[0]) - 1;
    var nextJ = parseInt(boxIndexes(box)[1]);
    if (document.getElementById("box_" + nextI + "_" + nextJ) != null &&
        document.getElementById("box_" + nextI + "_" + nextJ).innerHTML.indexOf('nbsp') > 0) {
        return true;
    } else {
        return false;
    }
}

function moveLeftPossibility(box) {
    var nextI = parseInt(boxIndexes(box)[0]);
    var nextJ = parseInt(boxIndexes(box)[1]) - 1;
    if (document.getElementById("box_" + nextI + "_" + nextJ) != null &&
        document.getElementById("box_" + nextI + "_" + nextJ).innerHTML.indexOf('nbsp') > 0) {
        return true;
    } else {
        return false;
    }
}

function moveRightPossibility(box) {
    var nextI = parseInt(boxIndexes(box)[0]);
    var nextJ = parseInt(boxIndexes(box)[1]) + 1;
    if (document.getElementById("box_" + nextI + "_" + nextJ) != null &&
        document.getElementById("box_" + nextI + "_" + nextJ).innerHTML.indexOf('nbsp') > 0) {
        return true;
    } else {
        return false;
    }
}


function createField(array) {

    checkArrayFill();
    var board = document.createElement('div');
    board.className = "board";
    board.id = "board";
    document.body.appendChild(board);

    var container = document.createElement('div');
    container.className = "container";
    container.id = "container";
    board.appendChild(container);

    var resultDesk = document.createElement('div');
    resultDesk.className = "resultDesk";
    resultDesk.id = "resultDesk";
    board.appendChild(resultDesk);

    var resultLabel = document.createElement('div');
    resultLabel.className = "resultLabel";
    resultLabel.id = "resultLabel";
    resultDesk.appendChild(resultLabel);

    var counterLabel = document.createElement('div');
    counterLabel.className = "counterLabel";
    counterLabel.id = "counterLabel";
    counterLabel.innerHTML = "Moves: 0";
    resultDesk.appendChild(counterLabel);

    var newGameButton = document.createElement('button');
    newGameButton.className = "newGameButton";
    newGameButton.id = "newGameButton";
    newGameButton.innerHTML = "NEW GAME";
    resultDesk.appendChild(newGameButton);

}

function fill(array){

    function addBox(box) {
        document.getElementById('container').appendChild(createBox(box));
        document.getElementById("box_" + i + "_" + j).addEventListener("mouseover", actionOnOver);
        document.getElementById("box_" + i + "_" + j).addEventListener("mouseout", actionOnOut);
        document.getElementById("box_" + i + "_" + j).addEventListener("click", actionOnClick);
        document.getElementById("box_" + i + "_" + j).appendChild(new Down());
        document.getElementById("box_" + i + "_" + j).appendChild(new Up());
        document.getElementById("box_" + i + "_" + j).appendChild(new Left());
        document.getElementById("box_" + i + "_" + j).appendChild(new Right());
    }
    var box;


    var k = 0;
    for (var i = 0; i <= parseInt(Math.sqrt(array.length)); i++) {
        for (var j = 0; j < parseInt(Math.sqrt(array.length)); j++) {

            if (k == array.length) {
                break;
            }
            box = new Box(i, j, array[k]);
            addBox(box);
            k = k + 1;


        }
        if (k == array.length-1) {
            box = new Box(i, j, array[k]);
            addBox(box);
            break;
        }
    }

}



createField();
fill(checkArray);
checker();
