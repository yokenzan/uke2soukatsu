UKE = function (payer, seikyuYm, hospital) {
    this.payer    = payer;
    this.seikyuYm = seikyuYm;
    this.hospital = hospital;
    this.receipts = [];
};

UKE.prototype.toArray = function () {
    return this.receipts;
};
