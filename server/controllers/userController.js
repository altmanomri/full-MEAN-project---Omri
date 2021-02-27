const {response} = require('express');
const express = require('express');
const appRouter = express.Router();

const userBL = require('../BL/usersBL');

appRouter.route('/')
    .get(async function(req,resp)
    {
        let users = await userBL.getAllUsers()
        
        return resp.json(users);
    });

appRouter.route('/:id')
    .get(async function(req,resp)
    {
        let id = req.params.id;
        let user = await userBL.getUser(id);
        return resp.json(user);
    });

appRouter.route('/')
    .post(async function(req,resp)
    {
        let obj = req.body;

        let result = await userBL.addUser(obj);
        return resp.json(result);
    });

appRouter.route('/:id')
    .put(async function(req,resp)
    {
        let obj = req.body;
        let id = req.params.id;

        let result = await userBL.updateUser(id,obj);
        return resp.json(result);
    });

appRouter.route('/:id')
    .delete(async function(req,resp)
    {
        let id = req.params.id;

        let result = await userBL.deleteUser(id);
        return resp.json(result);
    })



module.exports = appRouter;
