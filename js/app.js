const table = document.getElementById("user-table");
const tblTbody = table.getElementsByTagName('tbody')[0];

function iterateUsersToTable() {
    if(USERS != undefined) {
        USERS.map((v,k) => {
            var tr = document.createElement('tr');
            tblTbody.appendChild(tr);
            Object.keys(v).map((v2) => {
                if(v2 != 'id') {
                    var td = document.createElement('td');
                    if(v2 == 'name') {
                        tr.appendChild(td);
                        var _name = v[v2].title + ' ' + v[v2].last + ' ' + v[v2].first;
                        td.textContent = _name;
                        console.log(_name)
                    }
                    else {
                        tr.appendChild(td);
                        td.textContent = v[v2];
                    }
                    
                }
            })
        })
    }
}

iterateUsersToTable();