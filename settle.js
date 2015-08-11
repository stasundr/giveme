var config = require('./config');
var redis = require('./lib/redis');
var fs = require('fs');
var split = require('split');

var db = 'V822_1240k_HO:';
var configgeno = '/Users/stasundr/Desktop/lhmg_samples.ped';
var configsnp = '/Users/stasundr/Desktop/1240k_HO.snp';
// Нужно еще списки популяций добавлять!

// snp
var snp = fs
    .readFileSync(configsnp, config.encoding)
    .split('\n')
    .map(function(s) { return s
        .replace(/^\s+/, '')
        .replace(/\s+/g, ' ')
        .replace(/A/g, '1')
        .replace(/C/g, '2')
        .replace(/G/g, '3')
        .replace(/T/g, '4')
        .split(' ')
    })
    .filter(function(s) { return s !== '' });

var progress = 0;
var honey = fs
    .createReadStream(configgeno, config.encoding)
    .pipe(split())
    .on('data', function (line) {
        var raw = line.replace(/^\s+/, '').replace(/\s+/g, ' ').split(' ');
        var sample = raw[1]; console.log(sample);
        var geno = '';

        raw.splice(0, 6);

        for (var i = 0; i < raw.length; i += 2) {
            if ((raw[i] == '0') || (raw[i+1] == '0')) { geno += '9' }
            else {
                if (raw[i] != raw[i+1]) geno += '1';
                if ((raw[i] == raw[i+1]) && (raw[i] == snp[i/2][4])) geno += '2';
                if ((raw[i] == raw[i+1]) && (raw[i] == snp[i/2][5])) geno += '0';
            }
        }

        progress++;
        console.log(progress);

        honey.pause();
        redis.set(db + 'geno:' + sample, geno, function() { honey.resume() })
    });
