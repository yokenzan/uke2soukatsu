UKE = function (shinsaShiharaiKikan, seikyuuNengetsu, hospital) {
    this.shinsaShiharaiKikan = shinsaShiharaiKikan;
    this.seikyuuNengetsu     = seikyuuNengetsu;
    this.hospital            = hospital;
    this.receipts            = [];
};

UKE.prototype.toArray = function () {
    return this.receipts;
};
