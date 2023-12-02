const Breadcrumbs = () => {
    return (
      <nav aria-label="breadcrumb">
        <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
          <li className="pr-4">Home</li>
          <li className="px-4">Dashboard</li>
          <li className="pl-4 text-gray-500" aria-current="page">Current Page</li>
        </ol>
      </nav>
    );
  };
  
  export default Breadcrumbs;