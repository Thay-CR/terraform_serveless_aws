const AWS = require('aws-sdk')
AWS.config.update({
  region: '<region>',
  endpoint: "http://dynamodb.<region>.amazonaws.com",
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY
})
const dynamodb = new AWS.DynamoDB.DocumentClient()
const { v4: uuidv4 } = require('uuid');
const validator = require('validator')
const connectionsTable = 'connections-friends'
const connections = '/connections-friends'


exports.handler = async (event) => {
  let response;
  switch (true) {
    case event.httpMethod === 'GET' && event.path === connections:
      response = await getConnection(event?.queryStringParameters)
      break;
    case event.httpMethod === 'POST' && event.path === connections:
      response = await createConnection(JSON.parse(event.body));
      break;
    case event.httpMethod === 'PUT' && event.path === connections:
      response = await updateConnection(JSON.parse(event.body));
      break;
    case event.httpMethod === 'DELETE' && event.path === connections:
      response = await deleteConnection(event?.queryStringParameters);
      break;
    default:
      response = {
        statusCode: 404,
        body: "not found"
      }
      break;
  }
  return response
}

async function createConnection(requestBody) {

  requestBody.id_connection = uuidv4()
  requestBody.updatedAt = (new Date()).toString()

  const params = {
    TableName: connectionsTable,
    Item: requestBody
  }

  return await dynamodb.put(params).promise().then(() => {
    const body = {
      Operation: 'SAVE',
      Message: 'SUCCESS',
      Item: requestBody
    }
    return buildResponse(201, body);
  }, (error) => {
    console.error('Erro ao incluir connection', error);
  })
}

async function getConnection(payload) {
  let body = {}
  if (payload?.id_connection && payload?.email_user) {
    body.id_connection = payload?.id_connection,
      body.email_user = payload?.email_user

    const params = {
      TableName: connectionsTable,
      Key: body
    }
    return await dynamodb.get(params).promise().then(response => {
      return buildResponse(200, response);
    }, error => {
      console.error("Error", error)
    })

  } else {
    const params = {
      TableName: connectionsTable,
      Key: {
      }
    }
    return await dynamodb.scan(params).promise().then(response => {
      return buildResponse(200, response.Items);
    }, error => {
      console.error("Error", error)
    })
  }


}

async function updateConnection(payload) {

  const params = {
    TableName: connectionsTable,
    Item: payload
  }

  return await dynamodb.put(params).promise().then(response => {
    return buildResponse(200, { message: "Connection editado com sucesso!" });
  }, error => {
    console.error("Error", error)
    return buildResponse(400, "Não foi possível editar connection");
  })
}

async function deleteConnection(payload) {
  let body = {}

  if (payload?.id_connection && payload?.email_user) {
    body.id_connection = payload?.id_connection,
      body.email_user = payload?.email_user

    const params = {
      TableName: connectionsTable,
      Key: body
    }
    return await dynamodb.delete(params).promise().then(response => {
      return buildResponse(200, { message: "Connection deletado com sucesso!" });
    }, error => {
      console.error("Error", error)
      return buildResponse(404, { message: "Connection não encontrado" });
    })
  } else {
    return buildResponse(400, "Item not deleted");
  }
}

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
}

//Usado somente para testes
// module.exports = {
//   createConnection,
//   getConnection,
//   updateConnection,
//   deleteConnection,
//   buildResponse
// }