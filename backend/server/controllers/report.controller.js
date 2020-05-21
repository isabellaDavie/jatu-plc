const ReportServices = require('../services/report.services');

class ReportController{

    async create(req,res){
        try {
            const report = await ReportServices.create(req.body)
            res.status(201).json({
                message:"Report request was successfully created.",
                report
            })
        } catch (error) {
            res.json({
                message:"Report request was not created. Something went wrong.",
                error
            })
        }
    }

    async getAllReports(req, res){
         try {
             const reports = await ReportServices.get()
             res.json({
                 message:"Successfully fetched all reports",
                 reports
             })
         } catch (error) {
             res.json({
                 message:"Failed to fetch all reports.",
                 error
             })
         }
    }

    async getOneReport(req, res){
        try {
            const report = await ReportServices.get(req.params.reportID)
            res.json({
                message:"Successfully fetched report",
                report
            })
        } catch (error) {
            res.json({
                message:"Failed to fetch  report.",
                error
            })
        }
    }

    async update(req, res){
        try {
            const report = await ReportServices.update(req.params.reportID, req.body)
            res.json({
                message:"Successfully updated report",
                report
            })
        } catch (error) {
            res.json({
                message:"Failed to update  report.",
                error
            })
        }
    }

    async delete(req, res){
        try {
            const report = await ReportServices.delete(req.params.reportID)
            res.json({
                message:"Successfully deleted report",
                report
            })
        } catch (error) {
            res.json({
                message:"Failed to delete  report.",
                error
            })
        }
    }

    async addComment(req, res){
        try {
            const report = await ReportServices.addComment(req.params.reportID, req.body)
            res.json({
                message:"Successfully added comment on report",
                report
            })
        } catch (error) {
            res.json({
                message:"Failed to add comment report.",
                error
            })
        }
    }

    async removeComment(req, res){
        try {
            const report = await ReportServices.removeComment(req.params.reportID, req.body)
            res.json({
                message:"Successfully deleted comment from report",
                report
            })
        } catch (error) {
            res.json({
                message:"Failed to delete comment report.",
                error
            })
        }
    }




}


module.exports = new ReportController()