const Slide = ({ content }) => {
  const renderContent = (data) => {
    if (!data) return null;
    
    return Object.entries(data).map(([key, value]) => {
      if (Array.isArray(value)) {
        return (
          <div key={key}>
            <h3 className="text-lg font-semibold mb-2">{key}</h3>
            <ul className="list-disc pl-5">
              {value.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        );
      }
      
      if (typeof value === 'object') {
        return (
          <div key={key}>
            <h3 className="text-lg font-semibold mb-2">{key}</h3>
            {renderContent(value)}
          </div>
        );
      }
      
      return (
        <p key={key} className="mb-2">
          <strong>{key}:</strong> {value}
        </p>
      );
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">{content.title}</h2>
      {renderContent(content)}
    </div>
  );
};