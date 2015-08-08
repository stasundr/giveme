var data = require('./lib/data');

data.loadPopulationGenotypes('Eskimo', function(genotypes) {
    console.log(genotypes.length);
});