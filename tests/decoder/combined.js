'use strict';

const test = require('node:test');
const assert = require('node:assert');
const {PacketsDecoder} = require('../../lib/decoder');

test('decode combined packets', (t) => {
  const encoded =
    '000001d207096c6973742d636f6e6e01057465737431040b6c6f63616c5f616464727305000425616e7906040c72656d6f74655f616464727305000425616e79' +
    '06030776657273696f6e0007494b4576312f32030b7265617574685f74696d6500053130323630030a72656b65795f74696d650001300306756e69717565000e' +
    '554e495155455f5245504c414345030b6470645f74696d656f7574000331353001076c6f63616c2d310305636c617373000a7075626c6963206b657904066772' +
    '6f75707306040b636572745f706f6c6963790604056365727473060407636163657274730602010872656d6f74652d310305636c617373000a7075626c696320' +
    '6b6579040667726f75707306040b636572745f706f6c696379060405636572747306040763616365727473060201086368696c6472656e010574657374310304' +
    '6d6f6465000654554e4e454c030a72656b65795f74696d65000433303630030b72656b65795f6279746573000130030d72656b65795f7061636b657473000130' +
    '030a6470645f616374696f6e0005636c656172030c636c6f73655f616374696f6e0005636c65617204086c6f63616c2d747305000764796e616d696306040972' +
    '656d6f74652d747305000764796e616d696306020202000001e607096c6973742d636f6e6e01057465737432040b6c6f63616c5f61646472730500093132372e' +
    '302e302e3106040c72656d6f74655f616464727305000425616e7906030776657273696f6e0007494b4576312f32030b7265617574685f74696d650005313032' +
    '3630030a72656b65795f74696d650001300306756e69717565000e554e495155455f5245504c414345030b6470645f74696d656f7574000331353001076c6f63' +
    '616c2d310305636c617373000a7075626c6963206b65790302696400093132372e302e302e31040667726f75707306040b636572745f706f6c69637906040563' +
    '65727473060407636163657274730602010872656d6f74652d310305636c617373000a7075626c6963206b6579040667726f75707306040b636572745f706f6c' +
    '696379060405636572747306040763616365727473060201086368696c6472656e0105746573743203046d6f6465000654554e4e454c030a72656b65795f7469' +
    '6d65000433303630030b72656b65795f6279746573000130030d72656b65795f7061636b657473000130030a6470645f616374696f6e0005636c656172030c63' +
    '6c6f73655f616374696f6e0005636c65617204086c6f63616c2d747305000764796e616d696306040972656d6f74652d747305000764796e616d696306020202' +
    '0000000101';
  const expected = [
    {
      size: 466,
      type: 7,
      event: 'list-conn',
      payload: {
        test1: {
          local_addrs: [ '%any' ],
          remote_addrs: [ '%any' ],
          version: 'IKEv1/2',
          reauth_time: '10260',
          rekey_time: '0',
          unique: 'UNIQUE_REPLACE',
          dpd_timeout: '150',
          'local-1': {
            class: 'public key',
            groups: [],
            cert_policy: [],
            certs: [],
            cacerts: []
          },
          'remote-1': {
            class: 'public key',
            groups: [],
            cert_policy: [],
            certs: [],
            cacerts: []
          },
          children: {
            test1: {
              mode: 'TUNNEL',
              rekey_time: '3060',
              rekey_bytes: '0',
              rekey_packets: '0',
              dpd_action: 'clear',
              close_action: 'clear',
              'local-ts': [ 'dynamic' ],
              'remote-ts': [ 'dynamic' ]
            }
          }
        }
      }
    },
    {
      size: 486,
      type: 7,
      event: 'list-conn',
      payload: {
        test2: {
          local_addrs: [ '127.0.0.1' ],
          remote_addrs: [ '%any' ],
          version: 'IKEv1/2',
          reauth_time: '10260',
          rekey_time: '0',
          unique: 'UNIQUE_REPLACE',
          dpd_timeout: '150',
          'local-1': {
            class: 'public key',
            id: '127.0.0.1',
            groups: [],
            cert_policy: [],
            certs: [],
            cacerts: []
          },
          'remote-1': {
            class: 'public key',
            groups: [],
            cert_policy: [],
            certs: [],
            cacerts: []
          },
          children: {
            test2: {
              mode: 'TUNNEL',
              rekey_time: '3060',
              rekey_bytes: '0',
              rekey_packets: '0',
              dpd_action: 'clear',
              close_action: 'clear',
              'local-ts': [ 'dynamic' ],
              'remote-ts': [ 'dynamic' ]
            }
          }
        }
      }
    },
    { size: 1, type: 1, event: null, payload: {} }
  ];

  const decoder = new PacketsDecoder();

  assert.deepStrictEqual(
    decoder.decode(Buffer.from(encoded, 'hex')),
    expected
  );
});
