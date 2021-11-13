var qrcode = new QRCode("qrcode");
var qrscan = null;

function generateQR() {    
    var elText = document.getElementById("qrtext");
    
    if (!elText.value) {
      elText.focus();
      return;
    }
    
    qrcode.makeCode(elText.value);
}

function sendClipBoardData() {
    var copyText = document.getElementById("qrscantext");
    console.log("content : " + copyText.value);
    navigator.clipboard.writeText(copyText.value);
  }

function getClipBoardData() {
    navigator.clipboard.readText()
  .then(text => {
    console.log('content: ', text);
    document.getElementById("qrtext").value = text;
    generateQR();
  })
  .catch(err => {
    
  });
}
document.getElementById("qrtext").focus();
getClipBoardData();

function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete"
        || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

docReady(function () {
    var resultContainer = document.getElementById('qrscantext');
    var lastResult, countResults = 0;
    function onScanSuccess(decodedText, decodedResult) {
        if (decodedText !== lastResult) {
            ++countResults;
            lastResult = decodedText;
            resultContainer.value = decodedText;
            resultContainer.innerText = decodedText;
            sendClipBoardData();
            //qrscan.stop();
            stopQRscan();
        }
    }

    qrscan = new Html5QrcodeScanner(
        "qrscan", { fps: 10, qrbox: 250 });
    qrscan.render(onScanSuccess);
});

function stopQRscan() {
    qrscan.clear().then(_ => {
        console.clear();
      }).catch(error => {
      });
}