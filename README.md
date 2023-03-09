
Mude ``<account_id>`` e ``<region>`` para seus dados de conta

********************************************************************
              PARA CRIAR A INFRAESTRUTURA
********************************************************************
## 1- Criar tabela DYNAMO via terraform
Entrar na pasta DYNAMO : cd .\DYNAMO\
* `terraform init`
* `terraform apply`

## 2- Criar ECR via terraform
Entrar na pasta ECR : cd .\ECR\
* `terraform init`
* `terraform apply`

## 3-Entrar no repositório
com o Docker ligado
cd .\repository-image\app\
* `npm i`
* `npm run aws-login`
* `npm run build`
* `npm run push`

## 4- gerar lambda linkada a imagem-ECR e APIP-gatway via terraform
cd .\SERVELESS\
* `terraform init`
* `terraform apply`

********************************************************************
           PARA UPDATES DE CONTAINER OU LAMBDA
********************************************************************

## 1-Entrar no repositório
com o Docker ligado
cd .\repository-image\app\

* `npm run delete`  > para deletar imagem anterior
* `npm run build`
* `npm run push`

## 2- gerar lambda linkada a imagem-ECR e API-gatway via terraform
cd .\SERVELESS\
* `terraform destroy`
* `terraform apply`
