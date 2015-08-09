var config = require('./config');
var data = require('./lib/data');
var jackknife = require('./lib/jackknife');
var math = require('mathjs');

data.loadThreePopulationsGenotypes(process.argv[2], process.argv[3], process.argv[4], function(genotypes1, genotypes2, genotypes3) {

    data.loadAllChromosomeRange(function(chromosomesRange) {

        var noXYMT = function(genotype) { return genotype.substr(0, chromosomesRange[22][1]) };
        var frequency = function(a) {
            var f = [];
            var n = [];

            a.forEach(function(s) {
                for (var i = 0; i < s.length; i++) {
                    if (typeof f[i] == 'undefined') f[i] = 0;
                    if (typeof n[i] == 'undefined') n[i] = 0;

                    if (s[i] != '9') {
                        f[i] += parseInt(s[i]);
                        n[i]++;
                    }
                }
            });

            f = f.map(function(s, u) { return (n[u] > 0) ? s / n[u] / 2 : -1});

            return f;
        };

        genotypes1.map(noXYMT);
        genotypes2.map(noXYMT);
        genotypes3.map(noXYMT);

        var freq1 = frequency(genotypes1);
        var freq2 = frequency(genotypes2);
        var freq3 = frequency(genotypes3);

        var f3 = function(start, end) {
            var t = 0;
            var b = 0;
            var s_c = 2 * genotypes3.length;

            for (var i = 0; i < freq3.length; i++) {
                if (((i < start) || (i > end)) && (freq1[i] > -1) && (freq2[i] > -1) && (freq3[i] > -1)) {
                    var n_c = 0;
                    var nC_c = 0;

                    genotypes3.forEach(function(g) {
                        if (g[i] == '0') n_c += 2;
                        if (g[i] == '2') nC_c += 2;
                        if (g[i] == '1') { n_c++; nC_c++ }
                    });

                    var ti = (freq3[i] - freq1[i]) * (freq3[i] - freq2[i]);
                    t += ti - n_c * nC_c / (s_c - 1) / s_c / s_c;
                    b += n_c * nC_c / (s_c - 1) / s_c;
                }
            }

            return t/b/2;
        };

        var f3_t = f3(0, 0);
        var f3_m = [];
        var size_m = [];
        for (var i = 1; i <= 22; i++) {
            f3_m[i] = f3(chromosomesRange[i][0], chromosomesRange[i][1]);
            size_m[i] = chromosomesRange[i][1] - chromosomesRange[i][0];
        }

        f3_m.shift();
        size_m.shift();

        console.log('f3: ' + f3_t);
        console.log('sigma2: ' + jackknife.deleteMj(f3_t, freq3.length, f3_m, size_m));
        console.log(f3_t/Math.sqrt(jackknife.deleteMj(f3_t, freq3.length, f3_m, size_m)));


        //var tmpf3 = [];
        //for (var i = 1; i <= 22; i++) {
        //    tmpf3[i] = f3(chromosomesRange[i][0], chromosomesRange[i][1]);
        //    console.log(i + ': ' + tmpf3[i]);
        //}
        //
        //tmpf3.shift();
        //
        //console.log((f3(0,0) - math.mean(tmpf3))/math.std(tmpf3)*Math.sqrt(22));
        //
        ////var E_f3 = f3(0,0); console.log('E: ' + E_f3);
        ////var mean_tmpf3 = 0;
        ////var var_tmpf3 = 0;
        ////tmpf3.forEach(function(v) { mean_tmpf3 += v });
        ////mean_tmpf3 /= 22;
        ////tmpf3.forEach(function(v) { var_tmpf3 += (mean_tmpf3 - v) * (mean_tmpf3 - v) });
        ////var_tmpf3 /= 22;
        ////
        ////var z = (mean_tmpf3 - E_f3)/(Math.sqrt(var_tmpf3/22));
        ////
        ////console.log(z);

        process.exit(0);
    });
});