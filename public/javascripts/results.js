loadData = () => {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", displayData);
    xhr.open("GET", 'results/data', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
};

function displayData () {
    const data = JSON.parse(this.responseText);
    console.log(data);
    document.getElementById("data").innerHTML = prettyPrintJson.toHtml(data);
}

/*
* TAKEN FROM: https://blog.centerkey.com/2013/05/javascript-colorized-pretty-print-json.html
 */
const prettyPrintJson = {
    toHtml: function(obj) {
        function replacer(match, pIndent, pKey, pVal, pEnd) {
            const key =  '<span class=json-key>';
            const val =  '<span class=json-value>';
            const bool = '<span class=json-boolean>';
            const str =  '<span class=json-string>';
            const isBool = ['true', 'false'].includes(pVal);
            const pValSpan = /^"/.test(pVal) ? str : isBool ? bool : val;
            let r = pIndent || '';
            if (pKey)
                r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
            if (pVal)
                r = r + pValSpan + pVal + '</span>';
            return r + (pEnd || '');
        }
        const jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
        return JSON.stringify(obj, null, 3)
            .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
            .replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(jsonLine, replacer);
    }
};
