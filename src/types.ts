import type { Dayjs } from "dayjs";
export interface IUser{
    id:string,
    name:string,
    surName:string,
    password:string,
    fullName:string,
    email:string,
    birthDate?: Date | Dayjs | null | undefined,
    telephone?:string,
    employment?:string,
    userAgreement:boolean
}
export interface UserPatchDto {
  name?: string;      
  surName?: string;     
  fullName?: string;
  birthDate?:  Date | Dayjs | null | undefined;  
  telephone?: string;  
  employment?: string;
  userAgreement?: boolean;
}