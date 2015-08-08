module.exports = {
    encoding: { encoding: 'ascii' },
    ind: '/Users/stasundr/Desktop/1240k_HO.ind',
    snp: '/Users/stasundr/Desktop/1240k_HO.snp',
    geno: '/Users/stasundr/Desktop/1240k_HO.geno',

    dataset: 'EuropeFullyPublic:',

    redisHost: process.env.REDIS_HOST || 'localhost',
    redisPort: process.env.REDIS_PORT || 6379,
    redisAuth: process.env.REDIS_AUTH || null
};