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
            const res = await fetch(`https://api.github.com/users/${username}`);
            if (!res.ok) {
                throw new Error("User not found");
            }
            const result = await res.json();
            setUserData(result);
            console.log(result);
            setFound(true);
        } catch (error) {
            setFound(false);
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
            className="flex items-center justify-center h-dvh w-dvw bg-gf-bg-secondary"
            data-theme={theme}
        >
            <div className="w-[730px] flex flex-col gap-6">
                <div className="font-bold flex items-center justify-between">
                    <h1 className="text-[26px] text-gf-text-base-bold">
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
                            src="/images/icon-moon.svg"
                            alt=""
                            width={20}
                            height={20}
                        />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="rounded-[15px] p-3 shadow-lg flex items-center justify-between bg-gf-bg-primary">
                        <div className="flex items-center justify-between w-full px-6">
                            <div className="flex items-center">
                                <Image
                                    src="/images/icon-search.svg"
                                    alt="Search Icon"
                                    width={20}
                                    height={20}
                                    className=""
                                />
                                <input
                                    type="text"
                                    placeholder="Search Github username..."
                                    className="focus:outline-none font-[18px] ml-4 w-[300px] text-gf-text-base-primary"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>
                            {!found && (
                                <div>
                                    <p className="text-[#F74646] font-bold">
                                        No results
                                    </p>
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="py-3 px-4 bg-gf-color-primary rounded-[10px] text-white text-[16px]/[24px] font-bold hover:cursor-pointer"
                        >
                            Search
                        </button>
                    </div>
                </form>
                <div className="bg-gf-bg-primary p-8 rounded-[15px] shadow-lg">
                    {userData ? (
                        <div className="flex justify-center gap-8">
                            <div className="w-[150px] h-[150px]">
                                <Image
                                    className="rounded-full"
                                    src={userData.avatar_url}
                                    alt="User Avatar"
                                    width={150}
                                    height={150}
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAAoHBwkICQoLDRwUGBwXGBAaGBwYHCAgJCAgMCgoLCgoeHBQhJSkqJSAgJS0jJSkfJkK6s9YZM0FYzAc7mLxER34Lz5GrNfpd1HVkMjMyOzJh5mtkg6MQPxEjcfk5wAAAAD/2wBDAQ0NDR4eJ0UbHxZXI0k7XFE1dsoZGQUuQkF9MPzyvnIfw3tcIfiZmV9X8YWa3Hpw0wz64uEqm2Uayqz1iA3Fih9Ek1icpZz96lz//2wBDAQ0N"
                                />
                            </div>
                            <div className="w-full flex flex-col gap-4">
                                <div className="flex items-center justify-between gap-4">
                                    <h1 className="font-bold text-[26px] text-gf-text-base-bold">
                                        {userData.name}
                                    </h1>
                                    <p className="text-[15px] text-gf-text-base-light">
                                        Joined&nbsp;
                                        {formatDate(userData.created_at)}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-8">
                                    <p className="text-gf-color-primary">
                                        @{userData.login}
                                    </p>
                                    <p className="text-gf-text-base-light">
                                        {userData.bio ||
                                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros."}
                                    </p>
                                    <div className="px-8 py-4 bg-gf-bg-secondary rounded-[10px] flex justify-between">
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
                                <div className="grid grid-cols-2 gap-4 text-gf-text-base-primary">
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
