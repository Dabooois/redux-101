
import { useSelector, useDispatch } from 'react-redux'
import {increment, decrement, reset, incrementBy} from './counteSlice'

import { RootState } from '../../store'
const Counter = () => { 
  const count = useSelector((state: RootState) => state.counter.count)
  const dispatch = useDispatch()  


  const hannleIncrement = () => {
    dispatch(increment())
  }
  const hannleDecrement = () => {
    dispatch(decrement())
  }
  const handleReset = () => {
    dispatch(reset())
  }
  const handleIncrementBy = () => {
    dispatch(incrementBy({count: 5}))
  }
  return ( 
    <div>
      {count}

      <button onClick={hannleIncrement}> + </button>
      <button onClick={hannleDecrement}>-</button>
      <button onClick={handleReset}> Reset</button>
      <button onClick={handleIncrementBy}>increment by 5</button>
    </div>
  )
}

export default Counter