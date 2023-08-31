import { Request, Response } from "express";
import fs from "fs";
import { FolderListRequest, TypedRequestQuery } from "../global";

export async function folderList(req: TypedRequestQuery<FolderListRequest>, res: Response) {
    
    var currentPath = process.cwd();
    var publicPath = currentPath + process.env.FOLDER_PATH || '/public'

    if (req.query.paths) {
        publicPath += `/${req.query.paths}`;
    }

    var folderList = fs.readdirSync(publicPath);

    res.json(folderList)
}