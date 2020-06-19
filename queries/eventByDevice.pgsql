SELECT
       TO_CHAR(AGE(now(), event."createdAt"),'HH24:MI:SS') as ago,
       concat_ws('.', location.name, device."name", "deviceModel"."name", device.id) as device,
       concat('l:',event.linkquality,' b:', event.battery) as lb,
       Coalesce(
           CASE WHEN climate.humidity is NOT NULL THEN concat('humidity: ',to_char(climate.humidity,'999'),' temperature: ', climate.temperature) ELSE NULL END,
           CASE WHEN click.click is NOT NULL THEN concat('click: ',click.click) ELSE NULL END,
           CASE WHEN occupancy.occupancy is NOT NULL THEN concat('occupancy: ',occupancy.occupancy::int) ELSE NULL END
       ) as data
FROM event
LEFT JOIN device ON event."deviceId" = device.id
LEFT JOIN location ON device."locationId" = location.id
LEFT JOIN "deviceModel" ON device."modelId" = "deviceModel".id
LEFT JOIN climate on climate."eventId" = event.id
LEFT JOIN click on click."eventId" = event.id
LEFT JOIN occupancy on occupancy."eventId" = event.id
ORDER BY event."createdAt" desc
