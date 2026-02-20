kubectl create secret docker-registry regcred \
  --docker-server=021490341635.dkr.ecr.eu-west-1.amazonaws.com \
  --docker-username=AWS \
  --docker-password="$(aws ecr get-login-password --region eu-west-1)" \
  --namespace jobber
