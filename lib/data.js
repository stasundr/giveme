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
    }
};