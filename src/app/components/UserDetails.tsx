import Image from "next/image";
import React from "react";
import { UserDetailType } from "../types/types";

const UserInfo = ({ type, detail }: UserDetailType) => {
    return (
        <div
            className={`flex gap-4 items-center ${
                !detail ? "opacity-60 select-none" : ""
            }`}
        >
            <Image
                src={`/images/icon-${type}.svg`}
                alt={`${type} icon`}
                width={20}
                height={20}
            />
            {type === "website" ? (
                <a
                    href={detail}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                >
                    {detail ? detail : "Not Avaliable"}
                </a>
            ) : (
                <p>{detail ? detail : "Not Avaliable"}</p>
            )}
        </div>
    );
};

export default UserInfo;
