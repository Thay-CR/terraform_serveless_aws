const {
    createConnection,
    getConnection,
    updateConnection,
    deleteConnection,
    buildResponse
} = require('../app')

let connectionPost = {
    email_user: "jest@jest.com",
    connections:["jest@a.com","jest@b.com"],
    pending_invitations_sent:["jest@c.com","jest@d.com"],
    pending_invitations_received:["jest@e.com","jest@f.com"]
}

let connectionThatAlreadyExists = {
    id_connection: "45e7325c-71af-438b-b67d-83de9810b77e",
    email_user: "teste3@teste3.com"
}

test('Create connection', async () => {
    let connectionCreated = await createConnection(connectionPost)
    const result = JSON.stringify(connectionCreated)
    expect(result).toMatch(/SUCCESS/)
});

test('Get all connections', async () => {
    let connections = await getConnection()
    expect(connections.body).toMatch(/connection/)
});

test('Get One connection', async () => {
    let connection = await getConnection(connectionThatAlreadyExists)
    expect(connection.body).toMatch(/connection/)
});

test('update connection', async () => {
    connectionThatAlreadyExists.updatedAt = (new Date()).toString()
    let connection = await updateConnection(connectionThatAlreadyExists)
    expect(connection.body).toBe("{\"message\":\"Connection editado com sucesso!\"}")
});

test('Delete connection', async () => {
    let connection = await deleteConnection(connectionThatAlreadyExists)
    expect(connection.body).toBe("{\"message\":\"Connection deletado com sucesso!\"}")
});


test('Building Response', async () => {
    expect(buildResponse(200, { testResult: "ok" })
        .toString()).toBe((
            {
                "body": { "testResult": "ok" },
                "headers": { "Content-Type": "application/json" },
                "statusCode": 200
            })
            .toString())
});

