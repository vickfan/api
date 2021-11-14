import { Request, Response } from "express";
import { TasksService } from "../service/taskService";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { CronJob } from "cron";

dotenv.config();

// nodemailer config
// creating a test account
nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: account.user,
            pass: account.pass,
        },
    });
});

// checking if the environment is production or not
let mailConfig;
if (process.env.ENV === "production") {
    mailConfig = {
        //input real email config here
    };
} else {
    mailConfig = {
        host: "smtp-ethereal.email",
        port: 587,
        auth: {
            user: "ethereal.user@ethereal.email",
            pass: "verysecret",
        },
    };
}

let transporter = nodemailer.createTransport(mailConfig);

export class TasksController {
    cronJob: CronJob;

    constructor(private taskService: TasksService) {
        this.cronJob = new CronJob("0 0 * * * ", async function () {
            try {
                let expiringTasks = await taskService.getExpiringTask();
                for (let task of expiringTasks) {
                    console.log(
                        `==================================
Task Name: ${task.name}
Task Description: ${task.description}
        
==================================
The above task has been expired
----------------------------------
                        `
                    );
                }
            } catch (e) {
                console.error(e);
            }
        });
    }

    //     getExpiringTask = async (req: Request, res: Response) => {
    //         try {
    //             let expiringTasks = await this.taskService.getExpiringTask();
    //             console.log(expiringTasks);
    //             for (let task of expiringTasks) {
    //                 console.log(
    //                     `==================================
    // Task Name: ${task.name}
    // Task Description: ${task.description}

    // ==================================
    // The above task has been expired
    // ----------------------------------
    //                     `
    //                 );
    //             }
    //         } catch (e) {
    //             console.error(e);
    //         }
    //     };

    getTasksByListId = async (req: Request, res: Response) => {
        let params = req.params.listId;
        let id = parseInt(params);
        try {
            let tasks = await this.taskService.getTasksByListId(id);
            res.status(200).json(tasks);
            return;
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "internal server error" });
            return;
        }
    };

    completeTask = async (req: Request, res: Response) => {
        let params = req.params.taskId;
        let id = parseInt(params);
        try {
            let taskCompleted: {
                id: number;
                name: string;
                deadline: null | Date;
                description: string;
            } = await this.taskService.completeTask(id);
            console.log(
                `==================================

Task Name: ${taskCompleted.name}
Task Description: ${taskCompleted.description}

==================================
The above task has been completed 
----------------------------------
                `
            );
            res.status(200).json({ success: true });
            return;
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "internal server error" });
            return;
        }
    };

    newTask = async (req: Request, res: Response) => {
        let body = req.body;
        try {
            await this.taskService.newTask(body);
            res.status(200).json({ success: true });
            return;
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "internal server error" });
            return;
        }
    };

    deleteTask = async (req: Request, res: Response) => {
        let { selectedList } = req.body;
        try {
            await this.taskService.deleteTask(selectedList);
            res.status(200).json({ success: true });
            return;
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "internal server error" });
            return;
        }
    };

    moveTasks = async (req: Request, res: Response) => {
        let { selectedList, listId } = req.body;
        try {
            await this.taskService.moveTasks(selectedList, listId);
            res.status(200).json({ success: true });
            return;
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "internal server error" });
            return;
        }
    };

    updateTask = async (req: Request, res: Response) => {
        let { name, description, deadline, is_completed } = req.body;
        let row = { name, description, deadline, is_completed };
        let taskId = req.params.taskId;
        try {
            await this.taskService.updateTask(row, parseInt(taskId));
            res.status(200).json({ success: true });
            return;
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "internal server error" });
            return;
        }
    };
}
