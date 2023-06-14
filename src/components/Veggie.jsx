import React from 'react'
import styled from 'styled-components';
import {Splide, SplideSlide } from "@splidejs/react-splide"
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';


function Veggie(){

    const [veggie,setVeggie] = React.useState(JSON.parse(localStorage.getItem("veggie"))|| [])
console.log(veggie)
    const getVeggie = async () => {

        if(veggie.length<=0){

            const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_KEY}&number=9&tags=vegetarian`)
            const data = await response.json() 
            console.log(data)
            localStorage.setItem("veggie",JSON.stringify(data.recipes))
            setVeggie(data.recipes)
        }
    }

    React.useEffect(() => {
        getVeggie()
        
    }, [])
    const recipes = veggie.map(recipe=>(
        <SplideSlide>
        <Card  >
            <p>{recipe.title}</p>
            <img src={recipe.image} alt={recipe.title}/>
        </Card >
        </SplideSlide>
    ))

    return (
        <div>
            <Wrapper>
                <h3>Vegeterian Picks</h3>
                <Splide options={{
                    perPage:3,
                    arrows:false,
                    pagination:false,
                    drag:"free",
                    gap:"5rem",
                                }}>
                    {veggie.map((recipe) => {
                        return (
                            <SplideSlide key={recipe.id}>
                                <Card>
                                    <Link to={`/recipe/${recipe.id}`}>
                                    <p>{recipe.title}</p>
                                    <img src={recipe.image} alt={recipe.title} />
                                    <Gradient />
                                    </Link> 
                                </Card>
                            </SplideSlide>
                        );
                    })}
                </Splide>
            </Wrapper>
        </div>
    )
}

const Wrapper = styled.div`
margin: 4rem 0rem`;
;
const Card = styled.div`
max-width:300px ;
max-height:300px ;
border-radius: 2rem;
overflow: hidden;
position:relative

img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    border-color:red
    height: 100%;
    object-fit: cover;
    }

    p{
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height:40%;
    display:flex;
    justify-content:center;
    align-items:center
    

    }
`;
const Gradient = styled.div`
z-index: 3;
position: absolute;
width: 100%;
height: 100%;

`
;

export default Veggie