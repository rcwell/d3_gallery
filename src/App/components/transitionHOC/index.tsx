import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

export enum TransitionTypes {
    Fade = 'fade',
    Slide__Left = 'slide__left',
    Slide__Right = 'slide__right'
}

const transitionHOC = (key: any, transition: TransitionTypes) => (component: any) => {
    return (
        <TransitionGroup style={{
            height: '100%',
            width: '100%',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <CSSTransition
                key={key}
                timeout={500}
                classNames={transition}
            >
                <Transition>
                    {component}
                </Transition>
            </CSSTransition>
        </TransitionGroup>
    )
}

const Transition = styled.div`
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;

    > section{
        padding:0 20px;
        display: flex;
        flex-direction: column;
    }
`;

export default transitionHOC;
