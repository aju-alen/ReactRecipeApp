import React from 'react'
import  styled  from 'styled-components';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Cuisine() {
    const [cuisine,setCuisine] = React.useState([]);
    const params = useParams()

    const getCuisine = async (name)=>{
        const response =  await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_KEY}&number=9&cuisine=${name}`)

        const data = await response.json()
        console.log(data);
        setCuisine(data.results)

    }

    React.useEffect(()=>{
        getCuisine(params.type)
        console.log(params);
    },[params.type])

  return (
    <Grid animate={{opacity:1}} 
          initial={{opacity:0}}
          exit={{opacity:0}}
          transition={{duration:0.5}}
    >{cuisine.map(item=>(
        <Card key={item.id}>
            <Link to= {`./recipe/${item.id}`}>
            <img src={item.image} alt={item.title}/>
            <h4>{item.title}</h4>
            </Link>
        </Card>
    ))}</Grid>
  )
}
const Grid = styled(motion.div)`
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

export default Cuisine