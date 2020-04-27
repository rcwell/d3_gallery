import React from 'react';
import { CategoryCardContainer } from 'App/components/Styled';
import { LinkCard } from 'App/components/Layout';
import { D3 } from 'App/components/Icons';
import { TiChartArea } from 'react-icons/ti';
import { FaGlobeAmericas, FaMagic } from 'react-icons/fa';

const Home = () => {
    return (
        <CategoryCardContainer>
            <LinkCard to="/basics">
                {<D3 />}
                <div>Basics</div>
            </LinkCard>
            <LinkCard to="/charts">
                {<TiChartArea />}
                <div>Charts</div>
            </LinkCard>
            <LinkCard to="/Geo">
                {<FaGlobeAmericas />}
                <div>Geo</div>
            </LinkCard>
            <LinkCard to="/customvisualizations">
                {<FaMagic />}
                <div>Custom Visualizations</div>
            </LinkCard>
        </CategoryCardContainer >
    );
};

export default Home;