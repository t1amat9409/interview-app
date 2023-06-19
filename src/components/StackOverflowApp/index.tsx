import * as React from 'react'
import { AiOutlineSearch, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { BsStackOverflow } from 'react-icons/bs'
import { Item, isServerError } from '../../types'
import * as S from './styles'
import { SOItem } from './SOItem'
import { useStackOverflowContext } from '../../hooks/useStackOverflowContext'
import { FilterItem } from '../../contexts/StackOverflowContext'

/**
 * This is our app main component that lists users from a stackexchange api.
 * This component caters for 3 states - data loading, empty data for network failures or empty results on filter
 * then a list view for the data list.
 * @returns JSX.Element
 */
export const StackOverflowApp: React.FC = () => {
    const [search, setSearch] = React.useState<string>('')
    const { results, filter, isBlocked, isFollowed, onFilter, hasNext, hasPrev, onNextPage, onPrevPage } = useStackOverflowContext()
    const { data, isLoading } = results
    
    const items: Item[] = React.useMemo(() => {
        const list = !data || isServerError(data) ? [] : (data?.items || [])
        const filteredList = list.filter((item) => {
            if (filter === 'All') {
                return true
            } else if (filter === 'Blocked') {
                return isBlocked(item.user_id)
            } else {
                return isFollowed(item.user_id)
            }
        })
        return filteredList.filter((item) => {
            return item.display_name.toLowerCase().indexOf(search.toLowerCase()) > -1
        })
    }, [data, filter, isBlocked, isFollowed, search])

    const filters: FilterItem[] = ['All', 'Followed', 'Blocked']

    const serverError = data && isServerError(data) ? data.error_message : undefined

    return (
        <S.StackOverflowAppContainer>
            <header>
                <BsStackOverflow size={20} style={{
                    marginRight: 16,
                }} />
                <div style={{
                    flex: 1,
                }}/>
                <S.SearchInput>
                    <input placeholder='Search...' onChange={({ currentTarget }) => setSearch(currentTarget.value)} />
                    <AiOutlineSearch />
                </S.SearchInput>
            </header>
            <nav>
                <S.FilterView>
                    {filters.map((item, i) => {
                        const isLast = i === filters.length - 1 && i !== 0
                        const isFirst = i === 0 && !isLast
                        return (
                            <div
                                className={`${item === filter ? 'active' :''} ${!isFirst ? 'strip' : ''}`}
                                onClick={() => onFilter(item)}
                                style={{
                                    ...isLast ? {
                                        borderTopLeftRadius: 0,
                                        borderBottomLeftRadius: 0,
                                    } : isFirst ? {
                                        borderTopRightRadius: 0,
                                        borderBottomRightRadius: 0,
                                    } : {
                                        borderRadius: 0
                                    }
                                }}
                            >{item}</div>
                        )
                    })}
                </S.FilterView>
            </nav>
            <section>
                <div className='content'>
                    {isLoading && (
                        <S.Loading>
                            <AiOutlineLoading3Quarters />
                        </S.Loading>
                    )}
                    {!isLoading && items.length > 0 && (
                        <>
                        {items.map((item) => <SOItem item={item} key={item.user_id} />)}
                        </>
                    )}
                    {!isLoading && items.length === 0 && (
                        <S.Empty>
                            {serverError || 'No items founds'}
                        </S.Empty>
                    )}
                </div>
            </section>
            {items.length > 0 && (
                <footer>
                    <button onClick={onPrevPage} disabled={!hasPrev}>PREV</button>
                    <div style={{
                        flex: 1
                    }} />
                    <button onClick={onNextPage} disabled={!hasNext}>NEXT</button>
                </footer>
            )}
        </S.StackOverflowAppContainer>
    )
}