import * as React from 'react'
import { SlUserFollowing, SlUserUnfollow } from 'react-icons/sl'

import { MdOutlineBlock } from 'react-icons/md'

import { Item } from '../../../types'
import * as S from './styles'
import { useStackOverflowContext } from '../../../hooks/useStackOverflowContext'

/**
 * Typed props for SOItem component
 * @param item Item
 */
interface SOItemProps {
    item: Item
}

/**
 * A list item component that accepts an item props which contains a defined interface with 
 * all the user attrributes returned by the backend.
 * An internal state for toggling the details view.
 * Actions to block, follow and unfollow the stack user
 * @param props SOItemProps
 * @returns JSX.Element
 */
export const SOItem = ({
    item
}: SOItemProps) => {
    const [open, setOpen] = React.useState(false)
    const { blocked, followed, onFollow, onBlock } = useStackOverflowContext()
    const isFollowed = followed.includes(item.user_id)
    const isBlocked = blocked.includes(item.user_id)
    React.useEffect(() => {
        if (isBlocked && open) {
            setOpen(false)
        }
    }, [isBlocked, open])
    return (
        <S.ItemContainer>
            <S.Item disabled={isBlocked} onClick={() => {
                if (isBlocked) return
                setOpen((val) => !val)
            }}>
                <S.ItemAvatar src={item.profile_image} />
                <S.ItemContent>
                    <h2>{item.display_name}</h2>
                    <p>REP - {item.reputation}</p>
                </S.ItemContent>
            </S.Item>
            {open && (
                <S.ItemActions>
                    <button onClick={() => onFollow(item.user_id)}>{isFollowed ? <SlUserUnfollow /> : <SlUserFollowing />} {isFollowed ? 'Unfollow' : 'Follow'}</button>
                    <button onClick={() => onBlock(item.user_id)} className='outline'><MdOutlineBlock />Block</button>
                </S.ItemActions>
            )}
        </S.ItemContainer>
    )
}