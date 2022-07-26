const table = document.getElementById("users-table");
const tblTbody = table.getElementsByTagName('tbody')[0];
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const sortBtn = document.getElementById("sort");

let tempUSERS = USERS != undefined ? USERS : [];
let onRandom = false;
let _USERS = onRandom ? shuffleArray(tempUSERS) : tempUSERS;
const DEBUG = false;

// Iterate json data on table
function iterateUsersToTable() {
    _USERS.map((v, k) => {
        var tr = document.createElement('tr');
        tblTbody.appendChild(tr);
        Object.keys(v).map((v2) => {
            if (v2 != 'id') {
                var td = document.createElement('td');
                if (v2 == 'name') {
                    tr.appendChild(td);
                    td.textContent = v[v2].title + ' ' + v[v2].last + ' ' + v[v2].first + (DEBUG ? ' ' + v['id'] : '');
                } else if(v2 == 'pictureUrl') {
                    var img = document.createElement('img');
                    td.appendChild(img);
                    img.src = v['pictureUrl'];
                    tr.appendChild(td);
                } else {
                    tr.appendChild(td);
                    td.textContent = v[v2];
                }

            }
        })
    })
}
// START the iteration upon loaded the script
iterateUsersToTable();

// random/shuffle the users
function randomUsersRow() {
    onRandom = true;
    _USERS = shuffleArray(tempUSERS);

    // checker
    isRandomRunning();
}
// stop the random/shuffle
function stopRandomUsersRow() {
    onRandom = false;
    if(onRandomTmr) clearInterval(onRandomTmr);

    // checker
    isRandomRunning();
}
// sort by name descending order
function sortUsersByName() {
    _USERS.sort((a, b) => {
        if(a.accountBalance < b.accountBalance && a.id - b.id) return 1;
        if(a.accountBalance > b.accountBalance && a.id - b.id) return -1;
        return 0;
    });
    tblTbody.innerHTML = '';
    iterateUsersToTable();
}
// check if random is ON
function isRandomRunning() {
    if(onRandom) {
        sortBtn.setAttribute('disabled', 'disabled');
        sortBtn.classList.add('disabled');
    } else {
        sortBtn.removeAttribute('disabled');
        sortBtn.classList.remove('disabled');
    }
}

// EVENTs
let onRandomTmr; 
startBtn.onclick = () => {
    const _runRandom = () => {
        randomUsersRow();
        tblTbody.innerHTML = '';
        iterateUsersToTable();
    }

    // run random at first trigger
    _runRandom();

    // fixed bug on double event
    if(onRandomTmr) clearInterval(onRandomTmr);

    onRandomTmr = setInterval(() => {
        _runRandom();
    }, 1000);
}
stopBtn.onclick = () => stopRandomUsersRow();
sortBtn.onclick = () => {
    // we need to make to stop the shuffle here
    stopRandomUsersRow();

    sortUsersByName();
}

// HELPERS
function shuffleArray(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}