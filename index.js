const get = require("request");
const co = require("cheerio");
const readline = require("readline");
const http = require("http");

let judul = readline.createInterface({
input:process.stdin,
output:process.stdout
});

console.log(" ————————————————————————————");
console.log("| Nonton Anime by ./Twin-404 | ");
console.log("| [+]Fb : Ricko Veriyanto    |");
console.log("| [+]Github : ricko-v        |");
console.log(" ————————————————————————————\n");
console.log("1. List Anime\n2. Movie\n");
judul.question("> Masukan Pilihan (1/2) : ", (pilihan) => {
if(pilihan == "1"){


//Request scrapper judul
get("https://gokunime.com/anime-list/", function(err,res,body) {
if(!err && res.statusCode == 200){
let $ = co.load(body);
console.log("=====================================");
$(".row-cells").find("a").each( function() {
let p = $(this).attr("href");
let q = p.slice(27, p.lenght);
let link = q.replace(/["/"]/g, " ");
console.log("[+] "+link);
});


//Input anime
judul.question("\n> Masukan Judul : ", (anime) => {
let str = `${anime}`;
let title = str.replace(/[" "]/g, "-");
//judul.close();
//Request dengan judul
get("https://gokunime.com/anime/"+title, function(err,res,body){
if(!err && res.statusCode == 200){
let r = co.load(body);
console.log("\n[+]Sinopsis : ");
r(".sinopsis").find("p").each( function() {
let sinopsis = r(this).text();
console.log(sinopsis);
});

console.log("\n[+]Informasi : ");
r(".datanime").find("span").each( function() {
let informasi = r(this).text();
console.log(informasi);
});

console.log("\n[+]List Episode : ");
r(".skrol").find("span").each( function() {
let stream = r(this).find("a").attr("href");
let potong = stream.slice(20, stream.lenght);
let url = potong.replace(/["/"]/g, " ");
console.log("=> "+url);
});

judul.question("\n> Pilih List Episode : ", (episode) => {
get("https://gokunime.com/"+episode, function(err,res,body) {
if(!err && res.statusCode == 200){
let s = co.load(body);
let stream = s("iframe").attr("src");
http.createServer( function(req,res) {
res.writeHead(200, {"Content-Type" : "text/html"});
res.write("<strong style='color:red;position:fixed;bottom:0;text-align:left;font-size:3vw;'>Coded By ./Twin-404<br>[+]Fb : Ricko Veriyanto<br>[+]Github : ricko-v<br><br>Sedang ditonton : "+episode+"</strong><iframe src='"+stream+"' style='border: 1px solid red;width:100%;height:40%;'><br>");
res.end();
}).listen(8000);
console.log("\nLihat di http://localhost:8000 pada browser untuk streaming \n Tekan CTRL + C untuk keluar");
}
else {
 console.log(err);
judul.close();
}
});
judul.close();
});


}
else {
 console.log(err);
judul.close();
}
});
});






}
else {
 console.log(err);
judul.close();
}
});


}

//Pilihan 2
else if(pilihan == "2"){
get("https://gokunime.com/movie/", function(err,res,body) {
if(!err && res.statusCode == 200){
let $ = co.load(body);
$(".row-cells").find("a").each( function() {
let p = $(this).attr("href");
let q = p.slice(27, p.lenght);
let link = q.replace(/["/"]/g, " ");
console.log("[+] "+link);
});

//Input anime
judul.question("\n> Masukan Judul : ", (anime) => {
let str = `${anime}`;
let title = str.replace(/[" "]/g, "-");
//judul.close();
//Request dengan judul
get("https://gokunime.com/anime/"+anime, function(err,res,body) {
if(!err && res.statusCode == 200){
let r = co.load(body);
console.log("\n[+]Sinopsis : ");
r(".sinopsis").find("p").each( function() {
let sinopsis = r(this).text();
console.log(sinopsis);
});

console.log("\n[+]Informasi : ");
r(".datanime").find("span").each( function() {
let informasi = r(this).text();
console.log(informasi);
});

console.log("\n[+]List Episode : ");
r(".skrol").find("span").each( function() {
let stream = r(this).find("a").attr("href");
let potong = stream.slice(20, stream.lenght);
let url = potong.replace(/["/"]/g, " ");
console.log("=>"+url);
});

judul.question("\n> Masukan List Episode : ", (episode) => {
get("https://gokunime.com/"+episode, function(err,res,body) {
if(!err && res.statusCode == 200){
let s = co.load(body);
let stream = s("iframe").attr("src");
http.createServer( function(req,res) {
res.writeHead(200, {"Content-Type" : "text/html"});
res.write("<html><body><strong style='text-align:left;font-size:3vw;color:red;position:fixed;bottom:0;'>Coded By ./Twin-404<br>[+]Fb : Ricko Veriyanto<br>[+]Github : ricko-v<br><br>Sedang ditonton : "+episode+"</strong><br><iframe src='"+stream+"' style='width:100%;height:40%;'>");
res.end();
}).listen(8000);
console.log("\nLihat di http://localhost:8000 pada browser untuk streaming\n Tekan CTRL + C untuk keluar");
}
else {
console.log(err);
judul.close();
}
});
});

}
else {
console.log(err);
judul.close();
}
});
});

}
else {
console.log(err);
judul.close();
}

});

}


else {
console.log("[+]Masukan Salah!!");
judul.close();
}
});


