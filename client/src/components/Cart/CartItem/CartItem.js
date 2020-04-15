import React from "react";
import styled from 'styled-components';
import {
  useDispatch,
} from 'react-redux';
import { useHistory } from 'react-router-dom';
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import {
  changeQuantityOfItem,
  removeItemFromCart,
  addItemToCart,
  removeOneItemFromCart,
} from '../../../Redux/actions';

const CartItem = ({ item }) => {
  const {
    id,
    name,
    price,
    quantity,
    imageSrc,
  } = item;
  const [longFormOfNameFlag, setLongFormOfNameFlag] = React.useState(false)

  const dispatch = useDispatch()
  let history = useHistory();

  const handleInput = (event) => {
    if (event.target.value >= 0) dispatch(changeQuantityOfItem(id, Number(event.target.value)));
  }

  const handleClickOnItem = (ev, id) => {
    ev.preventDefault();
    ev.stopPropagation();
    history.push(`/items/${id}`);
  }

  return (
    <Wrapper
      // onClick={() => setLongFormOfNameFlag(!longFormOfNameFlag)}
    >
      <WrapperImg data-css='WrapperImage'>
        <ThumbCart src={imageSrc} alt={name} />
      </WrapperImg>
      <WrapperInfo data-css='WrapperInfo'>
      <Name
        onClick={(event) => handleClickOnItem(event, id)}
        long={longFormOfNameFlag ? true : false}
      >
      
      <h2>{name}</h2>
      </Name>
      <p>{price}</p>
      <ItemQuantityWrapper data-css='ItemQuantityWrapper'>
      <RemoveCircleOutlineIcon 
        style={{ fontSize: 15, cursor:'pointer' }}
        onClick={() => dispatch(removeOneItemFromCart(item))}
        />
      <ItemQuantityInput
        value={quantity}
        onChange={(event) => handleInput(event)}
      />
      <AddCircleOutlineIcon 
        style={{ fontSize: 15, cursor:'pointer' }}
        onClick={() => dispatch(addItemToCart(item))}
      />
      </ItemQuantityWrapper>
        <RemoveButton  onClick={() => dispatch(removeItemFromCart(id))}/>
      </WrapperInfo>
    </Wrapper>
  );
}

export default CartItem;

const Wrapper = styled.div`
margin-top: 10px;
display: flex;
margin-bottom: 15px;
`;

const RemoveButton = styled(CancelIcon)`
cursor: pointer;
position: absolute;
top:-10px;
right: -10px;
color: black;
transition: all .2s ease-in;
  &:hover{
    color: red;
  }
`

const Name = styled.div`
margin-bottom: 7px;
  &:hover{
    text-decoration: underline;
    cursor: pointer;
  }
  h2{
    ${props => props.long ? null : (
    `overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      `
  )}
  }
`;
const WrapperImg = styled.div`
`
const WrapperInfo = styled.div`
  width: 430px;
  height: 100px;
  border: 1px solid #e6ecf0;
  padding: 15px;
  position: relative;
  p{
    margin-bottom: 7px;
  }
`
const ItemQuantityWrapper = styled.div`
  display: flex;
  align-items: center;
`

const ThumbCart = styled.img`
width: 100px;
height: 100px;
border: 1px solid #e6ecf0;
border-right: none;
padding: 15px;
`

const ItemQuantityInput = styled.input`
  border: none;
  outline: none;
  font-size: 1em;
  font-weight: 700;
  width: 30px;
  text-align: center;
  margin: 0 5px;
`;