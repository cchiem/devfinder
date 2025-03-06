import Image from "next/image";
import React from "react";

const UserInfo = ({ type, detail }: any) => {
    return (
        <div className="flex gap-4 items-center text-[15px]">
            <Image
                src={`/images/icon-${type}.svg`}
                alt="location.svg"
                width={20}
                height={20}
            />
            {type == "website" ? (
                <a href={detail} target="_blank">
                    {detail}
                </a>
            ) : (
                <p>{detail || "Not Avaliable"}</p>
            )}
        </div>
    );
};

export default UserInfo;
