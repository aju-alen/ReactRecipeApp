import React from 'react'
import styled from 'styled-components';
import {Splide, SplideSlide } from "@splidejs/react-splide"
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';


function Popular() {
const [popular,setPopular] = React.useState(JSON.parse(localStorage.getItem("popular"))|| [])
console.log(popular)
    const getPopular = async () => {

        if(popular.length<=0){

            const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_KEY}&number=9`)
            const data = await response.json() 
            console.log(data)
            localStorage.setItem("popular",JSON.stringify(data.recipes))
            setPopular(data.recipes)
        }
    }

    React.useEffect(() => {
        getPopular()
        
    }, [])
    const recipes = popular.map(recipe=>(
        <SplideSlide>
        <Card  >
            <Link to={`./recipie/${recipe.id}`}>
            <p>{recipe.title}</p>
            <img src={recipe.image} alt={recipe.title}/>
            </Link>
        </Card >
        </SplideSlide>
    ))
    return (
        <div>
            <Wrapper>
                <h3>Popular Picks</h3>
                <Splide options={{
                    perPage:4,
                    arrows:false,
                    pagination:false,
                    drag:"free",
                    gap:"5rem",
                                }}>
                    {popular.map((recipe) => {
                        return (
                            <SplideSlide key={recipe.id}>
                                <Card>
                                    <p>{recipe.title}</p>
                                    <img src={recipe.image} alt={recipe.title} />
                                    <Gradient /> 
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
background: linear-gradient (rgba(0,0,0,0), rgba(0,0,0,0.5));
`
;

export default Popular