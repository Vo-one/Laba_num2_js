function rd() {

    function reqListener() {
        var div1 = document.getElementById('table_div1');
        var div2 = document.getElementById('table_div2');
        var div3 = document.getElementById('table_div3');
        while(div1.firstChild) div1.removeChild(div1.firstChild);
        while(div2.firstChild) div2.removeChild(div2.firstChild);
        while(div3.firstChild) div3.removeChild(div3.firstChild);

        var data = JSON.parse(this.responseText);
        console.log(data);

        var result = [];

        for (var i = 0; i < data.length; i++) {
            result.push(data[i].name.toLowerCase());
        }


        var e    = document.createElement('a');
        e.href = 'http://localhost:3000/count.html?'+result [0];
        e.title = 'работа 1\n';
        e.target="_blank"
        e.appendChild(document.createTextNode('работа 1'));
        div1.appendChild(e);


        var e2    = document.createElement('a');
        e2.href = 'http://localhost:3000/count.html?'+result [1];
        e2.title = 'работа 2\n';
        e2.target="_blank"
        e2.appendChild(document.createTextNode('работа 2'));
        div2.appendChild(e2);


        var e3    = document.createElement('a');
        e3.href = 'http://localhost:3000/count.html?'+result [2];
        e3.title = 'работа 3\n';
        e3.target="_blank"
        e3.appendChild(document.createTextNode('работа 3'));
        div3.appendChild(e3);
    }
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", "http://localhost:3000/gen");
    oReq.send();
}
