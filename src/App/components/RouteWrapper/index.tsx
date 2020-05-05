import React from 'react';
import PageHeader from "App/components/PageHeader";
import { ScrollableSection, Body } from 'App/components/Styled';
import { stateCtx } from "App/store";

const RouteWrapper = ({ title, description, route, children }: any) => {
    const scrollableRef = React.useRef<HTMLDivElement>(null);
    const globalState = React.useContext(stateCtx);

    React.useEffect(() => {
        const ref = scrollableRef.current;
        if (!ref) return;

        const { setScrollPosition, scrollPosition } = globalState;
        ref.scrollTo(0, scrollPosition);

        return () => {
            if (ref) {
                const { scrollTop } = ref;
                setScrollPosition(scrollTop);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ScrollableSection ref={scrollableRef}>
            <PageHeader title={title} description={description} route={route} />
            <Body>
                {children}
            </Body>
        </ScrollableSection>
    )
};

export default RouteWrapper;