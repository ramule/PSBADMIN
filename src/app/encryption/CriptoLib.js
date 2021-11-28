function encryptText(txtToEncrypt, PASSPHRASE)
{
	//console.log("PASSPHRASE "+PASSPHRASE);
	//console.log("txtToEncrypt "+txtToEncrypt);
	var salt = CryptoJS.lib.WordArray.random(128/8);
	 //var salt = '22c244594ea7a2be228904b290e6289a';
  	var iv = CryptoJS.lib.WordArray.random(128/8); 
  	//var iv = '505452323259b18e88c0d4707c5ee6c7';
	//console.log("salt "+salt+" iv:   "+iv);
	var key128Bits = CryptoJS.PBKDF2(PASSPHRASE, salt, { keySize: 128/32 }); 
	//console.log("key128Bits "+key128Bits);
  	var key128Bits100Iterations = CryptoJS.PBKDF2(PASSPHRASE, salt, { keySize: 128/32, iterations: 100 });
  	//console.log("key128Bits100Iterations "+key128Bits100Iterations);
  	var encrypted = CryptoJS.AES.encrypt(txtToEncrypt, key128Bits100Iterations, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7  });
	//console.log("encrypted "+encrypted);
	var CombineData = salt+"~~~"+iv+"~~~"+encrypted;	
	//formWidget.text = CombineData;
	//console.log("key128Bits "+key128Bits+"key128Bits100Iterations "+key128Bits100Iterations+"encrypted "+encrypted);
	//console.log("data "+CombineData);
	return CombineData;
}

function decryptText(txtToDecrypt, PASSPHRASE){
	
 try{
	  var arrdata = txtToDecrypt.split(" ");
	  var serverSalt = arrdata[0] , 
	  serveriv = arrdata[1] , 
	  encryptedData = arrdata[2] ;
	  var salt = CryptoJS.enc.Hex.parse(serverSalt);
	  //console.log("salt "+salt);
	  var iv = CryptoJS.enc.Hex.parse(serveriv);
	   //console.log("iv "+iv);
	  var key = CryptoJS.PBKDF2(PASSPHRASE, salt, { keySize: 128/32, iterations: 100 });
	// alert("key "+key);
	  var decrypt = CryptoJS.AES.decrypt(encryptedData, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
	//  alert("decrypt "+decrypt);
	  var decryptValue = decrypt.toString(CryptoJS.enc.Utf8); 
	//  alert("decryptValue" +decryptValue);
	  return decryptValue;

	}
	catch(e)
	{
	
	}
} 
