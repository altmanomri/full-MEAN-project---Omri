const express = require('express');
const user = require('../models/userModel');

exports.getAllUsers = function()
{
    return new Promise((resolve,reject) =>
    {
        user.find({}, function(err, userData)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(userData)
            }
        })
    })
}
exports.getUser = function(id)
{
    return new Promise((resolve,reject) =>
    {
        user.findById(id, function(err,userData)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(userData);
            }
        })
    })
}
exports.addUser = function(use)
{
    return new Promise((resolve,reject) =>
    {
        let newUser = new user({
            name : use.name,
            email : use.email,
            street : use.street,
            city : use.city,
            zipcode : use.zipcode,
            tasks : use.tasks,
            posts : use.posts
        })
        newUser.save(function(err)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve('User Created !');
            }
        })
    })
}
exports.updateUser = function(id,updatedData)
{
    return new Promise((resolve,reject) =>
    {
        user.findByIdAndUpdate(id,
            {
                name : updatedData.name,
                email : updatedData.email,
                street : updatedData.street,
                city : updatedData.city,
                zipcode : updatedData.zipcode,
                tasks :  updatedData.tasks,
                posts : updatedData.posts
                
            }, function(err)
            {
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve(' User Updated !')
                }
            })
           
    })
    
}

exports.deleteUser = function(id)
{
    return new Promise((resolve,reject) =>
    {
        user.findByIdAndDelete(id,function(err)
            {
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve('User Deleted !')
                }
            })
    })
}


