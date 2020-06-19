SELECT distinct on (device.id) TO_CHAR(AGE(now(), MAX(event."createdAt")),'HH24:MI:SS') as ago,
                   concat_ws('.', location.name, device."name", "deviceModel"."name",device.id) as device,
                   device.type,
                   device."ieeeAddr",
                   device."modelId"
FROM device
LEFT JOIN location ON device."locationId" = location.id
LEFT JOIN "deviceModel" ON device."modelId" = "deviceModel".id
LEFT JOIN event ON device.id =event."deviceId"
GROUP By device.id,
         location.name,
         "deviceModel".name