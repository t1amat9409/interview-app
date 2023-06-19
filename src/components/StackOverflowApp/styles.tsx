import { styled } from 'styled-components'
import { Theme } from '../../utils/theme'

export const StackOverflowAppContainer = styled.main`
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-color: #eee;

    header {
        background: ${Theme.primaryColor};
        display: flex;
        align-items: center;
        padding: 16px;
        
        ${Theme.mediaQueries.tablet} {
            padding-left: 6rem;
            padding-right: 6rem;
        }

        ${Theme.mediaQueries.desktop} {
            padding-left: 15rem;
            padding-right: 15rem;
        }

        ${Theme.mediaQueries.huge} {
            padding-left: 22rem;
            padding-right: 22rem;
        }
    }
    section {
        flex: 1;
        padding: 16px;
        overflow-y: hidden;
        overflow-y: scroll;
        background-color: white;
        
        ${Theme.mediaQueries.tablet} {
            padding-left: 6rem;
            padding-right: 6rem;
        }

        ${Theme.mediaQueries.desktop} {
            padding-left: 15rem;
            padding-right: 15rem;
        }

        ${Theme.mediaQueries.huge} {
            padding-left: 22rem;
            padding-right: 22rem;
        }

        .content {
            border: 1px solid #eee;
            width: 100%;
        }
    }

    footer {
        background-color: white;
        padding: 16px;
        display: flex;
        border-top: 1px solid #eee;

        ${Theme.mediaQueries.tablet} {
            padding-left: 6rem;
            padding-right: 6rem;
        }

        ${Theme.mediaQueries.desktop} {
            padding-left: 15rem;
            padding-right: 15rem;
        }

        ${Theme.mediaQueries.huge} {
            padding-left: 22rem;
            padding-right: 22rem;
        }

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
        }

        button:disabled {
            border: 1px solid #ddd;
            background-color: white;
            color: #ddd;
            cursor: not-allowed;
        }
    }

    nav {
        background-color: white;
        padding: 16px;
        display: flex;
        justify-content: center;
        
        ${Theme.mediaQueries.tablet} {
            padding-left: 6rem;
            padding-right: 6rem;
            justify-content: flex-start;
        }

        ${Theme.mediaQueries.desktop} {
            padding-left: 15rem;
            padding-right: 15rem;
            justify-content: flex-start;
        }

        ${Theme.mediaQueries.huge} {
            padding-left: 22rem;
            padding-right: 22rem;
            justify-content: flex-start;
        }
    }
`

export const SearchInput = styled.div`
    display: flex;
    padding: 8px;
    background-color: white;
    border-radius: 10px;

    input {
        flex: 1;
        appearance: none;
        outline: none;
        border: none;
    }
`

export const Loading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 35vh;
    svg {
        animation: spin infinite 500ms linear;
    }
    @keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
`

export const Empty = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 35vh;
`

export const FilterView = styled.div`
    display: flex;
    border: 1px solid ${Theme.primaryColor};
    border-radius: 10px;

    div {
        padding: 12px 16px;
        border-radius: 8px;
        cursor: pointer;
    }

    div.strip {
        border-left: 1px solid ${Theme.primaryColor};
    }

    div.active {
        background-color: ${Theme.primaryColor};
        color: #fff;
    }
`