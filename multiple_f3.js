var spawn = require('child_process').spawn;

var task = [
    ['LBK', 'MA1', 'Abkhasian'],
    ['Piapoco', 'LBK', 'Adygei'],
    ['LBK', 'MA1', 'Albanian'],
    ['GujaratiC', 'LBK', 'Armenian'],
    ['LBK', 'MA1', 'Ashkenazi_Jew'],
    ['Piapoco', 'LBK', 'Balkar'],
    ['Esan', 'LBK', 'BedouinA'],
    ['Esan', 'LBK', 'BedouinB'],
    ['Georgian', 'Loschbour', 'Belarusian'],
    ['LBK', 'MA1', 'Bergamo'],
    ['LBK', 'MA1', 'Bulgarian'],
    ['LBK', 'MA1', 'Chechen'],
    ['LBK', 'MA1', 'Croatian'],
    ['LBK', 'MA1', 'Cypriot'],
    ['Georgian', 'Loschbour', 'Czech'],
    ['LBK', 'MA1', 'Druze'],
    ['Iraqi_Jew', 'Loschbour', 'English'],
    ['Abkhasian', 'Loschbour', 'Estonian'],
    ['Abkhasian', 'Loschbour', 'Finnish'],
    ['LBK', 'MA1', 'French'],
    ['Iraqi_Jew', 'Loschbour', 'French_South'],
    ['GujaratiC', 'LBK', 'Georgian'],
    ['GujaratiC', 'LBK', 'Georgian_Jew'],
    ['LBK', 'MA1', 'Greek'],
    ['LBK', 'MA1', 'Hungarian'],
    ['Abkhasian', 'Loschbour', 'Icelandic'],
    ['Piapoco', 'LBK', 'Iranian'],
    ['GujaratiC', 'LBK', 'Iranian_Jew'],
    ['Vishwabrahmin', 'LBK', 'Iraqi_Jew'],
    ['Esan', 'LBK', 'Jordanian'],
    ['Piapoco', 'LBK', 'Kumyk'],
    ['Esan', 'LBK', 'Lebanese'],
    ['LBK', 'MA1', 'Lezgin'],
    ['Esan', 'LBK', 'Libyan_Jew'],
    ['Abkhasian', 'Loschbour', 'Lithuanian'],
    ['LBK', 'MA1', 'Maltese'],
    ['Abkhasian', 'Loschbour', 'Mordovian'],
    ['Esan', 'LBK', 'Moroccan_Jew'],
    ['Piapoco', 'LBK', 'North_Ossetian'],
    ['Georgian', 'Loschbour', 'Norwegian'],
    ['Armenian', 'Loschbour', 'Orcadian'],
    ['Esan', 'LBK', 'Palestinian'],
    ['Chukchi', 'Loschbour', 'Russian'],
    ['LBK', 'LaBrana', 'Sardinian'],
    ['Kgalagadi', 'LBK', 'Saudi'],
    ['Iraqi_Jew', 'Loschbour', 'Scottish'],
    ['LBK', 'MA1', 'Sicilian'],
    ['Iraqi_Jew', 'Loschbour', 'Spanish'],
    ['Iraqi_Jew', 'Loschbour', 'Spanish_North'],
    ['Esan', 'LBK', 'Syrian'],
    ['Gambian', 'LBK', 'Tunisian_Jew'],
    ['Piapoco', 'LBK', 'Turkish'],
    ['LBK', 'MA1', 'Turkish_Jew'],
    ['LBK', 'MA1', 'Tuscan'],
    ['Georgian', 'Loschbour', 'Ukrainian'],
    ['Esan', 'LBK', 'Yemenite_Jew']
];

var queue = 0;
var maxQueueSize = 6;

var run = function() {
    if (queue <= maxQueueSize) {
        var currentTask = task.shift();
        queue++;
        var node = spawn('node', ['giveme.js', currentTask[0], currentTask[1], currentTask[2]]);

        node.on('close', function() {
            queue--;
            if (task.length > 0)  { run() }
            else {
                if (queue == 0) console.log((new Date()))
            }
        });

        node.stdout.on('data', function(data) {
            console.log(data.toString());
        });
    }
};

console.log((new Date()));
for (var i = 0; i < maxQueueSize; i++) run();