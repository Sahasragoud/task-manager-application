
export type Report = {
    id ?:number;
    title : string;
    description : string;
    user : string;
    phone : string;
    status : "Open" | "In_Review" | "Resolved";
    createdAt : Date;
}