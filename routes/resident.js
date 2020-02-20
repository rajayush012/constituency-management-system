const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
const Problem = require('../models/problemModel');
const router = express.Router();
const Resident = require('../models/residentModel');
const MLA = require('../models/mlaModel');

router.get('/home',(req,res)=>{
    res.status(200).send('Hello resident');
})

router.post('/login',(req,res)=>{
    Resident.findOne({email: req.body.email, password: req.body.password},(err,resident)=>{
        if(err){
          //  console.log("HI1",resident);
            res.status(404).send();
        }else{
            if(!resident){
             // console.log("HI2",resident);
                res.status(404).send();
            }else{
               // console.log("HI3",resident);
                 res.send(resident);
            }
             }
    })
})

router.get('/all',(req,res)=>{
    Resident.find({},(err,residents)=>{
        if(err){
            console.log(err);
            res.send('Error');
        }else{
            res.send(residents);
        }
    })
})

router.post('/register',(req,res)=>{
    var newResident = new Resident(req.body);
    Resident.create(newResident, (err,resident)=>{
        if(err){
            console.log(err);
            res.redirect('/');
        }else{
            res.send('Success!');
        }
        
    })
})
router.get('/user/:userid',(req,res)=>{
    Resident.findById(req.params.userid,(err,resident)=>{
        if(err){
            res.status(404).send();
        }else{
            if(!resident){
                res.status(404).send();
            }else{
                 res.send(resident);
            }
             }
    })
 })

router.post('/submitproblem/:userid',(req,res)=>{
    var newProblem = req.body;

    Resident.findById(req.params.userid,(err,resident)=>{
        if(err){
            res.status(501).send();
            console.log('Invalid User');
        }else{
            
            Problem.create(newProblem,(err,prob)=>{
                if(err){
                    res.status(501).send();
                    console.log('Problem Not Created');
                }else{
                    resident.problems.push(prob._id);
                    resident.save();
                    res.send(prob);
                    console.log('Success');
                }
            })

        }
    })

   
     
})

router.get('/problem/delete/:id',(req,res)=>{
    Problem.findByIdAndDelete(req.params.id,(err,del)=>{
        if(err){
            console.log(err)
        }else{
            res.send(del);
        }
    })
})

router.get('/problem/:id',cors(),(req,res)=>{
    Problem.findById(req.params.id,(err,prob)=>{
        if(err){
            res.status(405).send();
        }else{
            res.send(prob);
        }
    })
})

router.get('/viewproblems/:userid',(req,res)=>{
    
  //  var allprobs = [];
    Resident.findById(req.params.userid,(err,resident)=>{
        if(err){
            console.log(err);
            res.status(501).send();
        }else{
            //console.log(resident.problems[0]);
            
            const control = async () =>{
                probs = []
                
                for(let i = 0;i<resident.problems.length;i++){
                   // console.log(resident.problems[i]._id);
                    let response = await axios.get(`http://localhost:2000/resident/problem/${resident.problems[i]._id}`)
                    probs.push(response.data);
                  //  console.log(response.data);
                }
                return probs;
            }
            
            Promise.resolve(control()).then((pro)=>{
                //console.log(pro)
                res.send(pro)
            }).catch(err=>{
                console.log(err);
            });
            

        }
    })
})

router.get('/viewfund/:id',(req,res)=>{
    Resident.findById(req.params.id,(err,resident)=>{
        if(err){
            console.log(err);
            res.status(404).send();
        }else{
            MLA.findOne({'constituency' : resident.constituency},(err,mla)=>{
                if(err){
                    console.log(err);
                    res.status(404).send();
                }else{
                    res.send(mla.fund);
                }
            })
        }
    })
})


module.exports = router;