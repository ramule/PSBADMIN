import { Injectable } from '@angular/core';
declare var CryptoJS: any;
@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {

  constructor() { }
  encryptText(txtToEncrypt, PASSPHRASE) {
    
    var salt = CryptoJS.lib.WordArray.random(256 / 16);

    var iv = CryptoJS.lib.WordArray.random(256 / 16);

    var key128Bits = CryptoJS.PBKDF2(PASSPHRASE, salt, { keySize: 256 / 32 });

    var key128Bits100Iterations = CryptoJS.PBKDF2(PASSPHRASE, salt, { keySize: 256 / 32, iterations: 1000 });
    ;
    var encrypted = CryptoJS.AES.encrypt(txtToEncrypt, key128Bits100Iterations, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

    var CombineData = salt + " " + iv + " " + encrypted;

    return CombineData;
  }

  decryptText(txtToDecrypt, PASSPHRASE) {
    try {
      var arrdata = txtToDecrypt.split(" ");
      var serverSalt = arrdata[0],
        serveriv = arrdata[1],
        encryptedData = arrdata[2];
      var salt = CryptoJS.enc.Hex.parse(serverSalt);

      var iv = CryptoJS.enc.Hex.parse(serveriv);

      var key = CryptoJS.PBKDF2(PASSPHRASE, salt, { keySize: 256 / 32, iterations: 1000 });

      var decrypt = CryptoJS.AES.decrypt(encryptedData, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

      var decryptValue = decrypt.toString(CryptoJS.enc.Utf8);

      return decryptValue;

    }
    catch (e) {

    }
  }

  decryptMobileIdText(txtToDecrypt, PASSPHRASE) {
    try {
      var arrdata = txtToDecrypt.split(" ");
      var serverSalt = arrdata[0],
        serveriv = arrdata[1],
        encryptedData = arrdata[2];
        console.log("PASSPHRASE::: "+PASSPHRASE);
        console.log("salt: "+serverSalt.slice(0,serverSalt.length-5)+" iv: "+serveriv.slice(0,serveriv.length-5) + " data: "+encryptedData.slice(5,encryptedData.length));
      var salt = CryptoJS.enc.Hex.parse(serverSalt.slice(0,serverSalt.length-5));

      var iv = CryptoJS.enc.Hex.parse(serveriv.slice(0,serveriv.length-5));

      var key = CryptoJS.PBKDF2(PASSPHRASE, salt, { keySize: 256 / 32, iterations: 1000 });

      var decrypt = CryptoJS.AES.decrypt(encryptedData.slice(5,encryptedData.length), key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

      var decryptValue = decrypt.toString(CryptoJS.enc.Utf8);
      console.log("decryptValue: "+decryptValue);
      return decryptValue;
      
    }
    catch (e) {

    }
  }

  createHashValue(txtToHash){
    try{
      return CryptoJS.SHA1(txtToHash).toString();
    }
    catch(e){
    }
  }
}
