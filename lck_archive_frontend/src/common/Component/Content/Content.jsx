import React from 'react';

import './Content.scss';

function Content({children}) {
  return (
    <div className="Content">
      {children}
    </div>
  );
};

export default Content;
