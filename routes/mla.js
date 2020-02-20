const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const axios = require('axios');
const Problem = require('../models/problemModel');
const router = express.Router();
const MLA = require('../models/mlaModel');
const Resident = require('../models/residentModel');
const keys = require('../PassKeys');

router.get('/home',(req,res)=>{
    res.status(200).send('Hello MLA');
})

router.post('/login',(req,res)=>{
    MLA.findOne({email: req.body.email, password: req.body.password},(err,mla)=>{
        if(err){
          //  console.log("HI1",resident);
            res.status(404).send();
        }else{
            if(!mla){
              //  console.log("HI2",resident);
                res.status(404).send();
            }else{
                //console.log("HI3",resident);
                 res.send(mla);
            }
             }
    })
})

router.get('/all',(req,res)=>{
    MLA.find({},(err,mlas)=>{
        if(err){
            console.log(err);
            res.send('Error');
        }else{
            res.send(mlas);
        }
    })
})

router.post('/register',(req,res)=>{
    //console.log(req.body);
    var newMLA = new MLA(req.body);
    MLA.create(newMLA, (err,mla)=>{
        if(err){
            console.log(err);
            res.redirect('/');
        }else{
            res.send('Success!');
        }
        
    })
})
router.get('/user/:userid',(req,res)=>{
    MLA.findById(req.params.userid,(err,mla)=>{
        if(err){
            res.status(404).send();
        }else{
            if(!mla){
                res.status(404).send();
            }else{
                 res.send(mla);
            }
             }
    })
 })



router.get('/viewproblem/:id',(req,res)=>{
    Problem.findById(req.params.id,(err,prob)=>{
        if(err){
            res.status(405).send();
        }else{
            res.send(prob);
        }
    })
})

router.post('/updateproblem/:id',(req,res)=>{
    updatedProb = req.body;
    Problem.findById(req.params.id,(err,prob)=>{
        if(err){
            res.status(405).send();
        }else{
            
            prob.problemStatus = updatedProb.problemStatus;
            prob.priority = updatedProb.priority;
            prob.save();
            console.log('Updated Problem')
            res.status(201).send(prob);

        }
    })
})

router.post('/updatefund/:mlaid',(req,res)=>{
    newFund = req.body;
    MLA.findById(req.params.mlaid,(err,mla)=>{
        if(err){
            console.log(err);
        }else{
            mla.fund = newFund;
            // mla.fund.education = newFund;
            // mla.fund.infrastructure = newFund;
            // mla.fund.healthcare = newFund;
            // mla.fund.tourism = newFund;
            // mla.fund.miscellaneous = newFund;
            // mla.fund.remaining = newFund;
            mla.save();
            res.status(202).send(mla);
            console.log('Funds Updated');
        }
    })
})

router.get('/viewfund/:mlaid',(req,res)=>{
    MLA.findById(req.params.mlaid,(err,mla)=>{
        if(err){
            console.log(err);
            res.status(404).send();
        }else{
         //   console.log(mla.fund);
            res.status(200).send(mla.fund);
            console.log('Funds Sent');
        }
    })
})


router.get('/viewproblems/:mlaid',(req,res)=>{
    
  //  var allprobs = [];
    MLA.findById(req.params.mlaid,(err,mla)=>{
        if(err){
            console.log(err);
            res.status(501).send();
        }else{
            //console.log(resident.problems[0]);
           // console.log(mla.constituency);

            Problem.find({ 'constituency' : mla.constituency },(err,probs)=>{
                if(err){
                    console.log(err);
                }else{
                    res.send(probs);
                }
            })
            

        }
    })
})

router.get('/viewproblem/forward/:id',(req,res)=>{
    var emails = '';
    Problem.findById(req.params.id,(err,prob)=>{
        if(err){
            res.status(405).send();
        }else{
            
            MLA.findOne({'constituency' : prob.constituency},(err,mla)=>{
                if(err){
                    console.log(err);
                }else{
                    emails = mla.email;
                    Resident.find({'constituency': mla.constituency},(err,residents)=>{
                        residents.forEach(resident => {
                            emails+= (', '+resident.email);
                        })

                       // console.log(emails);
                        
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                              user: keys.mailid,
                              pass: keys.mailpd
                            }
                          });
                          
                          var mailOptions = {
                            from: 'noreply.cmsystem@gmail.com',
                            to: emails,
                            subject: 'Problem Forwarded',
                            html: `<h2>Problem forwarded to the respective department by the MLA.</h2><h3>Problem Description</h3><p><b>Title</b>: ${prob.title}</p><p><b>Constituency</b>: ${prob.constituency}</p><p><b>Department</b>: ${prob.department}</p><p><b>Description</b>: ${prob.description}</p>`
                          };
                          
                          transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                              console.log(error);
                            } else {
                              console.log('Email sent to all the residents');
                            }
                          });
                        
                          var transporterdept = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                              user: keys.mailid,
                              pass: keys.mailpd
                            }
                          });
                          
                          var mailOptions = {
                            from: 'noreply.cmsystem@gmail.com',
                            to: 'rasoso9638@cmailing.com',
                            subject: 'Problem Forwarded',
                            html: `<h3>Problem Description for the respective department.</h3><p><b>Title</b>: ${prob.title}</p><p><b>Constituency</b>: ${prob.constituency}</p><p><b>Department</b>: ${prob.department}</p><p><b>Description</b>: ${prob.description}</p>`
                          };
                          
                          transporterdept.sendMail(mailOptions, function(error, info){
                            if (error) {
                              console.log(error);
                            } else {
                              console.log('Email sent to the department');
                              prob.problemStatus = 'Forwarded to department';
                              prob.save();
                              res.status(200).send(prob);
                            }
                          });



                    })
                }
            })

        }
    })
})



module.exports = router;