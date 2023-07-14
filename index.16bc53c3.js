// var SnowflakeId = require('snowflake-id');
/**
 * A function for converting hex <-> dec w/o loss of precision.
 * By Dan Vanderkam http://www.danvk.org/hex2dec.html
 */ // Adds two arrays for the given base (10 or 16), returning the result.
// This turns out to be the only "primitive" operation we need.
function $61138394503b1f61$var$add(x, y, base) {
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
function $61138394503b1f61$var$multiplyByNumber(num, x, base) {
    if (num < 0) return null;
    if (num == 0) return [];
    var result = [];
    var power = x;
    while(true){
        if (num & 1) result = $61138394503b1f61$var$add(result, power, base);
        num = num >> 1;
        if (num === 0) break;
        power = $61138394503b1f61$var$add(power, power, base);
    }
    return result;
}
function $61138394503b1f61$var$parseToDigitsArray(str, base) {
    var digits = str.split("");
    var ary = [];
    for(var i = digits.length - 1; i >= 0; i--){
        var n = parseInt(digits[i], base);
        if (isNaN(n)) return null;
        ary.push(n);
    }
    return ary;
}
function $61138394503b1f61$var$convertBase(str, fromBase, toBase) {
    var digits = $61138394503b1f61$var$parseToDigitsArray(str, fromBase);
    if (digits === null) return null;
    var outArray = [];
    var power = [
        1
    ];
    for(var i = 0; i < digits.length; i++){
        // invariant: at this point, fromBase^i = power
        if (digits[i]) outArray = $61138394503b1f61$var$add(outArray, $61138394503b1f61$var$multiplyByNumber(digits[i], power, toBase), toBase);
        power = $61138394503b1f61$var$multiplyByNumber(fromBase, power, toBase);
    }
    var out = "";
    for(var i = outArray.length - 1; i >= 0; i--)out += outArray[i].toString(toBase);
    return out;
}
function $61138394503b1f61$export$70129f17400369f0(hexStr) {
    if (hexStr.substring(0, 2) === "0x") hexStr = hexStr.substring(2);
    hexStr = hexStr.toLowerCase();
    return $61138394503b1f61$var$convertBase(hexStr, 16, 10);
}


class $2dc7c63512b215fd$export$2e2bcd8739ae039 {
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
        return (0, $61138394503b1f61$export$70129f17400369f0)(id);
    }
}


const $ade450cb9829f992$var$DEFAULT_MID = 42;
const $ade450cb9829f992$var$DEFAULT_OFFSET = 1545264000000;
document.addEventListener("DOMContentLoaded", function() {
    $ade450cb9829f992$var$handleGenerateSnowflakeId();
    const button = document.getElementById("snowflake-id-generate");
    button.addEventListener("click", (e)=>{
        e.preventDefault();
        $ade450cb9829f992$var$handleGenerateSnowflakeId();
    });
});
const $ade450cb9829f992$var$handleGenerateSnowflakeId = ()=>{
    const mid = $ade450cb9829f992$var$getDomMid();
    const offset = $ade450cb9829f992$var$getDomOffset();
    let snowflakeId = $ade450cb9829f992$var$generateSnowflakeId(mid, offset);
    $ade450cb9829f992$var$updateSnowflakeIdDom(snowflakeId);
};
const $ade450cb9829f992$var$generateSnowflakeId = (mid, offset)=>{
    var snowflake = new (0, $2dc7c63512b215fd$export$2e2bcd8739ae039)({
        mid: mid,
        offset: offset
    });
    return snowflake.generate();
};
const $ade450cb9829f992$var$updateSnowflakeIdDom = (snowflakeId)=>{
    const el = document.getElementById("snowflake-id");
    el.innerText = snowflakeId;
};
const $ade450cb9829f992$var$getDomMid = ()=>{
    const el = document.getElementById("mid");
    const value = el.value.trim().length ? $ade450cb9829f992$var$DEFAULT_MID : el.value;
    return value;
};
const $ade450cb9829f992$var$getDomOffset = ()=>{
    const el = document.getElementById("offset");
    const value = el.value.trim().length ? $ade450cb9829f992$var$DEFAULT_OFFSET : el.value;
    return value;
};


//# sourceMappingURL=index.16bc53c3.js.map
