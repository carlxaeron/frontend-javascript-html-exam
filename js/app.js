const table = document.getElementById("users-table");
const tblTbody = table.getElementsByTagName('tbody')[0];
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const sortBtn = document.getElementById("sort");

let tempUSERS = USERS != undefined ? USERS : [];
let onRandom = false;
let stopRandom = false;
let _USERS = onRandom ? shuffleArray(tempUSERS) : tempUSERS;

function iterateUsersToTable() {
    _USERS.map((v, k) => {
        var tr = document.createElement('tr');
        tblTbody.appendChild(tr);
        Object.keys(v).map((v2) => {
            if (v2 != 'id') {
                var td = document.createElement('td');
                if (v2 == 'name') {
                    tr.appendChild(td);
                    td.textContent = v[v2].title + ' ' + v[v2].last + ' ' + v[v2].first;
                } else {
                    tr.appendChild(td);
                    td.textContent = v[v2];
                }

            }
        })
    })
}
iterateUsersToTable();

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