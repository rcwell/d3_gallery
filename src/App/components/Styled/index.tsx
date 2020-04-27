import styled from 'styled-components';
import { black, grey, blue, lightBlue } from 'App/components/Colors';

const CrumbsContainer = styled.section`
    color: ${blue};
    height:50px;
    display: flex;
    align-items: center;
    position:absolute;
    top:-5px;
    left:-5px;
    right:8px;
    z-index:1;
    background:linear-gradient(180deg,#f7f7f7 50%,transparent);

    div{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    div a{
        text-decoration:none;
        color:${black};
        font-weight:700;
        font-size:14px;
    }
    div:last-child a{
        color:${grey};
        pointer-events:none;
    }
`;
const Header = styled.header`
    display: flex;
    flex-direction: column;
    align-items: flext-start;
    justify-content: center;
    margin:50px 0;
`;
const Title = styled.h1`
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: .25em;
    color: ${black};
`;
const Description = styled.label`
    color: ${grey};
`;
const BodyContent = styled.section`
    display: flex;
    flex-direction: column;
`;
const SectionWrapper = styled.section`
    margin: 10px 0;

    ${Title} {
        font-size: 1.3rem;
        margin-top: 0;
    }
`;
const Cards = styled.div`
    margin-top:20px;
    display:grid;
    gap:20px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr) );
`;
const Card = styled.div`
    height:200px;
    border:1px solid #eee;
    border-radius:3px;
    display: grid;
    grid-template-rows: 50px 1fr;

    > div:first-child{
        border-bottom:1px solid #eee;
        position:relative;
        div: first-child{
            height:50px;
            width:50px;
            border-radius:50%;
            background:#f5f5f5;
            position:absolute;
            top:50%;
            left:20px;

            svg{
                fill:${blue};
                stroke:${blue};
                stroke-width:0;
                width:40px;
                height:40px;
                margin:-5px;
            }
        }
        div: last-child{
            top: 50%;
            position: absolute;
            right: 20px;
            transform: translateY(-50%);
            font-size: 12px;
            font-weight: 700;
            color:${grey};
        }
    }

    > div:last-child{
        padding:25px 20px 0;
    }

    ${Title}{
        font-size: 1rem;
        margin: .25em 0;
    }
`;
const ScrollContent = styled.section`
    height: 100%;
    overflow: auto;
`;
const CategoryCard = styled.div`
    a{
        background:${lightBlue};
        border:1px solid ${blue};
        width: 100%;
        height:100%;
        text-align:center;
        justify-content: center;
        align-items: center;
        display: flex;
        border-radius: 2px;
        padding:10px;
        color: cornflowerblue;
        text-decoration: none;
        position:relative;

        :hover{    
            box-shadow: 0 6px 11px -7px #4063a2;
        }
    }

    a svg{
        height:50px;
        width:50px;
    }

    a div{
        position: absolute;
        bottom: 20px;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 15px;
    }
`;
const CategoryCardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 20px;
    justify-content: center;
    height:100%;
    width:100%;
    padding:20px;
`;

export {
    ScrollContent,
    Header,
    CrumbsContainer,
    SectionWrapper,
    Title,
    Description,
    Cards,
    Card,
    BodyContent,
    CategoryCard,
    CategoryCardContainer
}