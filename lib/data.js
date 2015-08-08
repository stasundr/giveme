var config = require('./../config');
var redis = require('./redis');

module.exports = {

    loadPopulationGenotypes: function(population, callback) {
        redis.smembers(config.dataset + 'population:' + population, function(error, samples) {
            if (samples) {
                redis.mget(samples, function(error, genotypes) {
                    callback(genotypes);
                })
            }
        })
    },

    loadTwoPopulationsGenotypes: function(population1, population2, callback) {
        redis.smembers(config.dataset + 'population:' + population1, function(error, samples1) {
            if (samples1) {
                redis.mget(samples1, function(error, genotypes1) {
                    redis.smembers(config.dataset + 'population:' + population2, function(error, samples2) {
                        if (samples2) {
                            redis.mget(samples2, function(error, genotypes2) {
                                callback(genotypes1, genotypes2);
                            })
                        }
                    })
                })
            }
        })
    },

    loadThreePopulationsGenotypes: function(population1, population2, population3, callback) {
        redis.smembers(config.dataset + 'population:' + population1, function(error, samples1) {
            if (samples1) {
                redis.mget(samples1, function(error, genotypes1) {
                    redis.smembers(config.dataset + 'population:' + population2, function(error, samples2) {
                        if (samples2) {
                            redis.mget(samples2, function(error, genotypes2) {
                                redis.smembers(config.dataset + 'population:' + population3, function(error, samples3) {
                                    if (samples3) {
                                        redis.mget(samples3, function(error, genotypes3) {
                                            callback(genotypes1, genotypes2, genotypes3);
                                        })
                                    }
                                })
                            })
                        }
                    })
                })
            }
        })
    },

    loadAllChromosomeRange: function(callback) {
        var chromosomes = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
        var ranges = [];
        var watchdog = chromosomes.length;
        chromosomes.forEach(function(chromosome, index) {
            redis.lrange(config.dataset + 'chromosome:' + chromosomes[index], 0, -1, function(error, range) {
                watchdog--;
                ranges[chromosomes[index]] = range;

                if (watchdog == 0) callback(ranges);
            })
        });
    }
};