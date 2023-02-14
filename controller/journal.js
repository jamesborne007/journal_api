//crud

const Jobs = require('../model/job')

const getJournals = async (req, res) => {
   // res.send('get all journals')
   try{
    const jobs = await Jobs.find({createdby: req.user.userId})
    res.status(200).json({success: true, noOfJobs: jobs.length, jobs})
    }catch(error){
        console.log(error);
        res.json(error);
    }
};

const getJournal = async (req, res) => {
    //res.send('get a Journal')
    const { user :{userId},params: {jobId},} = req;
    try{
        const job = await Jobs.findOne({createdby: userId, _id:jobId});
        if (!job){
            return res.status(404).json({success: false, message:`Job with the ${jobId} not found`})
        }res.status(200).json({ job });

    }catch(error){

    }
};

const createJournal = async(req,res) => {
    //res.send('create Journal')
    const {company, position } = req.body
    req.body.createdby = req.user.userId
    if (!company || !position ){
        return res.status(400).json({success: false, message:'please provide necessary information'})
    }
    try{
        const job = await Jobs.create(req.body);
        res.status(200).json({success: true, data: job,})
    }catch(error){
        console.log(error)
        res.json({error})

    }

};

const updateJournal = async(req,res) => {
    //res.send('update Journal')
    const{params:{journalId},user:{userId},} = req
    try{
        const job = await Jobs.findOneAndUpdate({createdby: userId, Id: journalId},req.body,{
            new: true,
            runValidators: true,
        });
        res.status(200).json({success:true, job,})
    }catch(err){
        console.log(err)
        res.json({err})
    }
    
};

const deleteJournal = async(req,res) => {
   // res.send('delete Journals')
   const{params:{journalId},user:{userId},} = req
   try{
       const job = await Jobs.findOneAndDelete({createdby: userId, Id: journalId});
       res.status(200).json({success:true, message:"deleted",job})
   }catch(err){
       console.log(err)
       res.json({err})
   }
   
};


module.exports = {getJournals, getJournal, createJournal, updateJournal, deleteJournal}
