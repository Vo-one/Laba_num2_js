function rd() {
    var p_url = location.search.substring(1);
    var frame = document.querySelector('iframe');
    frame.src = frame.src+ "uploads\\" + p_url;
    var n = document.getElementById('n');
    n.value = p_url;

    function reqListener(event) {
        var data = JSON.parse(this.responseText);
        var table = document.getElementById("table_data");

        table.innerHTML = '';
        if (data.length > 0) {
            var header = table.createTHead();
            var hrow = header.insertRow();
            console.log(header);
            for (var k in data[0]) {
                var cell = hrow.insertCell();
                cell.innerHTML= k;
                console.log(cell);
            }
        }

        for (var i = 0; i<data.length;i++ ){
            var newRow = table.insertRow();
            for (j in data[i]){
                var cell = newRow.insertCell();
                cell.innerHTML = data[i][j];
            }
        }
    }
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", '/get_com/'+ p_url);
    oReq.send();
}