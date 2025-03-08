import React from "react";
import { UserInfoType } from "../types/types";

const UserInfo = ({ type, info }: UserInfoType) => {
    return (
        <div className="text-center sm:text-left flex flex-col gap-1">
            <p className="text-[11px] sm:text-[13px] text-gf-text-base-light text-center">
                {type}
            </p>
            <p className="font-bold text-[16px] sm:text-[22px]  text-gf-text-base-bold">
                {info}
            </p>
        </div>
    );
};

export default UserInfo;
