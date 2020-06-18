
SELECT click.click,
       device.id,
       concat_ws('.', location.name, device."name", "deviceModel"."name"),
       event."createdAt",
from click
LEFT JOIN event ON (click."eventId" = event.id)
LEFT JOIN device ON event."deviceId" = device.id
LEFT JOIN location ON device."locationId" = location.id
LEFT JOIN "deviceModel" ON device."modelId" = "deviceModel".id