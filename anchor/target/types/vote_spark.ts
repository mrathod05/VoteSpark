/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/vote_spark.json`.
 */
export type VoteSpark = {
  "address": "BBU4VxxYCUHRBDEuVSGjpmz7G3q3HdE2rdaitFYWs47W",
  "metadata": {
    "name": "voteSpark",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "initializePoll",
      "discriminator": [
        193,
        22,
        99,
        197,
        18,
        33,
        115,
        117
      ],
      "accounts": [
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "poll",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "pollId",
          "type": "u8"
        },
        {
          "name": "endTime",
          "type": "i64"
        },
        {
          "name": "createdAt",
          "type": "i64"
        },
        {
          "name": "options",
          "type": {
            "vec": {
              "defined": {
                "name": "optionItem"
              }
            }
          }
        },
        {
          "name": "title",
          "type": "string"
        }
      ]
    },
    {
      "name": "removePoll",
      "discriminator": [
        127,
        237,
        78,
        34,
        55,
        84,
        172,
        225
      ],
      "accounts": [
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "poll",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "pollId",
          "type": "u8"
        }
      ]
    },
    {
      "name": "votePoll",
      "discriminator": [
        154,
        219,
        48,
        148,
        149,
        7,
        153,
        194
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "poll",
          "writable": true
        },
        {
          "name": "vote",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "pollId",
          "type": "u8"
        },
        {
          "name": "optionIndex",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "poll",
      "discriminator": [
        110,
        234,
        167,
        188,
        231,
        136,
        153,
        111
      ]
    },
    {
      "name": "vote",
      "discriminator": [
        96,
        91,
        104,
        57,
        145,
        35,
        172,
        155
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidOption",
      "msg": "Invalid Option Index"
    },
    {
      "code": 6001,
      "name": "pollExpired",
      "msg": "Poll Has Expired"
    },
    {
      "code": 6002,
      "name": "titleTooShort",
      "msg": "Poll Title Too Short"
    },
    {
      "code": 6003,
      "name": "titleTooLong",
      "msg": "Poll Title Too Long"
    },
    {
      "code": 6004,
      "name": "tooManyOptions",
      "msg": "Too Many Poll Options"
    },
    {
      "code": 6005,
      "name": "duplicateVote",
      "msg": "Duplicate Vote Detected"
    }
  ],
  "types": [
    {
      "name": "optionItem",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u8"
          },
          {
            "name": "label",
            "type": "string"
          },
          {
            "name": "value",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "poll",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "pollId",
            "type": "u8"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "options",
            "type": {
              "vec": {
                "defined": {
                  "name": "optionItem"
                }
              }
            }
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "endTime",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "vote",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "pollId",
            "type": "u8"
          },
          {
            "name": "optionIndex",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
