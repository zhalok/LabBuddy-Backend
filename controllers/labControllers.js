const Lab=require("../models/labModel");



exports.createLab=async(req,res,next)=>{
    const {type}=req.body;
    const newLab=await Lab.create({
        type,
        creator:req.user,
        users:[req.user]
    })

    res.status(200).json({
        message:"Successfully created",
        lab:newLab
    })
}

exports.joinLab=async(req,res,next)=>{
    const {labId}=req.params;
    const lab=await Lab.findById(labId);

    lab.users.push(req.user._id)

    lab.save()

    res.status(200).json({
        message:"Successfully joined",
        lab
    })

}

exports.leaveLab=async(req,res,next)=>{
    const {labId}=req.params;
    const lab=await Lab.findById(labId);

    lab.users=lab.users.filter(l=>l.user!==req.user._id)

    lab.save()

    res.status(200).json({
        message:"Successfully leave",
        lab
    })

}

exports.deleteLab=async(req,res,next)=>{
    const {labId}=req.params;
    const lab=await Lab.findById(labId);

    await lab.delete();

    res.status(200).json({
        message:"Successfully delete",
        lab
    })

}
