import { Query } from "express-serve-static-core";

interface TypedRequestQuery<T extends Query> extends Express.Request {
    query: T;
}

interface TypedRequestBody<T> extends Express.Request {
    body: T;
}

interface FolderListRequest extends Query {
    paths?: string
}