import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

const transitionHOC = (key: any) => (component: any) => {
    return (
        <TransitionGroup style={{
            height: '100%',
            width: '100%',
            position: 'relative'
        }}>
            <CSSTransition
                key={key}
                timeout={500}
                classNames={"fade"}
            >
                <Transition>
                    {component}
                </Transition>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default transitionHOC;

const Transition = styled.div`
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;

    > section{
        padding:0 20px;
    }
`;
