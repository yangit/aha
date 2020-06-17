set -ex
mkdir -p ~/ecs/aha_prod/
cd ~/ecs/aha_prod/
docker-compose down --remove-orphans
cp /z1s/back/yan/github/aha/docker-compose.prod.yml /home/ubuntu/ecs/aha_prod/docker-compose.yml
docker-compose up -d
docker-compose logs -f zigbee2mqtt

