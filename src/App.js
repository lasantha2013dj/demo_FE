import './App.css';
import Student from "./component/Student";
import NavigationBar from "./component/NavigationBar";

function App() {
    return (
        <div className="App">

            <NavigationBar/>

            {/*<h1>Test KB</h1>*/}
            <Student/>
        </div>
    );
}

export default App;
