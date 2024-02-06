import React from 'react'
import { postById, postsLists} from './postsSelector'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

const Posts = () => {
    const posts = useSelector(postsLists)
    const post = useSelector((state: RootState) => postById(state, '2'))
    console.log(post)
  return (
    <div>{JSON.stringify(posts)}</div>
  )
}

export default Posts