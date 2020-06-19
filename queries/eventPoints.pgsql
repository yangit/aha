SELECT
    event. "createdAt" AS "time",
    concat_ws('.', location.name, device. "name", "deviceModel"."name", device.id) AS ddevice,
    device.id AS value
FROM
    event
    LEFT JOIN device ON event. "deviceId" = device.id
    LEFT JOIN LOCATION ON device. "locationId" = location.id
    LEFT JOIN "deviceModel" ON device. "modelId" = "deviceModel".id
WHERE
    event. "createdAt" BETWEEN '2020-06-19T02:47:24.671Z'
    AND '2020-06-19T08:47:24.671Z'
    AND device.id IN ('1', '2', '3', '4', '5', '6', '7', '8', '9')
ORDER BY
    1
