import CryptoJS from 'crypto-js/core'
import AES from 'crypto-js/aes'
import Hex from 'crypto-js/enc-hex'
import Utf8 from 'crypto-js/enc-utf8'
import ECB from 'crypto-js/mode-ecb'

export default str =>
  AES.decrypt(
    CryptoJS.lib.CipherParams.create({
      ciphertext: Hex.parse(str)
    }),
    Hex.parse(
      '000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f'
    ),
    { mode: ECB }
  ).toString(Utf8)
