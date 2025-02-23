const TestInfoCard = ({ title, description }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h2 className="text-xl font-semibold text-primary-color mb-4">{title}</h2>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default TestInfoCard;
