// var SnowflakeId = require('snowflake-id');

import SnowflakeId from "snowflake-id";

const DEFAULT_MID = 42
const DEFAULT_OFFSET = (2019-1970)*31536000*1000

document.addEventListener("DOMContentLoaded", function(){
    handleGenerateSnowflakeId()

    const button = document.getElementById("snowflake-id-generate")
    button.addEventListener("click", (e) => {
        e.preventDefault()
        handleGenerateSnowflakeId()
    })
});

const handleGenerateSnowflakeId = () => {
    const mid = getDomMid()
    const offset = getDomOffset()
    let snowflakeId = generateSnowflakeId(mid, offset)
    updateSnowflakeIdDom(snowflakeId)
}


const generateSnowflakeId = (mid, offset) => {
    var snowflake = new SnowflakeId({
        mid: mid ,
        offset: offset,
    });
    return snowflake.generate();
}

const updateSnowflakeIdDom = (snowflakeId) => {
    const el = document.getElementById("snowflake-id")
    el.innerText = snowflakeId
}

const getDomMid = () => {
    const el = document.getElementById("mid")
    const value = el.value.trim().length ? DEFAULT_MID : el.value
    return value
}

const getDomOffset = () => {
    const el = document.getElementById("offset")
    const value = el.value.trim().length ? DEFAULT_OFFSET : el.value
    return value
}
