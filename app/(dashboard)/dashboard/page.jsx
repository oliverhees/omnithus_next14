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
      </div>
      <div className="flex gap-5 mx-auto max-w-screen-xl items-start">
        {templates.map((template) => (
          <Card
            id={template._id}
            title={template.name}
            category={template.category}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
