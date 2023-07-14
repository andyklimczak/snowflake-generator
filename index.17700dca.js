(function () {
// var SnowflakeId = require('snowflake-id');
/**
 * A function for converting hex <-> dec w/o loss of precision.
 * By Dan Vanderkam http://www.danvk.org/hex2dec.html
 */ // Adds two arrays for the given base (10 or 16), returning the result.
// This turns out to be the only "primitive" operation we need.
function $28fabe181c274aed$var$add(x, y, base) {
    var z = [];
    var n = Math.max(x.length, y.length);
    var carry = 0;
    var i = 0;
    while(i < n || carry){
        var xi = i < x.length ? x[i] : 0;
        var yi = i < y.length ? y[i] : 0;
        var zi = carry + xi + yi;
        z.push(zi % base);
        carry = Math.floor(zi / base);
        i++;
    }
    return z;
}
// Returns a*x, where x is an array of decimal digits and a is an ordinary
// JavaScript number. base is the number base of the array x.
function $28fabe181c274aed$var$multiplyByNumber(num, x, base) {
    if (num < 0) return null;
    if (num == 0) return [];
    var result = [];
    var power = x;
    while(true){
        if (num & 1) result = $28fabe181c274aed$var$add(result, power, base);
        num = num >> 1;
        if (num === 0) break;
        power = $28fabe181c274aed$var$add(power, power, base);
    }
    return result;
}
function $28fabe181c274aed$var$parseToDigitsArray(str, base) {
    var digits = str.split("");
    var ary = [];
    for(var i = digits.length - 1; i >= 0; i--){
        var n = parseInt(digits[i], base);
        if (isNaN(n)) return null;
        ary.push(n);
    }
    return ary;
}
function $28fabe181c274aed$var$convertBase(str, fromBase, toBase) {
    var digits = $28fabe181c274aed$var$parseToDigitsArray(str, fromBase);
    if (digits === null) return null;
    var outArray = [];
    var power = [
        1
    ];
    for(var i = 0; i < digits.length; i++){
        // invariant: at this point, fromBase^i = power
        if (digits[i]) outArray = $28fabe181c274aed$var$add(outArray, $28fabe181c274aed$var$multiplyByNumber(digits[i], power, toBase), toBase);
        power = $28fabe181c274aed$var$multiplyByNumber(fromBase, power, toBase);
    }
    var out = "";
    for(var i = outArray.length - 1; i >= 0; i--)out += outArray[i].toString(toBase);
    return out;
}
function $28fabe181c274aed$export$70129f17400369f0(hexStr) {
    if (hexStr.substring(0, 2) === "0x") hexStr = hexStr.substring(2);
    hexStr = hexStr.toLowerCase();
    return $28fabe181c274aed$var$convertBase(hexStr, 16, 10);
}


class $909df11052f373f6$export$2e2bcd8739ae039 {
    constructor(options){
        options = options || {};
        this.seq = 0;
        this.mid = (options.mid || 1) % 1023;
        this.offset = options.offset || 0;
        this.lastTime = 0;
    }
    generate() {
        const time = Date.now(), bTime = (time - this.offset).toString(2);
        // get the sequence number
        if (this.lastTime == time) {
            this.seq++;
            if (this.seq > 4095) {
                this.seq = 0;
                // make system wait till time is been shifted by one millisecond
                while(Date.now() <= time);
            }
        } else this.seq = 0;
        this.lastTime = time;
        let bSeq = this.seq.toString(2), bMid = this.mid.toString(2);
        // create sequence binary bit
        while(bSeq.length < 12)bSeq = "0" + bSeq;
        while(bMid.length < 10)bMid = "0" + bMid;
        const bid = bTime + bMid + bSeq;
        let id = "";
        for(let i = bid.length; i > 0; i -= 4)id = parseInt(bid.substring(i - 4, i), 2).toString(16) + id;
        return (0, $28fabe181c274aed$export$70129f17400369f0)(id);
    }
}


const $df541c95edf4e6f8$var$DEFAULT_MID = 42;
const $df541c95edf4e6f8$var$DEFAULT_OFFSET = 1545264000000;
document.addEventListener("DOMContentLoaded", function() {
    $df541c95edf4e6f8$var$handleGenerateSnowflakeId();
    const button = document.getElementById("snowflake-id-generate");
    button.addEventListener("click", (e)=>{
        e.preventDefault();
        $df541c95edf4e6f8$var$handleGenerateSnowflakeId();
    });
});
const $df541c95edf4e6f8$var$handleGenerateSnowflakeId = ()=>{
    const mid = $df541c95edf4e6f8$var$getDomMid();
    const offset = $df541c95edf4e6f8$var$getDomOffset();
    let snowflakeId = $df541c95edf4e6f8$var$generateSnowflakeId(mid, offset);
    $df541c95edf4e6f8$var$updateSnowflakeIdDom(snowflakeId);
};
const $df541c95edf4e6f8$var$generateSnowflakeId = (mid, offset)=>{
    var snowflake = new (0, $909df11052f373f6$export$2e2bcd8739ae039)({
        mid: mid,
        offset: offset
    });
    return snowflake.generate();
};
const $df541c95edf4e6f8$var$updateSnowflakeIdDom = (snowflakeId)=>{
    const el = document.getElementById("snowflake-id");
    el.innerText = snowflakeId;
};
const $df541c95edf4e6f8$var$getDomMid = ()=>{
    const el = document.getElementById("mid");
    const value = el.value.trim().length ? $df541c95edf4e6f8$var$DEFAULT_MID : el.value;
    return value;
};
const $df541c95edf4e6f8$var$getDomOffset = ()=>{
    const el = document.getElementById("offset");
    const value = el.value.trim().length ? $df541c95edf4e6f8$var$DEFAULT_OFFSET : el.value;
    return value;
};

})();
//# sourceMappingURL=index.17700dca.js.map
