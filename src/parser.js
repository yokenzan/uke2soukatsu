UKEParser = function () {
    this.buffer = null;
};

UKEParser.prototype.parseLines = function (lines) {
    this.__clearState();
    const self = this;
    try {
        lines.forEach(function (line) { self.__parseLine(line); });

        this.buffer.submitCurrentReceipt();
        return this.buffer.uke;
    } finally {
        this.__clearState();
    }
};


UKEParser.prototype.__parseLine = function (line) {
    var columns = line.split(',');

    switch (columns[0]) {
        case 'IR':
            this.__parseIR(columns);
            break;
        case 'RE':
            this.__parseRE(columns);
            break;
        case 'HO':
            this.__parseHO(columns);
            break;
        case 'KO':
            this.__parseKO(columns);
            break;
        default:
            // do nothing
    }
};

UKEParser.prototype.__parseIR = function (columns) {
    this.buffer.hospital = new Hospital(columns[4], columns[6]);
    this.buffer.uke      = new UKE(columns[1], columns[7], this.buffer.hospital);
};

UKEParser.prototype.__parseRE = function (columns) {
    if (this.buffer.currentReceipt !== null) this.buffer.submitCurrentReceipt();

    var patient = new Patient(columns[13], columns[4], columns[6]);
    this.buffer.initializeCurrentReceipt(
        __id               = Number(columns[1]),
        __patient          = patient,
        __hospital         = this.buffer.hospital,
        __shinryoYm        = columns[3],
        __receiptyTypeList = columns[2]
    );
};

UKEParser.prototype.__parseHO = function (columns) {
    var iho = new Iho(
        __hokenjaBango = columns[1],
        __dayCount     = Number(columns[4]),
        __point        = Number(columns[5]),
        __burdenAmount = columns[11] !== null ? Number(columns[11]) : null
    );
    this.buffer.currentReceipt.addIho(iho);
};

UKEParser.prototype.__parseKO = function (columns) {
    var kohi = new Kohi(
        __futanshaBango       = columns[1],
        __dayCount            = Number(columns[4]),
        __point               = Number(columns[5]),
        __parenedBurdenAmount = columns[7] !== null ? Number(columns[7]) : null,
        __burdenAmount        = columns[6] !== null ? Number(columns[6]) : null
    );
    this.buffer.currentReceipt.addKohi(kohi);
};

UKEParser.prototype.__clearState = function () {
    this.buffer = new Buffer();
};



Buffer = function () {
    this.hospital       = null;
    this.uke            = null;
    this.currentReceipt = null;
};

Buffer.prototype.submitCurrentReceipt = function () {
    this.uke.receipts.push(this.currentReceipt);
    this.currentReceipt = null;
};

Buffer.prototype.initializeCurrentReceipt = function (id, patient, hospital, shinryoYm, types) {
    var codeOfReceiptTypes = types.split('');
    var receiptTypeList    = new ReceiptTypeList(
        codeOfReceiptTypes[0],
        codeOfReceiptTypes[1],
        codeOfReceiptTypes[2],
        codeOfReceiptTypes[3]
    );
    this.currentReceipt    = new Receipt(id, patient, hospital, shinryoYm, receiptTypeList);
};
