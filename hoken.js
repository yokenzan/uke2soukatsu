HokenKohiList = function () {
    this.iho   = null;
    this.kohis = [];
};

HokenKohiList.prototype.toArray = function () {
    var hokens = [];

    if (this.iho !== null) hokens.push(this.iho);

    this.kohis.forEach(function (kohi) { kohi && hokens.push(kohi); });

    return hokens;
};

Iho = function (hokenjaBango, dayCount,  point, burdenAmount) {
    this.hokenjaBango = hokenjaBango;
    this.dayCount     = dayCount;
    this.point        = point;
    this.burdenAmount = burdenAmount;
};
Iho.prototype.getHobetsuCategory = function () {
    var text    = '';
    var hobetsu = this.hokenjaBango.substring(0, 2);

    switch (hobetsu) {
        case '  ':
            text = HobetsuCategories[0];
            break;
        default:
            text = HobetsuCategories[Number(hobetsu)];
    };

    return text;
};
Iho.prototype.getPrefectureCode = function () {
    return this.hokenjaBango.substring(this.hokenjaBango.length - 6, this.hokenjaBango.length - 4);
};

Kohi = function (futanshaBango, dayCount, point, parendBurdenAmount, burdenAmount) {
    this.futanshaBango      = futanshaBango;
    this.dayCount           = dayCount;
    this.point              = point;
    this.parendBurdenAmount = parendBurdenAmount;
    this.burdenAmount       = burdenAmount;
};
Kohi.prototype.getHobetsuCategory = function () {
    return HobetsuCategories[Number(this.futanshaBango.substring(0, 2))];
};

HobetsuCategories = {
    0: '国保',
    1: '01（協会）',
    2: '02（船）',
    3: '03（日）',
    4: '（日特）',
    6: '06（組）',
    7: '07（自）',
    28: '28（コロナ検査・療養）',
    31: '31～34（共）',
    32: '31～34（共）',
    33: '31～34（共）',
    34: '31～34（共）',
    39: '後期高齢者',
    63: '63・72～75（退）',
    67: '退職者',
    72: '63・72～75（退）',
    73: '63・72～75（退）',
    74: '63・72～75（退）',
    75: '63・72～75（退）',
    12: '12（生保）',
    10: '10（感染症37の２）',
    20: '20（精神29）',
    80: '80（マル障）',
    81: '81（マル親）',
    88: '88（マル乳・マル子）'
};

