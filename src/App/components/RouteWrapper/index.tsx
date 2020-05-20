import React from 'react';
import PageHeader from "App/components/PageHeader";
import { ScrollableSection, Body } from 'App/components/Styled';
import { stateCtx } from "App/store";
import { useHistory } from 'react-router-dom';

const RouteWrapper = ({ title, description, children }: any) => {
    const scrollableRef = React.useRef<HTMLDivElement>(null);
    const globalState = React.useContext(stateCtx);
    const history = useHistory();

    React.useEffect(() => {
        const ref = scrollableRef.current;
        if (!ref) return;

        const { setScrollPosition, scrollPosition } = globalState;
        ref.scrollTo(0, scrollPosition);
        const { location } = history;

        return () => {
            if (ref) {
                const { scrollTop } = ref;
                if (scrollTop !== scrollPosition && location.pathname.split('/').length === 2) {
                    setScrollPosition(scrollTop);
                }
                if(location.pathname === "/"){
                    setScrollPosition(0);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ScrollableSection ref={scrollableRef}>
            <PageHeader title={title} description={description}/>
            <Body>
                {children}
            </Body>
        </ScrollableSection>
    )
};

export default RouteWrapper;