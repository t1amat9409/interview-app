import * as React from 'react'
import { UseQueryResult, useQuery } from 'react-query'
import { useLocalStorage } from 'usehooks-ts'
import { StackOverflowData, StackOverflowError } from '../types'

interface StackOverflowContextData {
    results: UseQueryResult<StackOverflowData | StackOverflowError, unknown>
    followed: number[]
    blocked: number[]
    filter: FilterItem
    page: number,
    hasNext: boolean,
    hasPrev: boolean
    onFilter(item: FilterItem): void
    onBlock(user_id: number): void
    onFollow(user_id: number): void
    isFollowed(user_id: number): boolean
    isBlocked(user_id: number): boolean
    onNextPage(): void
    onPrevPage(): void
}

/**
 * @name StackOverflowContext
 * @description Global state management context for fetching user list from stackexchange.
 * Internal states for managing block or follow state allowing for the user to be able to block, follow or unfollow app users
 * @returns StackOverflowContextData
 */
export const StackOverflowContext = React.createContext({} as StackOverflowContextData)

export type FilterItem = 'All' | 'Followed' | 'Blocked'

export const StackOverflowContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [blocked, setBlocked] = useLocalStorage<number[]>('blocked', [])
    const [followed, setFollowed] = useLocalStorage<number[]>('followed', [])
    const [filter, setFilter] = React.useState<FilterItem>('All')
    const [page, setPage] = React.useState<number>(1)

    function isFollowed(user_id: number): boolean {
        return followed.includes(user_id)
    }

    function isBlocked(user_id: number): boolean {
        return blocked.includes(user_id)
    }

    function onBlock(user_id: number) {
        const newBlockList = isBlocked(user_id) ? blocked.filter((i) => i !== user_id) : [...blocked, user_id]
        setBlocked(newBlockList)
    }
    
    function onFollow(user_id: number) {
        const newFollowList = isFollowed(user_id) ? followed.filter((i) => i !== user_id) : [...followed, user_id]
        setFollowed(newFollowList)
    }

    const results = useQuery<StackOverflowData>({
        queryKey: ['stackoverflowUserData'],
        queryFn: () =>
            fetch(`https://api.stackexchange.com/2.2/users?pagesize=20&order=desc&sort=reputation&site=stackoverflow&page=${page}`).then(
                (res) => res.json(),
            ),
        cacheTime: 5,
    })

    return (
        <StackOverflowContext.Provider value={{
            results,
            blocked,
            followed,
            filter,
            page,
            hasPrev: page > 1,
            hasNext: Boolean(results.data && results.data.has_more),
            onBlock,
            onFollow,
            isBlocked,
            isFollowed,
            onFilter(item) {
                setFilter(item)
            },
            onNextPage() {
                if (!results.data || !results.data.has_more) return
                const nextPage = page + 1;
                setPage(nextPage)
                results.refetch()
            },
            onPrevPage() {
                const nextPage = page - 1;
                if (nextPage > 1) {
                    setPage(nextPage)
                    results.refetch()
                } else {
                    setPage(1)
                    results.refetch()
                }
            },
        }}>
            {children}
        </StackOverflowContext.Provider>
    )
}