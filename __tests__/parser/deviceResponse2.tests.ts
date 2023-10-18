import { KeyLike, importJWK } from 'jose';
import { hex } from 'buffer-tag';
import { parse } from '../../src';
import { DeviceResponse } from '../../src/deviceResponse/types';
import { cborEncode } from '../../src/cbor';

describe('parse DeviceResponse Example 2', () => {
  describe('parse', () => {
    let parsed: DeviceResponse;
    let publicKey: KeyLike | Uint8Array;

    beforeAll(async () => {
      publicKey = await importJWK({
        kty: 'EC',
        x: '1pFqvIK9kbz7-dwejzpwj9D7kfWbdEKXCpnf6q5sFQs',
        y: 'WY_RWyq4KR7iLM0ZseIK9Apkt069aM1T5b5HZyEYiXE',
        crv: 'P-256',
      });
    });

    // this is a Mobile Driver License randomly generated for the purpose of this test
    // signed with the randomly generated private key.
    const encodedDeviceResponse = hex`a36776657273696f6e63312e3069646f63756d656e747381a267646f6354797065756f72672e69736f2e31383031332e352e312e6d444c6c6973737565725369676e6564a26a6e616d65537061636573a26d6f72672e616c65782e7465737481d8185859a4686469676573744944006672616e646f6d582028719f311bb3a1f97c6f568d6f471de66a26479a07688747ba7453abb9e0bc4871656c656d656e744964656e74696669657264636f6f6c6c656c656d656e7456616c7565f5716f72672e69736f2e31383031332e352e318bd8185865a4686469676573744944006672616e646f6d582011bb3d1442c3daeab05bc91b82241c9c2628fd3c456aed33accb4c0d17cf3bbd71656c656d656e744964656e7469666965726b66616d696c795f6e616d656c656c656d656e7456616c756565536d697468d8185863a4686469676573744944016672616e646f6d5820dd54235fbddbddac9bc7f4db7b35aa3281fd67b891a85cfcdce791f03c61106071656c656d656e744964656e7469666965726a676976656e5f6e616d656c656c656d656e7456616c7565644a6f686ed818586ca4686469676573744944026672616e646f6d5820c606430947373fdf55afb3019f5a0ad0dcf688200ccd4460b66916cee8c5dbff71656c656d656e744964656e7469666965726a62697274685f646174656c656c656d656e7456616c7565d903ec6a313938302d30362d3135d818586ca4686469676573744944036672616e646f6d5820958ec7c03b138d3cb579417179e1b04389a40d1bc1443dae648516dd9f60261f71656c656d656e744964656e7469666965726a69737375655f646174656c656c656d656e7456616c7565d903ec6a323032332d30332d3031d818586da4686469676573744944046672616e646f6d582045abe3f572b1c021fc822541a5062877050c9217eb08b6e03a9f7616585b36ac71656c656d656e744964656e7469666965726b6578706972795f646174656c656c656d656e7456616c7565d903ec6a323032382d30332d3331d8185866a4686469676573744944056672616e646f6d5820925ce44adce713e000fc432df9a60a85a3e0595e2378e55b639eabca17e2bb6f71656c656d656e744964656e7469666965726f69737375696e675f636f756e7472796c656c656d656e7456616c7565625553d818586aa4686469676573744944066672616e646f6d5820ab8fec3ad24e9ea6b782858919328866b4a458effe6c2529eab679a3fb0a7e6e71656c656d656e744964656e74696669657269617574686f726974796c656c656d656e7456616c75656c4e657720596f726b20444d56d818586fa4686469676573744944076672616e646f6d5820c126ece7b5a32f2f6036edae0800b05ef27ab55a1eaef1b02b75f889fcfcd33b71656c656d656e744964656e7469666965726f646f63756d656e745f6e756d6265726c656c656d656e7456616c75656b30312d3333332d37303730d8185861a4686469676573744944086672616e646f6d582025f1a39ccd8acc7ca1f57cc4505ef13548b94bea791198dd2ffe8a61190ee14e71656c656d656e744964656e74696669657268706f7274726169746c656c656d656e7456616c75656462737472d81858ada4686469676573744944096672616e646f6d582083bfaa80d22aa5b17deae2a58bb0aba80cccce9993e08b38d1e0c2dd23c6176d71656c656d656e744964656e7469666965727264726976696e675f70726976696c656765736c656c656d656e7456616c756581a37576656869636c655f63617465676f72795f636f646561436a69737375655f646174656a323032332d30332d30316b6578706972795f646174656a323032382d30332d3331d8185878a46864696765737449440a6672616e646f6d58204db2cc1b7b5c1281b4ad0811948d1ba3a1c0a270e70ed0abbfdb15424f3da34d71656c656d656e744964656e74696669657276756e5f64697374696e6775697368696e675f7369676e6c656c656d656e7456616c75656d7462642d75732e6e792e646d766a697373756572417574688443a10126a1044231315902aca66776657273696f6e63312e306f646967657374416c676f726974686d667368613235366c76616c756544696765737473a26d6f72672e616c65782e74657374a1613058206b7684282d4be8673224c28b265d786abee02f52aa39a2c9e069cbafab4e90e3716f72672e69736f2e31383031332e352e31ab61305820336dad83bacbb10c4e68928bfe68461f1509bfa016485454a4fb44265e1131f361315820ef5ab2dfab1d149db38f0042e5a81ced13c6535c8bb47dd4949259f34bcbab5d61325820dc88c9e97dce4f4adec211c9d48a28feee95b01828be8400d70499079af1f631613358208c5a3335d5e240512cef6d5fb434d17b2025d4d82d3b3fd8d28b70c059742f2261345820b095b9c40677a110794aca2d676c20d648cdad210a1afaf5a7751124645ca80f613558204af23f8175181cd3b42448cdffe4f3a23249968ed4939f7bc923370d40eac81061365820868270a4e3600d3b485691c80a2351f486bf923bfa4062e7970b38f90b2aff6c61375820550826a81410c5ae4525154b941cc5882df121420e548219b0e4c9cb8abdb06b61385820999f6f2c59285552823e08c195aaa55aff2959e307fea30992a94a25db5cc59f6139582072f084c7e796bb55e08550b56eef6c27492f9ffdca83fae7c607180d04e324616231305820ede29da07f1f9faca45c254cc735bb7b96ac4e8285c6ea39723be94ba968917f6d6465766963654b6579496e666fa1696465766963654b6579f767646f6354797065756f72672e69736f2e31383031332e352e312e6d444c6c76616c6964697479496e666fa3667369676e656456c074323032332d30392d31315432303a33383a30355a6976616c696446726f6d56c074323032332d30392d31315432303a33383a30355a6a76616c6964556e74696c56c074323032332d30392d31325430313a33383a30355a584010e6943c5475face861933d0f554f65e82621ab4414452f9fc13dc90685af8a791c2f9216c6075ba6acb7e49938b170018b33f70f812a1f6b784aa57a7af15fc6673746174757300`;

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
        .nameSpaces['org.iso.18013.5.1']
        .find((e) => e.elementIdentifier === 'given_name')?.elementValue;
      // expect(parsed).toMatchSnapshot();
      expect(givenName).toBe('John');
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
