var kisi = {
    ad:"ruhat", 
    soyad:"sahin", 
    yas:"18"
};
document.getElementById("id1").innerHTML = kisi.ad + " " + kisi.soyad;

var carBrands = ["tofas", "fiat", "bmw", "audi", "vw"];
document.getElementById("id2").innerHTML = carBrands[4];

var jsAlarm = function(isim)
{
    alert(isim + " bu bir fonksiyondur");
}

jsAlarm("ferit");

function topla(x,y){
    return x+y;
}

alert(topla(9,15));