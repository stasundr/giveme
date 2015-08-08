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
    }
};