# Show all devices

Get the details of all registered devices.

**URL** : `/members`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : Basic informations: NO / All informations: > 1

## Success Response

**Code** : `200 OK`

**Content examples**

The response is dependent from the userlevel of the current logged in user. Users with a higher level than 1 are allowed to see all informations.

```json
[
  {
      "Firstname": null,
      "Lastname": null,
      "Mail": ""
  },
  ...
  ]
```

## Error Response

**Code** : `401 UNAUTHORIZED`
