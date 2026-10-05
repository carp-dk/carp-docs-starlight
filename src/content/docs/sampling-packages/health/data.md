---
title: "Health: collected data"
description: "Apple Health and Google Health Connect data."
sidebar:
  label: Collected data
  order: 3
---

The data collected is contained in a [`HealthData`](https://pub.dev/documentation/carp_health_package/latest/health_package/HealthData-class.html) object, which wraps the data collected from a [`HealthDataPoint`](https://pub.dev/documentation/health/latest/health/HealthDataPoint-class.html). For example, "BASAL_ENERGY_BURNED" collected from Apple Health serialized to JSON may looks like this:

```json
{
  "sensorStartTime": 1769431186373000,
  "sensorEndTime": 1769432063152000,
  "data": {
    "__type": "dk.cachet.carp.health",
    "uuid": "236c6441-be81-4231-8cb2-25f9483b4967",
    "value": {
      "__type": "NumericHealthValue",
      "numericValue": 17.770999999999997
    },
    "unit": "KILOCALORIE",
    "dateFrom": "2026-01-26T12:39:46.373Z",
    "dateTo": "2026-01-26T12:54:23.152Z",
    "healthDataType": "BASAL_ENERGY_BURNED",
    "platform": "APPLE_HEALTH",
    "deviceId": "unknown",
    "sourceId": "com.apple.health.4B76DB4C-F19C-4D05-8766-FC7EC4DEF393",
    "sourceName": "Jakob’s Apple Watch"
  }
}
```

Similarly, "STEPS" collected from Google Health Connect would look like this.

```json
{
  "sensorStartTime": 1704582000000000,
  "sensorEndTime": 1704668399999000,
  "data": {
   "__type": "dk.cachet.carp.health",
   "uuid": "85328732-41d3-53b2-a81e-007f33bee353",
   "value": {
    "numericValue": "1982"
   },
   "unit": "COUNT",
   "dateFrom": "2024-01-06T23:00:00.000Z",
   "dateTo": "2024-01-07T22:59:59.999Z",
   "healthDataType": "STEPS",
   "platform": "GOOGLE_HEALTH_CONNECT",
   "deviceId": "SP1A.210812.016",
   "sourceId": "",
   "sourceName": "com.sec.android.app.shealth"
  }
}
```

:::note
The type of the collected health data is the `healthDataType` which is always the uppercase version of the [`HealthDataType`](https://pub.dev/documentation/health/latest/health/HealthDataType.html) collected.
:::
