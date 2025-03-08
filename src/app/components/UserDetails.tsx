import Image from "next/image";
import React from "react";
import { UserDetailType } from "../types/types";

const UserInfo = ({ type, detail }: UserDetailType) => {
    return (
        <div className="flex gap-4 items-center">
            <Image
                src={`/images/icon-${type}.svg`}
                alt="location.svg"
                width={20}
                height={20}
            />
            {type == "website" ? (
                <a href={detail} target="_blank" className="hover:underline">
                    {detail}
                </a>
            ) : (
                <p>{detail || "Not Avaliable"}</p>
            )}
        </div>
    );
};

export default UserInfo;
