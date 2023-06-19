import * as React from 'react'
import { StackOverflowContext } from '../contexts/StackOverflowContext'

export const useStackOverflowContext = () => React.useContext(StackOverflowContext)