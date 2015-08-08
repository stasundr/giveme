var data = require('./lib/data');

data.loadTwoPopulationsGenotypes('Eskimo', 'LBK', function(genotypes1, genotypes2) {
    console.log(genotypes1.length + ' ' + genotypes2.length);

    process.exit(0);
});