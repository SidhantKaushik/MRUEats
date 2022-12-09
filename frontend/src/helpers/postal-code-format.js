//Checks for valid Postal Code formats and changes them to be constant (ex. t3m0x1 is valid and formats to => T3M 0X1) 
export default function formatPostalCode(value) {
    if (!value) {
        return null;
    }

    value = value.toString().trim();

    var format = new RegExp(/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i);

    if (format.test(value.toString().replace(/\W+/g, ''))) {
        return value.toString().replace(/\W+/g, '');
    }
}