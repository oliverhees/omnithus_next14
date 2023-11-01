import Card from "../../components/Card";

const getTemplates = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/template`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch templates");
    }

    return res.json();
  } catch (err) {
    console.error(err);
  }
};

const Dashboard = async () => {
  const { templates } = await getTemplates();
  return (
    <div className="w-full bg-white px-4 mt-4 lg:px-6 py-2.5 dark:bg-gray-800 font-semibold text-1xl">
      <div className="flex flex-col mx-auto max-w-screen-xl items-start">
        <h1>Dashboard</h1>

        <div class="flex items-center justify-center py-4 md:py-8 flex-wrap">
          <button
            type="button"
            class="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
          >
            All categories
          </button>
          <button
            type="button"
            class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
          >
            Eigene
          </button>
          <button
            type="button"
            class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
          >
            React
          </button>
          <button
            type="button"
            class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
          >
            Test
          </button>
        </div>
        <div class="grid grid-cols-3 md:grid-cols-4 gap-6 justify-between">
          {templates.map((template) => (
            <Card
              key={template._id}
              id={template._id}
              title={template.name}
              category={template.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
