// Теоретическую часть смотри в статье:
// Busing, F. M., Meijer, E., & Van Der Leeden, R. (1999).
// Delete-m jackknife for unequal m. Statistics and Computing, 9(1), 3-8.

// Delete-m_j jackknife
// theta - значение статистики на всей выборке
// size - общий размер выборки
// theta_without_mj - массив значений статистики без элементов mj
// size_mj - массив размеров фрагментов mj
//
// Функция возвращает дисперсию theta  -  Var(theta) = sigma(theta)^2
var deleteMj = function(theta, size, theta_without_mj, size_mj) {

    //j - индекс группы
    //m - количество снипов в группе
    //n - общее количество снипов
    //g - количество групп
    //n = m_j * h_j -> h_j = n/m_j
    //
    //a_j = 1 / (h_j - 1) = 1 / (n/m_j - 1)
    //
    //c_j = sum( (1 - m_k/n) * f3_wo_chr_k )    ---- k  1 to g
    //
    //b_j = h_j * f3_full - (h_j - 1) * f3_wo_chr_j - g * f_3full + c_j
    //
    //VAR = sigma^2 = 1/g * sum(a_j * (b_j^2))    ---- j  1 to g
    //VAR = 1/g*sum(1 / (n/m_j - 1) * ())

    var sigma2 = 0;
    var g = size_mj.length;
    for (var j = 0; j < g; j++) {
        var c_j = 0;
        for (var k = 0; k < g; k++) { c_j += (1 - size_mj[k] / size) * theta_without_mj[k] }

        var h_j = size/size_mj[j];
        var b_j = h_j * theta - (h_j - 1) * theta_without_mj[j] - g * theta + c_j;

        sigma2 += b_j * b_j / (h_j - 1);
    }
    sigma2 /= g;

    return sigma2;
};

module.exports = {
    deleteMj: deleteMj
};