export interface UserDataType {
    name: string;
    login: string;
    followers: number;
    following: number;
    html_url: string;
    avatar_url: string;
    public_repos: number;
    blog: string | null;
    twitter_username: string | null;
    company: string | null;
    location: string | null;
    bio: string | null;
    created_at: string;
}

export interface UserInfoType {
    type: string;
    info: string | number;
}

export interface UserDetailType {
    type: string;
    detail: string | null;
}
