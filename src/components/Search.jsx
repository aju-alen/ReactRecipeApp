import React from 'react'
import styled  from 'styled-components'
import {FaSearch} from 'react-icons/fa'
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Search() {
    const [search,setSearch] = React.useState('')
    const navigate = useNavigate()
    function searchInput(event){
        const input = event.target.value
        setSearch(input)
        console.log(search)
    }
    const submitHandler= e => {
        e.preventDefault()
        navigate('/searched/'+ search)
    };
    
  return (
    
  <FormStyle onSubmit={submitHandler} > 
    <div>
    <FaSearch></FaSearch>
    <input 
    type="text"
    value={search}
    onChange={searchInput}
    />
    </div>
  </FormStyle>
  
  )
}


const FormStyle = styled.form`
margin: 0rem 10rem;

div{
    
    width: 100%;
    position: relative;
    
}
input {
border: none;
 background-image: -webkit-linear-gradient(35deg, #494949, #313131);
font-size: 1.5em;
color: white;
padding: 1rem 3rem;
border: none;
border-radius: 1rem;
outline: none;
width:100%
}
svg {
position: absolute;
top: 40%;
left: 1%;
transform: translate (100%, -50%);
color: white;
}
`;


// background-image: -webkit-linear-gradient(92deg, #f35626, #feab3a);
export default Search