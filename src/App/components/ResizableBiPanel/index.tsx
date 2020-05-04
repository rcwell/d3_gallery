import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';

interface IResizableBiPanel {
    minPanelWidth?: number;
    children:[
        JSX.Element,
        JSX.Element
    ];
}

// interface Panel extends JSX.Element{

// }

const ResizableBiPanel = ({ minPanelWidth, children }: IResizableBiPanel) => {
    const containerRef = React.useRef<HTMLElement>(null);
    const leftPnlRef = React.useRef<HTMLElement>(null);
    const rightPnlRef = React.useRef<HTMLElement>(null);

    const [bounds, setBounds] = React.useState({ top: 0, left: 0, right: 0, bottom: 0 })

    const handleEvent = (_: any, data: any) => {
        const prevEl = leftPnlRef.current;
        const readmeEl = rightPnlRef.current;
        const containerEl = containerRef.current;

        if (!prevEl || !readmeEl || !containerEl) return;

        if (bounds.left === 0 && bounds.right === 0) {
            const width50Percent = containerEl.clientWidth / 2;
            setBounds({
                ...bounds,
                left: -width50Percent + (minPanelWidth || 100),
                right: width50Percent - (minPanelWidth || 100)
            })
        }

        prevEl.style.width = `calc(50% + ${data.x}px)`;
        readmeEl.style.width = `calc(50% - ${data.x}px)`;
    };

    return (
        <Container ref={containerRef} >
            <LeftPanel ref={leftPnlRef}>
                {children[0]}
            </LeftPanel>
            <Draggable
                axis="x"
                handle={`.${Handle.styledComponentId}`}
                bounds={bounds}
                onDrag={handleEvent}>
                <Handle />
            </Draggable>
            <RightPanel ref={rightPnlRef} >
                {children[1]}
            </RightPanel>
        </Container>
    )
}

const LeftPanel = styled.section`
    width:50%;
    height:100%;
    display:inline-block;
`;

const RightPanel = styled.section`
    width:50%;
    height:100%;
    display:inline-block;
`;

const Container = styled.section`
    width:100%;
    height:100%;
    position: relative;
    display:flex;
    flex-direction:row;
    border:1px solid #eee;
    border-radius: 3px;
    margin-bottom:20px;

    ${LeftPanel}{
        border-right:1px solid #eee;
    }
`;

const Handle = styled.div`
    height: 100%;
    width: 20px;
    position: absolute;
    left: calc(50% - 10px);
    top: 0;
    cursor: col-resize;

    :hover {
        background-image: radial-gradient(at center right, rgba(0,0,0,0.1) 0%, transparent 70%, transparent 100%);
        background-size: 50% 100%;
        background-position: 0 50%;
        background-repeat: no-repeat;
    }
`;

export default ResizableBiPanel;
