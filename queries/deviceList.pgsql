SELECT
    device.id AS __value,
    concat_ws('.', location.name, device. "name", "deviceModel"."name", device.id) AS __text
FROM
    device
    LEFT JOIN LOCATION ON device. "locationId" = location.id
    LEFT JOIN "deviceModel" ON device. "modelId" = "deviceModel".id
ORDER BY
    device.id
