Receipt = function (id, patient, hospital, shinryouNengetsu, receiptTypeList) {
    this.id               = id;
    this.patient          = patient;
    this.hospital         = hospital;
    this.shinryouNengetsu = shinryouNengetsu;
    this.receiptTypeList  = receiptTypeList;
    this.hokenKouhiList   = new HokenKouhiList();
};

Receipt.prototype.addIryouHoken = function (iryouHoken) {
    this.hokenKouhiList.iryouHoken = iryouHoken;
};

Receipt.prototype.addKouhiFutanIryou = function (kouhi) {
    this.hokenKouhiList.kouhis.push(kouhi);
};

Receipt.prototype.getIryouHoken = function () {
    return this.hokenKouhiList.iryouHoken;
};

Receipt.prototype.getKouhiFutanIryous = function () {
    return this.hokenKouhiList.kouhis;
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

Receipt.prototype.getPatientAgeType = function () {
    return this.receiptTypeList.patientAgeType;
};

ReceiptTypeList = function (ikaOrShikaType, mainHokenType, hokenMultipleType, patientAgeType) {
    this.ikaOrShikaType    = Number(ikaOrShikaType);
    this.mainHokenType     = Number(mainHokenType);
    this.hokenMultipleType = Number(hokenMultipleType);
    this.patientAgeType    = Number(patientAgeType);
};

ReceiptTypeList.prototype.toCombinedCode = function () {
    return [
        this.ikaOrShikaType,
        this.mainHokenType,
        this.hokenMultipleType,
        this.patientAgeType
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

ReceiptPatientAgeTypes = {
    2: '本外',
    4: '六外',
    6: '家外',
    8: '高外一',
    0: '高外７'
};
