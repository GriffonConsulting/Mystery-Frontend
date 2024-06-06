import * as React from 'react';

export interface LandingPageProps {
  children?: Array<React.ReactNode> | React.ReactNode;
}


const LandingPage = (props: LandingPageProps) => {
  return (
    <>{props.children}</>
  );
}

export default LandingPage;