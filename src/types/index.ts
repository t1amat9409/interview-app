export interface StackOverflowData {
    items: Item[];
    has_more: boolean;
    quota_max: number;
    quota_remaining: number;
}

export interface StackOverflowError {
    error_id:      number;
    error_message: string;
    error_name:    string;
}

export interface Item {
    badge_counts: BadgeCounts;
    account_id: number;
    is_employee: boolean;
    last_modified_date: number;
    last_access_date: number;
    reputation_change_year: number;
    reputation_change_quarter: number;
    reputation_change_month: number;
    reputation_change_week: number;
    reputation_change_day: number;
    reputation: number;
    creation_date: number;
    user_type: UserType;
    user_id: number;
    accept_rate?: number;
    location?: string;
    website_url: string;
    link: string;
    profile_image: string;
    display_name: string;
}

export interface BadgeCounts {
    bronze: number;
    silver: number;
    gold: number;
}

export enum UserType {
    Moderator = "moderator",
    Registered = "registered",
}

// Converts JSON strings to/from your types
export class Convert {
    public static toStackOverflowData(json: string): StackOverflowData {
        return JSON.parse(json);
    }

    public static stackOverflowDataToJson(value: StackOverflowData): string {
        return JSON.stringify(value);
    }
}

export function isServerError(data: StackOverflowData | StackOverflowError): data is StackOverflowError {
    if ('error_id' in data) {
        return true
    }
    return false
}