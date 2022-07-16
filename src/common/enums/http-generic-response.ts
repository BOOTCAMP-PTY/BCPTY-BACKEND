import { Response } from "express";
import { ResponseCode, ResponseName } from "../constants/response.constant";

export interface  HTTP_SUCCESS extends Response  {
  [ResponseName.SUCCESS]?: ResponseCode.SUCCESS_CODE
  }