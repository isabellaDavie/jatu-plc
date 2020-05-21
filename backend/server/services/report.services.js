const ReportModel = require('../models/report.model')


class ReportServices{


    async create(data){
        const report = await ReportModel.create(data)
        if (!report) throw 'Failed to create a new report.'
        return report
    }

    async get(reportID){
        if(reportID){
            const report  = await ReportModel.findById(reportID).populate({
                path:'reporter',
                select: 'name.first name.middle name.last fullname  email role'
            }).populate({
                path:'comments.commentor',
                select: 'name.first name.middle name.last fullname  email role'
            })
            if(!report) throw 'The report does not exist.'
            return report
        }else{
            const reports = await ReportModel.find()
            return reports
        }
    }

    async update(reportID, data){
        console.log('data :', data);
        const report = await ReportModel.findByIdAndUpdate({ _id: reportID}, data, { new:true})
        if(!report) throw `The report you are trying to update does not exist.`
        return report
    }

    async delete(reportID){
        const report = await ReportModel.findByIdAndDelete(reportID)
        if(!report) throw `The report you are trying to delete does not exist.`
        return report
    }

    async addComment(reportID, comment){
        console.log('comment :>> ', comment);
        let report = await await ReportModel.findById(reportID)
        if(!report) throw 'The report does not exist.'
        report.comments.push(comment)
        return await report.save()
    }

    async removeComment(reportID, comment){
        let report = await await ReportModel.findById(reportID)
        if(!report) throw 'The report does not exist.'
        report.comments.pull(comment)
        return await report.save()
    }
}

// Export an instance of the service class
module.exports= new ReportServices()