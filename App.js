

const parent = React.createElement("div",
    { id: "parent" },
    React.createElement("div", { id: "child" },
        [
            React.createElement("h1", {}, "Hello World H1"),
            React.createElement("h2", {}, "Hello World from h2")
        ])
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);