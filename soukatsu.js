Soukatsuer = function () {};
Soukatsuer.prototype.soukatsu = function (uke) {
    var iryouHoken, soukatsuRecord, soukatsuRecords = [];

    for (var receipt of uke.receipts) {
        soukatsuRecord  = [];

        /* receipt header section */

        soukatsuRecord = soukatsuRecord.concat([
            receipt.shinryouNengetsu,
            receipt.patient.id,
            receipt.patient.name,
            '',
            '',
            receipt.getTypesAsCode(),
            '1医科',
            `${receipt.getMainHokenType()}${ReceiptMainHokenTypes[receipt.getMainHokenType()]}`,
            `${receipt.getHokenMultipleType()}${ReceiptHokenMultipleTypes[receipt.getHokenMultipleType()]}`,
            `${receipt.getPatientAgeType()}${ReceiptPatientAgeTypes[receipt.getPatientAgeType()]}`
        ]);

        /* iryouHoken section */

        iryouHoken = receipt.getIryouHoken();
        soukatsuRecord     = soukatsuRecord.concat(
            iryouHoken !== null ? [
                iryouHoken.hokenjaBangou,
                iryouHoken.getHoubetsuCategory(),
                iryouHoken.getPrefectureCode(),
                iryouHoken.jitsuNissuu,
                iryouHoken.tensuu,
                iryouHoken.ichibuFutankin
            ] : ['', '', '', '', '', '']
        );

        /* kouhi section */

        for(var kouhi of receipt.getKouhiFutanIryous()) {
            soukatsuRecord = soukatsuRecord.concat([
                kouhi.futanshaBangou,
                kouhi.getHoubetsuCategory(),
                kouhi.jitsuNissuu,
                kouhi.tensuu,
                kouhi.ichibuFutankin
            ]);
        }

        /* 第三公費まで対応しているので、最大で第三公費までループする */

        if (receipt.getKouhiFutanIryous().length < 3) {
            for (var i = 0; i < 3 - receipt.getKouhiFutanIryous().length; i++) {
                soukatsuRecord = soukatsuRecord.concat(['', '', '', '', '']);
            }
        }

        soukatsuRecords.push(soukatsuRecord);
    }

    return soukatsuRecords;
};
