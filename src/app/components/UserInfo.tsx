import React from "react";
import { UserInfoType } from "../types/types";

const UserInfo = ({ type, info }: UserInfoType) => {
    return (
        <div>
            <h1 className="text-[13px] text-gf-text-base-light">{type}</h1>
            <p className="font-bold text-[22px] text-gf-text-base-bold">
                {info}
            </p>
        </div>
    );
};

export default UserInfo;
