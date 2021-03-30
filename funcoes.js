var data;
var socket;
var isSocketLigado = false;

function criamenu() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var txt = this.responseText;
			data = JSON.parse(txt);
			//console.log(txt);
			desenhaMenu();
			preencheGrid();
			ligaSocket();
		}
	};
	xmlhttp.open("GET", "menu.txt", true);
	xmlhttp.send();
}
function ligaSocket() {
	
	socket = new WebSocket('ws://' + window.location.hostname +  ':5555');
    // Ao estabelecer a conexão enviamos uma mensagem pro servidor
    socket.addEventListener('open', function () {
        console.log('Conexão estabelecida.');
		isSocketLigado=true;
    });

    // Callback disparado sempre que o servidor retornar uma mensagem
    socket.addEventListener('message', function (event) {
        $('#grid-data').bootgrid('reload');
    });
}
function preencheGrid() {
	
	$("#grid-data").bootgrid({
    ajax: true,
    post: function ()
    {
        /* To accumulate custom parameter with the request object */
        return {
            id: "b0df282a-0d67-40e5-8558-c9e93b7befed"
        };
    },
    url: "grid.php",
	templates: {
        search: ""
    },
    formatters: {
        "link": function(column, row)
        {
            return "<a href=\"#\">" + column.id + ": " + row.id + "</a>";
        }
    }
});
}
function OpcaoClick(menu,id) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var txt = this.responseText;
			bootbox.alert("Opção : " + menu + "  Id : " + id + "  Clicks : " + txt);
			$('#grid-data').bootgrid('reload');
			if (isSocketLigado) {
				socket.send('update');
			}	
		}
	};
	xmlhttp.open("GET", "click.php?menu="+menu+"&id="+id, true);
	xmlhttp.send();
}
function desenhaMenu() {
	for (var item in data) { 
    	var _menu = "";
        var _submenuData = data[item];
        if(_submenuData.length > 0) {
        	var _submenu = "";
        	for(var i = 0; i < _submenuData.length; i++) {
            	_submenu += "<a class='dropdown-item' href='#' onclick='OpcaoClick(\"" + item +"\"," + _submenuData[i]["id"] +  ")'>" + _submenuData[i]["opcao"] + "</a>";
            }
            _menu = "<li class='nav-item dropdown'>"
        		+ "<a class='nav-link dropdown-toggle' href='' id='navbardrop' data-toggle='dropdown'> " + item + " </a>"
                + "<div id='drop' class='dropdown-menu'>"
                + _submenu
				+ "</div>"
                + "</li>";
        }
        else {
        	_menu = "<li class='nav-item'>"
        		+ "<a class='nav-link' href=''> " + item + " </a>"
                + "</li>";
        }
        
        $("#navbarId").append(_menu);
    }
}