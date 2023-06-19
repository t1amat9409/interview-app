import { styled } from 'styled-components'
import { Theme } from '../../../utils/theme'

export const ItemContainer = styled.article`
    border-bottom: 1px solid #eee;
`
export const ItemActions = styled.div`
    display: flex;
    margin-left: 90px;
    margin-bottom: 12px;

    button {
        appearance: none;
        border: 1px solid ${Theme.primaryColor};
        background-color: ${Theme.primaryColor};
        color: #fff;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-right: 16px;
        padding: 8px 12px;
        cursor: pointer;

        svg {
            margin-right: 4px;
        }
    }

    button.outline {
        border: 1px solid ${Theme.primaryColor};
        background-color: white;
        color: ${Theme.primaryColor}
    }
`
interface ItemProps {
    disabled?: boolean
}

export const Item = styled.div<ItemProps>`
    display: flex;
    cursor: ${(p) => p.disabled ? 'not-allowed' : 'default'};
    color: ${(p) => p.disabled ? '#ddd' : '#000'};

    img {
        opacity: ${(p) => p.disabled ? 0.5 : 1};
    }
`

export const ItemAvatar = styled.img`
    height: 60px;
    width: 60px;
    border-radius: 50%;
    margin: 16px;
`

export const ItemContent = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
    
    h2, p {
        margin: 0px;
        color: inherit;
    }

    h2 {}

    p {}
`