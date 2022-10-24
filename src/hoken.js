/** レセプトで使っている医療保険と公費負担医療のリスト */
HokenKouhiFutanIryouList = function () {
    this.iryouHoken = null;
    this.kouhis     = [];
};

HokenKouhiFutanIryouList.prototype.toArray = function () {
    var hokens = [];

    if (this.iryouHoken !== null) hokens.push(this.iryouHoken);

    this.kouhis.forEach(function (kouhi) { kouhi && hokens.push(kouhi); });

    return hokens;
};

/** 医療保険レコード */
IryouHoken = function (hokenjaBangou, jitsuNissuu, tensuu, ichibuFutankin) {
    this.hokenjaBangou  = hokenjaBangou;
    this.jitsuNissuu    = jitsuNissuu;
    this.tensuu         = tensuu;
    this.ichibuFutankin = ichibuFutankin;
};
IryouHoken.prototype.getHoubetsuCategory = function () {
    var text     = '';
    var houbetsu = this.hokenjaBangou.substring(0, 2);

    switch (houbetsu) {
        case '  ':
            text = HoubetsuCategories[0];
            break;
        default:
            text = HoubetsuCategories[Number(houbetsu)];
    };

    return text;
};
IryouHoken.prototype.getPrefectureCode = function () {
    return this.hokenjaBangou.substring(this.hokenjaBangou.length - 6, this.hokenjaBangou.length - 4);
};

/** 公費負担医療レコード */
KouhiFutanIryou = function (futanshaBangou, jitsuNissuu, tensuu, ichibuFutankin) {
    this.futanshaBangou      = futanshaBangou;
    this.jitsuNissuu        = jitsuNissuu;
    this.tensuu             = tensuu;
    this.ichibuFutankin     = ichibuFutankin;
};
KouhiFutanIryou.prototype.getHoubetsuCategory = function () {
    return HoubetsuCategories[Number(this.futanshaBangou.substring(0, 2))];
};

HoubetsuCategories = {
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

