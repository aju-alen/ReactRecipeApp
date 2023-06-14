import { styled } from 'styled-components'
import { useParams } from 'react-router-dom'
import { decode } from 'html-entities'
import React from 'react'


function Recipe() {
const [details,setDetails] = React.useState({})
const [active,setActive] = React.useState('instructions')
  let params = useParams();
const fetchDetails = async () => {
const response = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${import.meta.env.VITE_KEY}`)
const data = await response.json()
console.log('recipedata',data);
setDetails(data)
}

React.useEffect(()=>{
  fetchDetails()
},[params.name])
  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image}/>
      </div>
      <Info>
        <Button className={active==="instructions" ? 'active' : ''} onClick={()=>setActive("instructions")}>Instructions</Button>
        <Button className={active==="ingredients" ? 'active' : ''} onClick={()=>setActive("ingredients")}>Ingredients</Button>
        {active === "instructions" && (

        <div>
          <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
          <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
        </div>
        )}
        {active === "ingredients" && (
          <ul>
          {details.extendedIngredients.map((ingredient)=><li key={ingredient.id}>{ingredient.original}</li>
          )}
        </ul>
        )}
        
      </Info>
    </DetailWrapper>
  )
}

const DetailWrapper=styled.div`
margin-top: 10rem;
margin-bottom: 5rem;
display: flex;
.active {
  background-image: -webkit-linear-gradient(35deg, #494949, #313131);
color: white;
}
h2 {
margin-bottom: 2rem;
}
li {
font-size: 1.2rem;
line-height: 2.5rem;
}
ul {
margin-top: 2rem;
}`
;

const Button = styled.button`
padding: 1rem 2rem;
color: #313131;
background: white;
border: 2px solid black
margin-right: 2rem;
font-weight: 600;
`
const Info = styled.div`
 margin-left:10rem
`

export default Recipe