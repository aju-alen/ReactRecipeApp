import React from 'react'
import { useParams } from 'react-router-dom'
import  styled  from 'styled-components'
import { Link } from 'react-router-dom'

function Searched() {
    const [searchrecipe,setSearchrecipe] = React.useState([])


    const params = useParams()
    

    const getSearched = async (name)=>{
        const response =  await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_KEY}&number=9&query=${name}`)

        const data = await response.json()
        console.log(data);
        setSearchrecipe(data.results)

    }

React.useEffect(()=>{
    getSearched(params.search)
},[params.search])
return (
    <Grid>{searchrecipe.map(item=>(
        <Card key={item.id}>
            <Link to={`./recipe/${item.id}`} >
            <img src={item.image} alt={item.title}/>
            <h4>{item.title}</h4>
            </Link>
        </Card>
    ))}</Grid>
  )
}
const Grid = styled.div`
display:grid;
grid-template-columns: repeat(4, auto);
grid-template-rows: repeat(2, auto);
grid-gap:3rem;
`;
const Card = styled.div`
img {
width: 100%;
border-radius: 2rem;
}
a {
text-decoration: none;
}
h4 {
text-align: center;
padding: 1rem;
}`;

export default Searched