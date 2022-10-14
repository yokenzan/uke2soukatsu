Receipt = function (id, patient, hospital, shinryoYm, receiptTypeList) {
    this.id              = id;
    this.patient         = patient;
    this.hospital        = hospital;
    this.shinryoYm       = shinryoYm;
    this.receiptTypeList = receiptTypeList;
    this.hokenKohiList   = new HokenKohiList();
};

Receipt.prototype.addIho = function (iho) {
    this.hokenKohiList.iho = iho;
};

Receipt.prototype.addKohi = function (kohi) {
    this.hokenKohiList.kohis.push(kohi);
};

Receipt.prototype.getHokens = function () {
    return this.hokenKohiList.toArray();
};

Receipt.prototype.getIho = function () {
    return this.hokenKohiList.iho;
};

Receipt.prototype.getKohis = function () {
    return this.hokenKohiList.kohis;
};

Receipt.prototype.getTypesAsCode = function () {
    return this.receiptTypeList.toCombinedCode();
}

Receipt.prototype.getMainHokenType = function () {
    return this.receiptTypeList.mainHokenType;
};

Receipt.prototype.getHokenMultipleType = function () {
    return this.receiptTypeList.hokenMultipleType;
};

Receipt.prototype.getAgeType = function () {
    return this.receiptTypeList.ageType;
};

ReceiptTypeList = function (ikaOrShikaType, mainHokenType, hokenMultipleType, ageType) {
    this.ikaOrShikaType    = Number(ikaOrShikaType);
    this.mainHokenType     = Number(mainHokenType);
    this.hokenMultipleType = Number(hokenMultipleType);
    this.ageType           = Number(ageType);
};

ReceiptTypeList.prototype.toCombinedCode = function () {
    return [
        this.ikaOrShikaType,
        this.mainHokenType,
        this.hokenMultipleType,
        this.ageType
    ].join('');
};

ReceiptMainHokenTypes = {
    1: '国保・社保',
    2: '公費',
    3: '後期',
    4: '退職'
};

ReceiptHokenMultipleTypes = {
    1: '単独',
    2: '２併',
    3: '３併',
    4: '４併'
};

ReceiptAgeTypes = {
    2: '本外',
    4: '六外',
    6: '家外',
    8: '高外一',
    0: '高外７'
};
