const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = secp.secp256k1.utils.randomPrivateKey();
console.log("Private Key:", toHex(privateKey));

const publicKey = secp.secp256k1.getPublicKey(privateKey);
console.log("Public Key:", toHex(publicKey));

const address = toHex(keccak256(privateKey.slice(1).slice(-20)));
console.log("Address:", `0x${address}`);

// GENERTAED OUTPUT
/**
 * Private Key: f01f894a8b481e43af3be0c3d3bafd8bec06a5d54b20af9d4c3b518913251b33
   Public Key: 03934b65eff330c8ae12f4dab6f9b408c314b28fb6ad633616c2b3642a01b8d312
   Address: 0xe9a8522ad86ac5487ce2882811e2baf38354fefc3652c021d6a781a9050e4c25
 * 
   Private Key: 3ac192c866cbbe4e379afb2da6ba356a72fc03dbbc8d96d2baae710f09a34247
   Public Key: 02560bbc55a67a56000e710c2dfa45ba8e2ba26e5228d6d0bdeb8c322cc17e775e
   Address: 0x25adff24f7d935cb606cb103ca5aaa5f3cbfa0fbc79968cb0ff439672dd92cc8

   Private Key: c40dcd760409f3bfb1aa0927d7c805a2f4c67383165ec43306a670d24a5dbefe
   Public Key: 02237b4ff434e9348f2d398a86c5a5738a1d9487a35c791e52c0ea2ca329c52dec
   Address: 0xe14c8cd705776cc99ffdbe558e2a4640d76cc453ecd2905a68268134190c4b17

 */
