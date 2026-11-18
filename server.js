import express from 'express'

import "dotenv/config";
import { PrismaClient } from "@prisma/client"; /*importar o prisma client, que é o cliente do banco de dados */

const prisma = new PrismaClient(); /*criar uma instância do prisma client, que é o cliente do banco de dados */

export { prisma };

const app = express() /*criar uma aplicação express */
app.use(express.json())


app.post('/usuarios', async (req, res) => { /*criar um usuário, async é por ser assíncrono */

    await prisma.user.create({ /*criar um usuário no banco de dados, await é para esperar a resposta */
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })


    res.status(201).json(req.body)
})


app.get('/usuarios', async (req, res) => { /*Listar todos os usuários */
    let users = [] /*criar uma variável para armazenar os usuários */

    if (req.query.name || req.query.email || req.query.age) {
        users = await prisma.user.findMany({ /*listar todos os usuários no banco de dados */
            where: {
                name: req.query.name, /*filtrar os usuários pelo nome, regex é uma expressão regular */
                email: req.query.email, /*filtrar os usuários pelo email, regex é uma expressão regular */
                age: req.query.age /*filtrar os usuários pela idade, gte é maior ou igual */
            }    
        })
    } else {
        users = await prisma.user.findMany() /*listar todos os usuários no banco de dados */
    }
    
    res.status(200).json(users)
})


app.put('/usuarios/:id', async (req, res) => { /*editar um usuário, async é por ser assíncrono */

    await prisma.user.update({ /*editar um usuário no banco de dados, await é para esperar a resposta */
        where: {
            id:req.params.id
        },

        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})


app.delete('/usuarios/:id', async (req, res) => { /*deletar um usuário, async é por ser assíncrono */

    await prisma.user.delete({ /*deletar um usuário no banco de dados, await é para esperar a resposta */
        where: {
            id:req.params.id
        }
    })

    res.status(200).json({ message: "Usuário deletado com sucesso" })
})

app.listen(3000)


/*
    Criar nossa API de Usuários

    -Criar um usuário
    - Listar todos os usuários

    -Editar um usuário
    -Deletar um usuário
*/