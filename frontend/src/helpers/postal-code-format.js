//Checks for valid postal code (Rename?)
export default function formatPostalCode(value){
    if (!value){
        return null;
    }

    value = value.toString().trim();

    var format = new RegExp(/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i);

    if(format.test(value.toString().replace(/\W+/g, ''))){
        return value.toString().replace(/\W+/g, '');
    }
}