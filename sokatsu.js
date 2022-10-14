Sokatsuer = function () {};
Sokatsuer.prototype.sokatsu = function (uke) {
    var iho, record, records = [];

    for (var receipt of uke.toArray()) {
        record  = [];

        /* receipt header section */

        record = record.concat([
            receipt.shinryoYm,
            receipt.patient.id,
            receipt.patient.name,
            '',
            '',
            receipt.getTypesAsCode(),
            '1医科',
            `${receipt.getMainHokenType()}${ReceiptMainHokenTypes[receipt.getMainHokenType()]}`,
            `${receipt.getHokenMultipleType()}${ReceiptHokenMultipleTypes[receipt.getHokenMultipleType()]}`,
            `${receipt.getAgeType()}${ReceiptAgeTypes[receipt.getAgeType()]}`
        ]);

        /* iho section */

        iho    = receipt.getIho();
        record = record.concat(
            iho !== null ? [
                iho.hokenjaBango,
                iho.getHobetsuCategory(),
                iho.getPrefectureCode(),
                iho.dayCount,
                iho.point,
                iho.burdenAmount
            ] : ['', '', '', '', '', '']
        );

        /* kohi section */

        for(var kohi of receipt.getKohis()) {
            record = record.concat([
                kohi.futanshaBango,
                kohi.getHobetsuCategory(),
                kohi.dayCount,
                kohi.point,
                kohi.burdenAmount
            ]);
        }

        if (receipt.getKohis().length < 3) {
            for (var i = 0; i < 3 - receipt.getKohis().length; i++) {
                record = record.concat(['', '', '', '', '']);
            }
        }

        records.push(record);
    }

    return records;
};

