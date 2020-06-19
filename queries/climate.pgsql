SELECT climate.humidity,
       event.linkquality,
       concat_ws( '.', location.name, device."name", "deviceModel"."name" )
from climate
LEFT JOIN event ON (climate."eventId" = event.id)
LEFT JOIN device ON event."deviceId" = device.id
LEFT JOIN location ON device."locationId" = location.id
LEFT JOIN "deviceModel" ON device."modelId" = "deviceModel".id