"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { UserDataType } from "../types/types";
import { formatDate } from "../utils/utils";
import UserDetails from "../components/UserDetails";
import UserInfo from "../components/UserInfo";

const GitHubFinder = () => {
    const [username, setUsername] = useState("cchiem");
    const [userData, setUserData] = useState<UserDataType>();
    const [loading, setLoading] = useState(false);
    const [found, setFound] = useState(true);
    const [theme, setTheme] = useState("light");
    const fetchUser = async (username: string) => {
        setLoading(true);
        try {
            const res = await fetch(
                `https://api.github.com/users/${username.trim()}`
            );
            if (!res.ok) {
                throw new Error("User not found");
            }
            const result = await res.json();
            setUserData(result);
            console.log(result);
            setFound(true);
        } catch (error) {
            setFound(false);
            setTimeout(() => {
                setFound(true);
            }, 5000);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchUser(username);
    };

    useEffect(() => {
        fetchUser(username);
    }, []);

    return (
        <div
            className="flex md:items-center justify-center h-dvh w-dvw bg-gf-bg-secondary pt-10"
            data-theme={theme}
        >
            <div className="flex flex-col gap-6 max-sm:p-8 max-md:w-[573px] w-[730px] ">
                <div className="font-bold flex items-center justify-between">
                    <h1 className="text-[26px] text-gf-text-base-bold lowercase">
                        devfinder
                    </h1>
                    <button
                        className="text-[13px] text-gf-text-base-light tracking-[2.5px] flex items-center gap-4 hover:cursor-pointer uppercase"
                        onClick={() => {
                            theme === "light"
                                ? setTheme("dark")
                                : setTheme("light");
                        }}
                    >
                        {theme === "light" ? "dark" : "light"}
                        <Image
                            src={`/images/icon-${
                                theme === "light" ? "moon" : "sun"
                            }.svg`}
                            alt=""
                            width={20}
                            height={20}
                        />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="rounded-[15px] p-2 shadow-lg flex items-center justify-between bg-gf-bg-primary">
                        <div className="flex items-center justify-between w-full md:px-6 px-2">
                            <div className="flex items-center w-full justify-between">
                                <div className="w-[24px] h-[24px] mr-2 md:mr-4">
                                    <Image
                                        src="/images/icon-search.svg"
                                        alt="Search Icon"
                                        width={24}
                                        height={24}
                                        className="object-cover"
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search Github username..."
                                    className="focus:outline-none leading-[25px] text-[13px] md:text-[18px] w-full text-gf-text-base-primary"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>
                            {!found && (
                                <div>
                                    <p className="text-[#F74646] ml-4 font-bold w-[100px] text-[13px] sm:text-[15px]">
                                        No results
                                    </p>
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="py-3 px-4 bg-gf-color-primary rounded-[10px] text-white text-[14px] md:text-[16px] font-bold hover:cursor-pointer hover:bg-[#60ABFF]"
                        >
                            Search
                        </button>
                    </div>
                </form>
                <div className="bg-gf-bg-primary p-6 md:p-8 rounded-[15px] shadow-lg">
                    {userData ? (
                        <div className="flex justify-center gap-8">
                            <div className="w-[150px] h-[150px] max-md:hidden">
                                <Image
                                    className="rounded-full shadow-lg"
                                    src={userData.avatar_url}
                                    alt="User Avatar"
                                    width={150}
                                    height={150}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-6 md:gap-4">
                                <div className="flex justify-between">
                                    <div className="flex w-full md:justify-between items-center">
                                        <div className="w-[70px] h-[70px] sm:w-[117px] sm:h-[117px] md:hidden overflow-hidden">
                                            <Image
                                                className="rounded-full shadow-lg object-cover"
                                                src={userData.avatar_url}
                                                alt="User Avatar"
                                                width={117} // Adjusted for consistency
                                                height={117} // Adjusted for consistency
                                            />
                                        </div>

                                        <div className="max-sm:ml-4 max-md:ml-8">
                                            <h1 className="font-bold text-[16px] sm:text-[26px] text-gf-text-base-bold">
                                                {userData.name}
                                            </h1>
                                            <p className="text-gf-color-primary text-[13px] sm:text-[16px]">
                                                @{userData.login}
                                            </p>
                                            <p className="text-[13px] sm:text-[15px] mt-2 text-gf-text-base-light md:hidden">
                                                Joined&nbsp;
                                                {formatDate(
                                                    userData.created_at
                                                )}
                                            </p>
                                        </div>
                                        <p className="text-[15px] text-gf-text-base-light md:pt-2 max-md:hidden">
                                            Joined&nbsp;
                                            {formatDate(userData.created_at)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-8">
                                    <p className="text-gf-text-base-light leading-[25px] text-[13px] md:text-[15px]">
                                        {userData.bio ||
                                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros."}
                                    </p>
                                    <div className="px-4 py-6 sm:px-8 sm:py-4 bg-gf-bg-secondary rounded-[10px] grid grid-cols-3 sm:flex sm:justify-between ">
                                        <UserInfo
                                            type="Repo"
                                            info={userData.public_repos}
                                        />
                                        <UserInfo
                                            type="Followers"
                                            info={userData.followers}
                                        />
                                        <UserInfo
                                            type="Following"
                                            info={userData.following}
                                        />
                                    </div>
                                </div>
                                <div className="sm:grid sm:grid-cols-2 flex flex-col gap-4 text-gf-text-base-primary mt-6 text-[13px] md:text-[15px]">
                                    <UserDetails
                                        type="location"
                                        detail={userData.location}
                                    />
                                    <UserDetails
                                        type="twitter"
                                        detail={userData.twitter_username}
                                    />
                                    <UserDetails
                                        type="website"
                                        detail={userData.blog}
                                    />
                                    <UserDetails
                                        type="company"
                                        detail={userData.company}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default GitHubFinder;
