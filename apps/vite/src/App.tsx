import { plugins } from "./plugin-registry";

const App = () => {
  return (
    <div>
      <div>app</div>
      {plugins.map((Plugin, index) => (
        <Plugin key={index} />
      ))}
    </div>
  );
};

export default App;
