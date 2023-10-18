import { KeyLike, importJWK } from 'jose';
import { hex } from 'buffer-tag';
import { parse } from '../../src';
import { DeviceResponse } from '../../src/deviceResponse/types';
import { cborEncode } from '../../src/cbor';

describe('parse DeviceResponse Example 1', () => {
  describe('parse', () => {
    let parsed: DeviceResponse;

    let publicKey: KeyLike | Uint8Array;

    beforeAll(async () => {
      publicKey = await importJWK({
        alg: 'ES256',
        kty: 'EC',
        crv: 'P-256',
        x: 'HjeKz2TMyZU-kyocWZaE0NzG3927BtrEiQdHPPQy6lA',
        y: 'DFs6L1342jZlvA7rraXk1konYdLdiMNnKF4IjeInDnQ',
      });
    });

    // this is a Mobile Driver License randomly generated for the purpose of this test
    // signed with the randomly generated private key.
    const encodedDeviceResponse = hex`a36776657273696f6e63312e3069646f63756d656e747381a267646f6354797065781865752e6575726f70612e65632e65756469772e7069642e316c6973737565725369676e6564a26a6e616d65537061636573a2781865752e6575726f70612e65632e65756469772e7069642e3185d818586ca4686469676573744944006672616e646f6d5820d80ce42acf60ffd13837e0ec68c1c4f1458dac6efb3da12033e526ada455913671656c656d656e744964656e7469666965726a62697274685f646174656c656c656d656e7456616c7565d903ec6a313932322d30332d3133d8185864a4686469676573744944016672616e646f6d5820c0978011052e0ae610d220f7ac4a073090531981b7e155475563656066218cf171656c656d656e744964656e7469666965726d62697274685f636f756e7472796c656c656d656e7456616c7565624954d8185867a4686469676573744944026672616e646f6d582033f5bdc155ed1a33cc059219d18f58bb8829479f5d9aafd8a68953d4515a2c2e71656c656d656e744964656e7469666965726a676976656e5f6e616d656c656c656d656e7456616c7565684d61736365747469d8185869a4686469676573744944036672616e646f6d5820ecc9eb95ab24a841eb23168e20f21cd29aba53843d0fa7c1e221664a177fbb1a71656c656d656e744964656e7469666965726b66616d696c795f6e616d656c656c656d656e7456616c7565695261666661656c6c6fd8185864a4686469676573744944046672616e646f6d582065bc8496074eb6a046d6ef8dbdcd76b0e4a28c9a0ae7d36acb1b37ab559540d571656c656d656e744964656e7469666965726b62697274685f706c6163656c656c656d656e7456616c756564526f6d65781b65752e6575726f70612e65632e65756469772e7069642e69742e3181d8185875a4686469676573744944056672616e646f6d582066934c5e016d90921a526d13bc27800db8b31743ab19d7c11ef00073e1453f6271656c656d656e744964656e7469666965726b7461785f69645f636f64656c656c656d656e7456616c75657554494e49542d5858585858585858585858585858586a697373756572417574688459021ea30126044864656d6f2d6b6964182159020c30820208308201afa00302010202143bc68f2e680f92975f25a07d04166f737d24cecc300a06082a8648ce3d0403023064310b30090603550406130255533113301106035504080c0a43616c69666f726e69613116301406035504070c0d53616e204672616e636973636f31133011060355040a0c0a4d7920436f6d70616e793113301106035504030c0a6d79736974652e636f6d301e170d3233303833303135353734345a170d3233303930393135353734345a3064310b30090603550406130255533113301106035504080c0a43616c69666f726e69613116301406035504070c0d53616e204672616e636973636f31133011060355040a0c0a4d7920436f6d70616e793113301106035504030c0a6d79736974652e636f6d3059301306072a8648ce3d020106082a8648ce3d030107034200041e378acf64ccc9953e932a1c599684d0dcc6dfddbb06dac48907473cf432ea500c5b3a2f5df8da3665bc0eebada5e4d64a2761d2dd88c367285e088de2270e74a33f303d303b0603551d1104343032863068747470733a2f2f63726564656e7469616c2d6973737565722e6f6964632d66656465726174696f6e2e6f6e6c696e65300a06082a8648ce3d0403020347003044022054eb3b061233d84e872abc8fb5a3393dc18695b77ee3b35b6294687df706e55a02203fe9723700d49999e6a9f15d4de11cf24f19067656dc3775fdd8a87204821cfba1182159020d30820209308201afa003020102021447e3653e858a6a4fc642706ddc15ad2c3bc542ad300a06082a8648ce3d0403023064310b30090603550406130255533113301106035504080c0a43616c69666f726e69613116301406035504070c0d53616e204672616e636973636f31133011060355040a0c0a4d7920436f6d70616e793113301106035504030c0a6d79736974652e636f6d301e170d3233303833303135353734345a170d3233303930393135353734345a3064310b30090603550406130255533113301106035504080c0a43616c69666f726e69613116301406035504070c0d53616e204672616e636973636f31133011060355040a0c0a4d7920436f6d70616e793113301106035504030c0a6d79736974652e636f6d3059301306072a8648ce3d020106082a8648ce3d030107034200041e378acf64ccc9953e932a1c599684d0dcc6dfddbb06dac48907473cf432ea500c5b3a2f5df8da3665bc0eebada5e4d64a2761d2dd88c367285e088de2270e74a33f303d303b0603551d1104343032863068747470733a2f2f63726564656e7469616c2d6973737565722e6f6964632d66656465726174696f6e2e6f6e6c696e65300a06082a8648ce3d04030203480030450221008edb1ccbe24f28073134873f9d8c5f155f0268aeb884222bbda06897be04543e022060bc420a61e38f612f68428896d1e3051a3b5ea638b9b414452caa1cf0c402185901e8a66776657273696f6e63312e306f646967657374416c676f726974686d667368613235366c76616c756544696765737473a2781865752e6575726f70612e65632e65756469772e7069642e31a5005820c5e4b1135f9afa83bdcc2e3e2b31e6f240d83722e2e353eb666ff723a3e65bdc01582001f4acf500142ba7b4e095dcb24bcc3b43924539a171306678b518b14fbbba3d025820ad9fa8652dcd382cf0e3308f603c2b05029c0dec51c6927d99ad0373c613427d035820e90e3f301c178410d512918be77c74bdbdf648c8b1e97f997b90971d7e7e61ec0458201010c54a69649f28ec727babb639bb32dc57e8b67dd90f7d2d6e2cf1c3f61563781b65752e6575726f70612e65632e65756469772e7069642e69742e31a105582036bd98e8278f171ce4b7dd2452a4ceed56d95045ebcbe770bf44616c64de0df86d6465766963654b6579496e666fa1696465766963654b6579f667646f6354797065781865752e6575726f70612e65632e65756469772e7069642e316c76616c6964697479496e666fa3667369676e656456c074323032332d30382d33305431353a35373a34345a6976616c696446726f6d56c074323032332d30382d33305431353a35373a34345a6a76616c6964556e74696c56c074323032382d30382d32385431353a35373a34345a58402f625f84fdc76048d99e68b3bcc2fe3fd8868824a83351cd123aff347652c5f397e6a2dc77a5d6cdfed365780a603013aed68af91f01127c8182f61addfe57526673746174757300`;

    beforeAll(async () => {
      parsed = await parse(encodedDeviceResponse);
    });

    it('should match the snapshot', () => {
      expect(parsed).toMatchSnapshot();
    });

    it('should parse issuerSigned.issuerAuth[1] as map', () => {
      expect(parsed.documents[0].issuerSigned.issuerAuth.unprotectedHeaders).toBeInstanceOf(Map);
    });

    it('should contain the first name', () => {
      const givenName = parsed.documents[0]
        .issuerSigned
        .nameSpaces['eu.europa.ec.eudiw.pid.1']
        .find((e) => e.elementIdentifier === 'given_name')?.elementValue;
      expect(givenName).toBe('Mascetti');
    });

    it('should verify the issuerAuth', async () => {
      const r = await parsed.documents[0].issuerSigned.issuerAuth.verify(publicKey);
      expect(r).toBeTruthy();
    });

    it('should decoded protected headers', () => {
      expect(parsed.documents[0].issuerSigned.issuerAuth.protectedHeaders)
        .toMatchSnapshot();
    });

    it('should contain the raw decode', () => {
      expect(parsed).toHaveProperty('raw');
      expect(cborEncode(parsed.raw).toString('hex'))
        .toBe(encodedDeviceResponse.toString('hex'));
    });
  });
});
