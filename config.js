module.exports = {
    encoding: { encoding: 'ascii' },
    ind: '/Users/stasundr/Desktop/1240k_HO.ind',
    snp: '/Users/stasundr/Desktop/1240k_HO.snp',
    geno: '/Users/stasundr/Desktop/1240k_HO.geno',

    dataset: 'EuropeFullyPublic:',

    redisHost: process.env.REDIS_HOST || '104.236.194.9',
    redisPort: process.env.REDIS_PORT || 6379,
    redisAuth: process.env.REDIS_AUTH || 'Ryb0bud5kU6tag4Auc8mUs6jewn7oSh5eg3I6oC0Pi1gluD7wu'
};