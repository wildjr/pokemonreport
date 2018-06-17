var text = "";
var lastBox = 0;

function loadDex(generation, boxsize, rowsize)
{
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		parseDex(this, generation, boxsize, rowsize);
		}
	};
	
	xmlhttp.open("GET", "resources/gen"+generation+".xml", true);
	xmlhttp.send();
}

function parseDex(xml, generation, boxsize, rowsize) {
	var i;
	var xmlDoc = xml.responseXML;

	var x = xmlDoc.getElementsByTagName("pokemon");
	
	for (i = 0; i <x.length; i++) { 
		if (i%boxsize == 0)
		{
			lastBox = i/boxsize +1;
			text+="<table frame='box'><caption>Box "+lastBox+"</caption>";
		}
		
		if (i%rowsize == 0)
			text+="<tr>"

		if (x[i].getElementsByTagName("status")[0].childNodes[0].nodeValue == "caught")
			text+="<td><img src='sprites/"+x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue +".png'></td>";
		else
			text+="<td><img src='sprites/unknown.png'></td>";

		if (i%rowsize == rowsize-1)
			text+="</tr>";

		if (i%boxsize == boxsize-1)
			text+="</table>";
		//x[i].getElementsByTagName("status")[0].childNodes[0].nodeValue +
	}

	for (i=x.length; i%boxsize!=0; i++)
	{
		if (i%rowsize == 0)
			text+="<tr>"

		text+="<td><img src='sprites/empty.png'></td>";

		if (i%rowsize == rowsize-1)
			text+="</tr>";

		if (i%boxsize == boxsize-1)
			text+="</table>";
	}

	text+="</table>";
	loadExtra(generation, boxsize, rowsize);
}

function loadExtra(generation, boxsize, rowsize)
{
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		if (generation == 2)
			parseExtra2(this, boxsize, rowsize);
		}
	};
	
	xmlhttp.open("GET", "resources/gen"+generation+"extra.xml", true);
	xmlhttp.send();
}

function parseExtra2(xml, boxsize, rowsize) {
	var i;
	var xmlDoc = xml.responseXML;

	var x = xmlDoc.getElementsByTagName("pokemon");
	
	for (i = 0; i <x.length; i++) { 
		if (i%boxsize == 0)
			text+="<table frame='box'><caption>Box "+(++lastBox)+"</caption>";
		
		if (i%rowsize == 0)
			text+="<tr>"

		if (x[i].getElementsByTagName("status")[0].childNodes[0].nodeValue == "caught")
			text+="<td><img src='sprites/"+x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue +".png'></td>";
		else
			text+="<td><img src='sprites/unknown.png'></td>";

		if (i%rowsize == rowsize-1)
			text+="</tr>";

		if (i%boxsize == boxsize-1)
			text+="</table>";
		//x[i].getElementsByTagName("status")[0].childNodes[0].nodeValue +
	}

	for (i=x.length; i%boxsize!=0; i++)
	{
		if (i%rowsize == 0)
			text+="<tr>"

		text+="<td><img src='sprites/empty.png'></td>";

		if (i%rowsize == rowsize-1)
			text+="</tr>";

		if (i%boxsize == boxsize-1)
			text+="</table>";
	}

	text+="</table>";
	document.getElementById("dexdata").innerHTML = text;
}