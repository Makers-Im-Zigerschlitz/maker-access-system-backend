# Show all devices

Get the details of all registered devices.

**URL** : `/device`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

For a authenticated user, the following JSON-response will be sent:

```json
[
  {
    "deviceID":0,
    "deviceName":"",
    "deviceDesc":null,
    "deviceType":0
    }
  ]
```

## Error Response

**Code** : `401 UNAUTHORIZED`
